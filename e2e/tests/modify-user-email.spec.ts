import { test, expect } from '@playwright/test';

test('modify user email', async ({ page }) => {
  await page.goto('https://dev.selfcare.pagopa.it/auth/login?onSuccess=%2F');
  await page.getByRole('button', { name: 'Accetta tutti' }).click();
  await page.getByRole('button', { name: 'Entra con SPID' }).click();
  await page.getByLabel('test').click();
  await page.getByLabel('Username').fill('p.rossi');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').fill('test');
  await page.getByRole('button', { name: 'Invia' }).click();
  await page.getByRole('button', { name: 'Invia' }).click();
  await page.getByRole('button', { name: 'Ats Madonie Sud Amministratore' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Utenti' }).click();
  await page.getByText('doci oraldo').click();
  await expect(page.getByRole('main')).toContainText('test@test.com');
  await page.getByRole('button', { name: 'Modifica' }).click();
  await page.getByLabel('E-mail istituzionale *').click();
  await page.getByLabel('E-mail istituzionale *').press('ControlOrMeta+a');
  await page.getByLabel('E-mail istituzionale *').press('ControlOrMeta+x');
  await page.getByLabel('E-mail istituzionale *').fill('test@test.it');
  await page.getByLabel('Conferma e-mail *').click();
  await page.getByLabel('Conferma e-mail *').press('ControlOrMeta+a');
  await page.getByLabel('Conferma e-mail *').press('ControlOrMeta+x');
  await page.getByLabel('Conferma e-mail *').fill('test@test.it');
  await page.getByRole('button', { name: 'Continua' }).click();
  await expect(page.getByRole('main')).toContainText('test@test.it');
  await page.getByRole('button', { name: 'Modifica' }).click();
  await page.getByLabel('E-mail istituzionale *').click();
  await page.getByLabel('E-mail istituzionale *').press('ControlOrMeta+a');
  await page.getByLabel('E-mail istituzionale *').press('ControlOrMeta+x');
  await page.getByLabel('E-mail istituzionale *').fill('test@test.com');
  await page.getByLabel('Conferma e-mail *').click();
  await page.getByLabel('Conferma e-mail *').press('ControlOrMeta+a');
  await page.getByLabel('Conferma e-mail *').press('ControlOrMeta+x');
  await page.getByLabel('Conferma e-mail *').fill('test@test.com');
  await page.getByRole('button', { name: 'Continua' }).click();
  await expect(page.getByRole('main')).toContainText('test@test.com');
});