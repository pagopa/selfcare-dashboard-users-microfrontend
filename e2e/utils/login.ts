import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.goto('https://dev.selfcare.pagopa.it/auth/login?onSuccess=%2F');
  await page.getByRole('button', { name: 'Accetta tutti' }).click();
  await page.getByRole('button', { name: 'Entra con SPID' }).click();
  await page.getByLabel('test').click();
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Invia' }).click();
  await page.getByRole('button', { name: 'Invia' }).click();
}
