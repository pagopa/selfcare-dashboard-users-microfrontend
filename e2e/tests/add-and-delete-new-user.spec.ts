import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('Add and delete new user', async ({ page }) => {
  await login(page, 'p.rossi', 'test');
  await page.getByRole('button', { name: 'Ats Madonie Sud Amministratore' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Utenti' }).click();
  await page.getByRole('button', { name: 'Aggiungi utente' }).click();
  await page.getByLabel('Codice Fiscale *').click();
  await page.getByLabel('Codice Fiscale *').fill('SRTNLM09T06G635S');
  await page.getByLabel('E-mail istituzionale *').click();
  await page.getByLabel('E-mail istituzionale *').fill('test@test.com');
  await page.getByLabel('Conferma e-mail *').click();
  await page.getByLabel('E-mail istituzionale *').dblclick();
  await page.getByLabel('E-mail istituzionale *').press('ControlOrMeta+a');
  await page.getByLabel('E-mail istituzionale *').press('ControlOrMeta+c');
  await page.getByLabel('Conferma e-mail *').click();
  await page.getByLabel('Conferma e-mail *').fill('test@test.com');
  await page.getByLabel('Seleziona il prodotto').click();
  await page.getByTestId('product: prod-pn').click();
  await page.getByLabel('AmministratoreHa tutti i').check();
  await page.getByRole('button', { name: 'Continua' }).click();
  await page.getByRole('button', { name: 'Assegna' }).click();
  setTimeout(() => {}, 2000);
  await expect(page.getByRole('main')).toContainText('Rimuovi');
  await page.getByRole('button', { name: 'Rimuovi' }).click();
  await page.getByRole('button', { name: 'Rimuovi' }).click();
  await expect(page.getByRole('main')).toContainText(
    'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.'
  );
});
