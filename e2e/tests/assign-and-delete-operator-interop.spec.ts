import { expect, test } from '@playwright/test';
import { login } from '../utils/login';

test('assign and delete operator role for interop', async ({ page }) => {
  await login(page, 'p.rossi', 'test');
  await page.getByRole('button', { name: 'Ats Madonie Sud Amministratore' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Utenti' }).click();
  await page.getByRole('tab', { name: 'Interoperabilità', exact: true }).click();
  await page.getByRole('button', { name: 'Aggiungi utente' }).click();
  await page.getByLabel('Codice Fiscale *').click();
  await page.getByLabel('Codice Fiscale *').fill('SRTNLM09T06G635S');
  await page.getByLabel('E-mail istituzionale *').click();
  await page.getByLabel('E-mail istituzionale *').press('ControlOrMeta+a');
  await page.getByLabel('E-mail istituzionale *').press('ControlOrMeta+c');
  await page.getByLabel('Conferma e-mail *').click();
  await page.getByLabel('Conferma e-mail *').fill('test@test.com');
  await page.getByLabel('Seleziona il prodotto').click();
  await page.getByTestId('product: prod-interop').click();
  await expect(page.locator('form')).toContainText('Operatore API');
  await page.getByLabel('Operatore APIGestisce il').check();
  await page.getByRole('button', { name: 'Continua' }).click();
  await expect(page.getByRole('dialog')).toContainText(
    'Vuoi assegnare a Anselmo Sartori il ruolo di Operatore API per Interoperabilità?'
  );
  await page.getByRole('button', { name: 'Assegna' }).click();
  await page.getByRole('button', { name: 'Assegna ruolo' }).click();
  await expect(page.getByRole('main')).toContainText('Assegna un nuovo ruolo');
  await page.getByLabel('Seleziona il prodotto').click();
  await page.getByTestId('product: prod-interop-atst').click();
  await page.getByLabel('Operatore APIGestisce il').check();
  await page.getByRole('button', { name: 'Continua' }).click();
  await expect(page.getByRole('dialog')).toContainText('Assegna ruolo');
  await page.getByRole('button', { name: 'Assegna' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Ruolo assegnato correttamente');
  await page.getByRole('button', { name: 'Rimuovi' }).first().click();
  await page.getByRole('button', { name: 'Rimuovi' }).click();
  await page.getByRole('tab', { name: 'Interoperabilità', exact: true }).click();
  await page.getByText('sartori anselmo').click();
  await page.getByRole('button', { name: 'Rimuovi' }).click();
  await page.getByRole('button', { name: 'Rimuovi' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Utente rimosso correttamente');
});
