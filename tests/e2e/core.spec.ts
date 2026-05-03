import { expect, test, type Page } from '@playwright/test';

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

test.describe('core user paths', () => {
  test('homepage loads with module and emergency entry points', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(/bipolarer Störung/i);
    await expect(page.locator('a[href="/module/"]').first()).toBeVisible();
    await expect(page.locator('a[href="/notfall/"]').first()).toBeVisible();
  });

  test('notfall page exposes 144 and keeps mobile width stable', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();

    await page.goto('/notfall/');

    await expect(page.getByRole('heading', { level: 1, name: /Notfall/i })).toBeVisible();
    await expect(page.locator('a[href="tel:144"]').first()).toBeVisible();
    await expect(page.locator('a[href="tel:144"]').first()).toHaveAttribute('href', 'tel:144');
    await expectNoHorizontalScroll(page);

    await context.close();
  });

  test('module overview links into modul 1 and toc remains reachable', async ({ page }) => {
    await page.goto('/module/');

    const modul1Link = page.locator('a[href="/modul/1/"]').first();
    await expect(modul1Link).toBeVisible();

    await page.goto('/modul/1/');
    await expect(page.getByRole('heading', { level: 1, name: /Die bipolare Störung verstehen/i })).toBeVisible();

    const tocLink = page.locator('.toc a[href="#verstehen"]').first();
    await expect(tocLink).toBeVisible();
    await tocLink.click();
    await expect(page).toHaveURL(/#verstehen$/);
    await expect(page.locator('#verstehen')).toBeVisible();
  });

  test('desktop toc sidebar includes the real first module target', async ({ page }) => {
    await page.goto('/modul/1/');

    const sidebarLink = page.locator('.toc-sidebar a[href="#neu"]').first();
    await expect(sidebarLink).toBeVisible();
    await expect(sidebarLink).toHaveClass(/active/);
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

    await page.getByRole('button', { name: /Schwere Depression/i }).click();
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

  test('mini-plan only saves and loads after explicit storage consent', async ({ page }) => {
    await page.goto('/modul/8/');
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
