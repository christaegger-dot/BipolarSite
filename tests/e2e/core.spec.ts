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

  test('werkzeuge overview exposes krisenplan and a distinct emergency path', async ({ page }) => {
    await page.goto('/werkzeuge/');

    await expect(page.getByRole('heading', { level: 1, name: /Werkzeuge im Überblick/i })).toBeVisible();
    await expect(page.locator('a[href="/tools/krisenplan/"]').first()).toBeVisible();

    const emergencyCard = page.locator('.tool-guide-item--alert[href="/notfall/"]');
    await expect(emergencyCard).toBeVisible();
    await expect(emergencyCard).toContainText(/Es ist akut/i);
  });

  test('krisenplan persists, reloads and resets local data', async ({ page }) => {
    await page.goto('/tools/krisenplan/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const warningField = page.locator('#warn_manie');
    await warningField.fill('Wenig Schlaf und starkes Reden');

    await page.getByRole('button', { name: 'Speichern' }).click();
    await expect(page.locator('#savedMsg')).toContainText('Gespeichert');

    await page.reload();
    await expect(warningField).toHaveValue('Wenig Schlaf und starkes Reden');

    await page.getByRole('button', { name: 'Zurücksetzen' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Endgültig löschen' }).click();

    await expect(warningField).toHaveValue('');
    await page.reload();
    await expect(warningField).toHaveValue('');
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
});
