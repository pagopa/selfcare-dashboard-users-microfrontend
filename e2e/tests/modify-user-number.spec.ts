import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('modify usen number', async ({ page }) => {
  await login(page, 'p.rossi', 'test');
  await page.getByRole('button', { name: 'Ats Madonie Sud Amministratore' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Utenti' }).click();
  await expect(page.getByRole('grid')).toContainText('rossi paolo (tu)');
  await page.getByText('rossi paolo (tu)').click();
  await page.getByRole('button', { name: 'Modifica' }).click();
  await page.getByLabel('Tel. di lavoro (facoltativo)').click();
  await page.getByLabel('Tel. di lavoro (facoltativo)').press('ControlOrMeta+a');
  await page.getByLabel('Tel. di lavoro (facoltativo)').press('ControlOrMeta+x');
  await page.getByLabel('Tel. di lavoro (facoltativo)').fill('123456789');
  await page.getByRole('button', { name: 'Continua' }).click();
  await expect(page.getByRole('main')).toContainText('123456789');
});
