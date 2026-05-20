import { expect, test, type Page, type TestInfo } from '@playwright/test';

async function expectNoHorizontalScroll(page: Page) {
  const { maxWidth, viewportWidth } = await page.evaluate(() => ({
    maxWidth: Math.max(
      document.documentElement.scrollWidth,
      document.body ? document.body.scrollWidth : 0,
    ),
    viewportWidth: window.innerWidth,
  }));

  expect(maxWidth).toBeLessThanOrEqual(viewportWidth + 1);
}

async function expectVisibleTextContrast(page: Page, selector: string, minimumRatio = 4.5) {
  const ratios = await page.locator(selector).evaluateAll((elements) => {
    const parseColor = (value: string) => {
      const match = value.match(/rgba?\(([^)]+)\)/);
      if (!match) return { r: 0, g: 0, b: 0, a: 1 };

      const [r, g, b, a = '1'] = match[1]
        .split(',')
        .map((part) => part.trim());

      return {
        r: Number.parseFloat(r),
        g: Number.parseFloat(g),
        b: Number.parseFloat(b),
        a: Number.parseFloat(a),
      };
    };

    const blend = (
      foreground: { r: number; g: number; b: number; a: number },
      background: { r: number; g: number; b: number; a: number },
    ) => {
      const alpha = foreground.a + background.a * (1 - foreground.a);
      if (alpha === 0) return { r: 255, g: 255, b: 255, a: 1 };

      return {
        r: (foreground.r * foreground.a + background.r * background.a * (1 - foreground.a)) / alpha,
        g: (foreground.g * foreground.a + background.g * background.a * (1 - foreground.a)) / alpha,
        b: (foreground.b * foreground.a + background.b * background.a * (1 - foreground.a)) / alpha,
        a: alpha,
      };
    };

    const relativeLuminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
      const toLinear = (channel: number) => {
        const normalized = channel / 255;
        return normalized <= 0.03928
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      };

      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };

    const contrastRatio = (
      foreground: { r: number; g: number; b: number },
      background: { r: number; g: number; b: number },
    ) => {
      const foregroundLuminance = relativeLuminance(foreground);
      const backgroundLuminance = relativeLuminance(background);
      const lighter = Math.max(foregroundLuminance, backgroundLuminance);
      const darker = Math.min(foregroundLuminance, backgroundLuminance);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const effectiveBackground = (element: Element) => {
      const backgrounds = [];
      let current: Element | null = element;

      while (current) {
        backgrounds.push(parseColor(window.getComputedStyle(current).backgroundColor));
        current = current.parentElement;
      }

      return backgrounds
        .reverse()
        .reduce((background, foreground) => blend(foreground, background), {
          r: 255,
          g: 255,
          b: 255,
          a: 1,
        });
    };

    return elements
      .filter((element) => element.getClientRects().length > 0)
      .map((element) => {
        const style = window.getComputedStyle(element);
        const textColor = blend(parseColor(style.color), effectiveBackground(element));
        return contrastRatio(textColor, effectiveBackground(element));
      });
  });

  expect(ratios.length).toBeGreaterThan(0);
  for (const ratio of ratios) {
    expect(ratio).toBeGreaterThanOrEqual(minimumRatio);
  }
}

async function expectSequentialHeadings(page: Page) {
  const violations = await page.evaluate(() =>
    [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
      .filter((heading) => heading.getClientRects().length > 0)
      .map((heading) => ({
        level: Number(heading.tagName.slice(1)),
        text: heading.textContent?.trim() || '',
      }))
      .reduce<{ previousLevel: number; violations: string[] }>(
        (state, heading) => {
          if (heading.level > state.previousLevel + 1) {
            state.violations.push(`${heading.text} jumped from h${state.previousLevel} to h${heading.level}`);
          }
          state.previousLevel = heading.level;
          return state;
        },
        { previousLevel: 0, violations: [] },
      ).violations,
  );

  expect(violations).toEqual([]);
}

async function expectPdfResponse(page: Page, href: string) {
  const response = await page.request.get(href);
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/pdf');

  const body = await response.body();
  expect(body.length).toBeGreaterThan(1_000);
  expect(body.subarray(0, 5).toString()).toBe('%PDF-');
}

function isMobileProject(testInfo: TestInfo) {
  return Boolean(testInfo.project.use?.isMobile);
}

test.describe('core user paths', () => {
  test('homepage introduces the site clearly and exposes the full entry matrix', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Wenn eine bipolare Störung auch Ihr Leben mitbetrifft/i);
    await expect(page.locator('.home-hero-subtitle')).toContainText(/Begleitung für Angehörige und Nahestehende/i);
    await expect(page.locator('.home-hero-subtitle')).toContainText(/Sorge, Erschöpfung und Unsicherheit/i);
    await expect(page.locator('.home-hero-link')).toHaveCount(0);
    await expect(page.locator('.entry-paths-list a[href="/notfall/"]').first()).toContainText(/Notfallweg/i);
    await expect(page.locator('.entry-paths-list a[href="/modul/1/"]').first()).toContainText(/verstehen, was passiert/i);
    await expect(page.locator('.entry-paths-list a[href="/modul/4/"]').first()).toContainText(/kaum noch aus/i);
    await expect(page.locator('.entry-paths-list a[href="/modul/3/"]').first()).toContainText(/Beziehung/i);
    await expect(page.locator('.entry-paths-list a[href="/modul/6/"]').first()).toContainText(/konkret handeln/i);
    await expect(page.locator('.entry-paths-list a[href="/modul/7/"]').first()).toContainText(/langfristig tragfähig/i);
    await expect(page.locator('.invitation-section')).toContainText(/Reden, ohne wissen zu müssen, was Sie sagen wollen/i);
    await expect(page.locator('.invitation-section a[href^="tel:"]')).toBeVisible();
  });

  test('einstiegsfrage tool sends urgent answers directly to the notfall page', async ({ page }) => {
    await page.goto('/tools/einstiegsfrage/');

    await Promise.all([
      page.waitForURL(/\/notfall\/$/),
      page.getByRole('button', { name: 'Ja oder unklar' }).click(),
    ]);

    await expect(page.getByRole('heading', { level: 1, name: /Notfall/i })).toBeVisible();
  });

  test('notfall page exposes 144 and keeps mobile width stable', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();

    await page.goto('/notfall/');

    await expect(page.getByRole('heading', { level: 1, name: /Notfall/i })).toBeVisible();
    await expect(page.locator('a[href="tel:144"]').first()).toBeVisible();
    await expect(page.locator('a[href="tel:144"]').first()).toHaveAttribute('href', 'tel:144');
    await expect(page.locator('a[data-pdf-asset-id="DL-01"][href="/downloads/notfallkarte-kanton-zuerich-puk.pdf"]').first()).toBeVisible();
    await expectNoHorizontalScroll(page);

    await context.close();
  });

  test('barrierefreiheit page is reachable and exposes WCAG and contact details', async ({ page }) => {
    await page.goto('/barrierefreiheit/');

    await expect(page.getByRole('heading', { level: 1, name: /Barrierefreiheit/i })).toBeVisible();
    await expect(page.locator('main')).toContainText(/WCAG 2\.1/i);
    await expect(page.locator('main a[href="mailto:angehoerigenarbeit@pukzh.ch"]')).toBeVisible();
  });

  test('module overview links into modul 1 and toc remains reachable', async ({ page }) => {
    await page.goto('/module/');

    const modul1Link = page.locator('a[href="/modul/1/"]').first();
    await expect(modul1Link).toBeVisible();
    await expect(page.locator('a[href="/modul/8/"]')).toHaveCount(0);

    await page.goto('/modul/1/');
    await expect(page.getByRole('heading', { level: 1, name: /Die bipolare Störung verstehen/i })).toBeVisible();

    const mobileTocToggle = page.locator('.toc-mobile-toggle');
    if (await mobileTocToggle.count()) {
      await mobileTocToggle.click();
      await expect(mobileTocToggle).toHaveAttribute('aria-expanded', 'true');
    }

    const tocLink = page.locator('.toc a[href="#verstehen"]').first();
    await expect(tocLink).toBeVisible();
    await tocLink.click();
    await expect(page).toHaveURL(/#verstehen$/);
    await expect(page.locator('#verstehen')).toBeVisible();
  });

  test('desktop modules keep the inline hero toc and do not inject a cloned sidebar by default', async ({ page }, testInfo) => {
    test.skip(isMobileProject(testInfo), 'Desktop-only module TOC assertion.');

    await page.goto('/modul/1/');

    await expect(page.locator('.toc-sidebar')).toHaveCount(0);

    const heroTocLink = page.locator('.module1-hero-aside .toc a[href="#neu"]').first();
    await expect(heroTocLink).toBeVisible();
    await expect(heroTocLink).toHaveAttribute('href', '#neu');
  });

  test('werkzeuge overview exposes krisenplan and a distinct emergency path', async ({ page }) => {
    await page.goto('/werkzeuge/');

    await expect(page.getByRole('heading', { level: 1, name: /Werkzeuge im Überblick/i })).toBeVisible();
    await expect(page.locator('a[href="/tools/krisenplan/"]').first()).toBeVisible();

    const emergencyCard = page.locator('.tool-guide-item--alert[href="/notfall/"]');
    await expect(emergencyCard).toBeVisible();
    await expect(emergencyCard).toContainText(/Es ist akut/i);
  });

  test('selbsttest renders its result actions with central contact links intact', async ({ page }) => {
    await page.goto('/tools/selbsttest/');

    for (let i = 0; i < 5; i += 1) {
      await page.locator('[data-sa]').nth(0).click();
      if (i < 4) {
        await page.getByRole('button', { name: 'Weiter →' }).click();
      }
    }

    await page.getByRole('button', { name: 'Auswerten' }).click();
    await expect(page.locator('.disc a[href^="tel:"]')).toBeVisible();
  });

  test('phasenverlauf exposes emergency contacts from the shared data set', async ({ page }) => {
    await page.goto('/tools/phasenverlauf/');

    await page.locator('.pbtn[data-phase="severe-dep"]').click();
    await expect(page.locator('#detailCard')).toContainText('0800 33 66 55');
    await expect(page.locator('#detailCard a[href="tel:143"]')).toBeVisible();
  });

  test('krisenplan only loads local data after explicit storage consent and can reset it', async ({ page }) => {
    await page.goto('/tools/krisenplan/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const saveMode = page.getByLabel(/Lokal auf diesem Gerät speichern/i).first();
    await expect(page.getByRole('button', { name: 'Speichern' })).toBeDisabled();

    await saveMode.check();

    const warningField = page.locator('#warn_manie');
    await warningField.fill('Wenig Schlaf und starkes Reden');

    await page.getByRole('button', { name: 'Speichern' }).click();
    await expect(page.locator('#savedMsg')).toContainText('Gespeichert');

    await page.reload();
    await expect(warningField).toHaveValue('');
    await expect(page.locator('#storageModeStatus')).toContainText('gespeicherte Krisenplan-Daten');

    await saveMode.check();
    await expect(warningField).toHaveValue('Wenig Schlaf und starkes Reden');

    await page.getByRole('button', { name: 'Alle lokalen Daten löschen' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Endgültig löschen' }).click();

    await expect(warningField).toHaveValue('');
    await page.reload();
    await expect(warningField).toHaveValue('');
  });

  test('legacy modul 8 route redirects to anlaufstellen', async ({ page }) => {
    await page.goto('/modul/8/');
    await expect(page).toHaveURL(/\/anlaufstellen\/$/);
    await expect(page.getByRole('heading', { level: 1, name: /Anlaufstellen und Ressourcen/i })).toBeVisible();
  });

  test('mini-plan only saves and loads after explicit storage consent', async ({ page }) => {
    await page.goto('/werkzeuge/mini-plan/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const saveButton = page.getByRole('button', { name: 'Mini-Plan speichern' });
    await expect(saveButton).toBeDisabled();

    const storageConsent = page.getByLabel(/Mini-Plan lokal auf diesem Gerät speichern/i);
    await storageConsent.check();

    const numberField = page.locator('#miniPlanNumber');
    await numberField.fill('0800 33 66 55');
    await saveButton.click();
    await expect(page.locator('#miniPlanStatus')).toContainText('lokal auf diesem Gerät gespeichert');

    await page.reload();
    await expect(numberField).toHaveValue('');
    await expect(page.locator('#miniPlanStatus')).toContainText('gespeicherten Mini-Plan');

    await storageConsent.check();
    await expect(numberField).toHaveValue('0800 33 66 55');

    await page.getByRole('button', { name: 'Mini-Plan löschen' }).click();
    await expect(numberField).toHaveValue('');
  });
});

test.describe('lighthouse accessibility regressions', () => {
  test('module 1 bipolar type badges keep sufficient text contrast', async ({ page }) => {
    await page.goto('/modul/1/');
    await expectVisibleTextContrast(page, '.surface-explain-card__badge');
  });

  test('interactive tool chips keep sufficient text contrast', async ({ page }) => {
    await page.goto('/tools/eisberg/');
    await expectVisibleTextContrast(page, '.tag.ti');

    await page.goto('/tools/saeulen-check/');
    for (const pillarId of ['wissen', 'inseln', 'grenzen', 'krisenplan', 'entlastung']) {
      await page.locator(`[data-rate="${pillarId}"][data-rv="1"]`).click();
    }
    await expectVisibleTextContrast(page, '.sc button.sel .sl');
  });

  test('mini-plan inline links remain visually distinguishable beyond color', async ({ page }) => {
    await page.goto('/werkzeuge/mini-plan/');

    const decorations = await page
      .locator('.text-link-visible a')
      .evaluateAll((links) => links.map((link) => window.getComputedStyle(link).textDecorationLine));

    expect(decorations.length).toBeGreaterThan(0);
    expect(decorations.every((decoration) => decoration.includes('underline'))).toBe(true);
  });

  test('materials page keeps a sequential heading hierarchy', async ({ page }) => {
    await page.goto('/materialien/');
    await expectSequentialHeadings(page);
  });
});

test.describe('high-risk content flows', () => {
  test('site search returns relevant Pagefind results', async ({ page }) => {
    await page.goto('/suche/');

    const searchInput = page.locator('.pagefind-ui__search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Krisenplan');

    const resultLinks = page.locator('.pagefind-ui__result-link');
    await expect(resultLinks.first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('.pagefind-ui__results')).toContainText(/Krisenplan/i);

    const resultHrefs = await resultLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href') || ''),
    );
    expect(resultHrefs.some((href) => /krisenplan|modul\/6|materialien/.test(href))).toBe(true);
  });

  test('site search result links navigate to high-risk content pages', async ({ page }) => {
    await page.goto('/suche/');

    const searchInput = page.locator('.pagefind-ui__search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Suizidgedanken');

    const resultLinks = page.locator('.pagefind-ui__result-link');
    await expect(resultLinks.first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('.pagefind-ui__results')).toContainText(/Suizidgedanken/i);

    const targetLink = page.locator('.pagefind-ui__result-link[href="/notfall/"]').first();
    await expect(targetLink).toBeVisible();
    const href = await targetLink.getAttribute('href');
    expect(href).toBe('/notfall/');

    await targetLink.click();
    await expect(page).toHaveURL(/\/notfall\/$/);
    await expect(page.locator('main')).toContainText(/Suizidgedanken/i);
  });

  test('site search clear action resets the query and result list', async ({ page }) => {
    await page.goto('/suche/');

    const searchInput = page.locator('.pagefind-ui__search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Krisenplan');

    await expect(page.locator('.pagefind-ui__result-link').first()).toBeVisible({ timeout: 10_000 });

    await page.getByRole('button', { name: 'Löschen' }).click();
    await expect(searchInput).toHaveValue('');
    await expect(page.locator('.pagefind-ui__result-link')).toHaveCount(0);
  });

  test('materials preview PDFs open an in-page dialog with direct actions', async ({ page }) => {
    await page.goto('/materialien/');

    const previewLink = page.locator('a[data-pdf-mode="preview"][href^="/handouts/"]').first();
    await expect(previewLink).toBeVisible();
    const previewHref = await previewLink.getAttribute('href');
    expect(previewHref).toMatch(/^\/handouts\/.+\.pdf$/);

    await previewLink.click();

    const dialog = page.locator('.pdf-preview-dialog');
    await expect(dialog).toBeVisible();
    await expect(page.locator('#pdf-preview-title')).not.toHaveText('PDF-Vorschau auf dieser Seite');
    await expect(page.locator('body')).toHaveClass(/pdf-preview-open/);
    await expect(page.locator('#pdf-preview-frame')).toHaveAttribute('src', `${previewHref}#view=FitH`);
    await expect(page.locator('#pdf-preview-open')).toHaveAttribute('href', previewHref || '');
    await expect(page.locator('#pdf-preview-download')).toHaveAttribute('href', previewHref || '');
    await expect(page.locator('#pdf-preview-download')).toHaveAttribute('download', '');

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(page.locator('#pdf-preview-frame')).toHaveAttribute('src', 'about:blank');
    await expect(previewLink).toBeFocused();
  });

  test('module preview PDF links use the same accessible preview dialog', async ({ page }) => {
    await page.goto('/modul/1/');

    const previewLink = page.locator('a[data-pdf-mode="preview"][href="/handouts/a8_warnsignale.pdf"]').first();
    await expect(previewLink).toBeVisible();

    await previewLink.click();

    const dialog = page.locator('.pdf-preview-dialog');
    await expect(dialog).toBeVisible();
    await expect(page.locator('#pdf-preview-title')).toContainText(/Warnsignale/i);
    await expect(page.locator('#pdf-preview-close')).toBeFocused();
    await expect(page.locator('#pdf-preview-frame')).toHaveAttribute('src', '/handouts/a8_warnsignale.pdf#view=FitH');
    await expect(page.locator('main')).toHaveJSProperty('inert', true);

    await page.locator('#pdf-preview-close').click();
    await expect(dialog).toBeHidden();
    await expect(page.locator('main')).toHaveJSProperty('inert', false);
    await expect(previewLink).toBeFocused();
  });

  test('download PDF cards are not intercepted by the preview dialog handler', async ({ page }) => {
    await page.goto('/notfall/');

    const downloadLink = page.locator('a[data-pdf-mode="download"][href="/downloads/umgang-mit-suizidgedanken-puk-zuerich.pdf"]').first();
    await expect(downloadLink).toBeVisible();

    const defaultWasNotPrevented = await downloadLink.evaluate((link) =>
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 })),
    );

    expect(defaultWasNotPrevented).toBe(true);
    await expect(page.locator('.pdf-preview-dialog')).toBeHidden();
    await expect(page.locator('body')).not.toHaveClass(/pdf-preview-open/);
  });

  test('materials page exposes core downloads and the canonical rebuilt handout set', async ({ page }) => {
    await page.goto('/materialien/');

    const downloadLinks = page.locator('a[data-pdf-mode="download"][href^="/downloads/"]');
    await expect(downloadLinks).toHaveCount(9);

    const downloadHrefs = await downloadLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href') || ''),
    );

    expect(downloadHrefs).toEqual([
      '/downloads/notfallkarte-kanton-zuerich-puk.pdf',
      '/downloads/krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf',
      '/downloads/kurzblatt-was-stabilisiert-was-schadet-puk-zuerich.pdf',
      '/downloads/kritische-zeitpunkte-angehoerige-puk-zuerich.pdf',
      '/downloads/rechtliche-orientierung-angehoerige-puk-zuerich.pdf',
      '/downloads/umgang-mit-suizidgedanken-puk-zuerich.pdf',
      '/downloads/umgang-mit-manie-puk-zuerich.pdf',
      '/downloads/umgang-mit-depression-puk-zuerich.pdf',
      '/downloads/umgang-mit-psychose-wahn-puk-zuerich.pdf',
    ]);

    const handoutLinks = page.locator('a[data-pdf-mode="preview"][href^="/handouts/"]');
    await expect(handoutLinks).toHaveCount(14);

    const handoutHrefs = await handoutLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href') || ''),
    );

    expect(handoutHrefs).toEqual([
      '/handouts/a1_bipolare_stoerung_verstehen.pdf',
      '/handouts/a2_phasenverlauf.pdf',
      '/handouts/a6_bipolar_i_ii_mischzustaende.pdf',
      '/handouts/behandlung_verstehen.pdf',
      '/handouts/a9_schlaf_fruehwarnsystem.pdf',
      '/handouts/a8_warnsignale.pdf',
      '/handouts/absprachen_bevor_es_kippt.pdf',
      '/handouts/schwieriges_ruhig_ansprechen.pdf',
      '/handouts/wenn_behandlung_abgelehnt_wird.pdf',
      '/handouts/a3_ambivalente_loyalitaet.pdf',
      '/handouts/a4_ambiguous_loss.pdf',
      '/handouts/eltern_mit_bipolarer_stoerung.pdf',
      '/handouts/b11_hypervigilanz_erschoepfung.pdf',
      '/handouts/c6_selbstfuersorge.pdf',
    ]);

    for (const href of [...downloadHrefs, '/handouts/a1_bipolare_stoerung_verstehen.pdf']) {
      await expectPdfResponse(page, href);
    }
  });
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('menu opens on mobile and closes on escape with focus return', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: /Menü öffnen|Menü schliessen/i });
    await expect(toggle).toBeVisible();
    await toggle.click();

    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#primary-nav')).toBeVisible();
    await expect(page.locator('#primary-nav a[href="/module/"]')).toBeVisible();
    await expect(page.locator('#primary-nav a[href="/anlaufstellen/"]')).toBeVisible();
    await expect(page.locator('#primary-nav a[href="/materialien/"]')).toBeVisible();
    await expect(page.locator('#primary-nav a[href="/werkzeuge/"]')).toBeVisible();
    await expect(page.locator('a.nav-sos-mobile[href="/notfall/"]')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('module toc adapts when the viewport shrinks after load', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    await page.goto('/modul/1/');
    await expect(page.locator('.toc-mobile-toggle')).toHaveCount(0);
    await expect(page.locator('.toc ol')).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });

    const toggle = page.locator('.toc-mobile-toggle');
    await expect(toggle).toBeVisible();
    await expect(page.locator('.toc ol')).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.toc ol')).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page.locator('.toc-mobile-toggle')).toHaveCount(0);
    await expect(page.locator('.toc ol')).toBeVisible();

    await context.close();
  });
});
