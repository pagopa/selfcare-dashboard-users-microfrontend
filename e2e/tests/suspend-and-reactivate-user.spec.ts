import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('suspend-and-reactivate-user', async ({ page }) => {
  await login(page, 'p.rossi', 'test');
  await page.getByRole('button', { name: 'Ats Madonie Sud Amministratore' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Utenti' }).click();
  await expect(page.getByRole('grid')).toContainText('sisti mattia');
  await page.getByText('sisti mattia').click();
  await expect(page.getByRole('button', { name: 'Sospendi' })).toBeVisible();
  await page.getByRole('button', { name: 'Sospendi' }).click();
  await expect(page.getByRole('dialog')).toContainText(
    'Vuoi sospendere mattia sisti dal ruolo di Amministratore?Se lo sospendi, non potrà più operare su SEND - Servizio Notifiche Digitali. Puoi riabilitarlo in qualsiasi momento.'
  );
  await page.getByRole('button', { name: 'Sospendi' }).click();
  setTimeout(() => {}, 2000);
  await expect(page.getByRole('main')).toContainText('Riabilita');
  await page.getByRole('button', { name: 'Riabilita' }).click();
  await expect(page.getByRole('dialog')).toContainText(
    'Vuoi riabilitare mattia sisti dal ruolo di Amministratore?Se lo riabiliti, potrà operare di nuovo su SEND - Servizio Notifiche Digitali. Puoi sospenderlo di nuovo in qualsiasi momento.'
  );

  await page
    .getByRole('dialog')
    .locator('div')
    .filter({ hasText: /^Riabilita$/ })
    .click();

  await expect(page.getByRole('button', { name: 'Sospendi' })).toBeVisible();
});
