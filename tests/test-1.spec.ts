import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todo.ly/');
  await page.locator('.HPHeaderLogin > a').click();
  await page.locator('#ctl00_MainContent_LoginControl1_TextBoxEmail').click();
  await page.locator('#ctl00_MainContent_LoginControl1_TextBoxEmail').fill('d');
  await page.locator('#ctl00_MainContent_LoginControl1_TextBoxPassword').click();
  await page.getByRole('button', { name: 'Submit' }).click();
 //await page.getByRole('cell', { name: 'Add New Project', exact: true }).click();
  
  await page.locator('#NewProjNameButton').click();
 await page.locator('#NewProjNameInput').click();
  await page.locator('#NewProjNameInput').fill('p');
  await page.locator('#NewProjNameButton').click();
  await page.getByRole('cell', { name: 'Mauritania', exact: true }).click();
  await page.getByRole('row', { name: 'prueba1 Options', exact: true }).locator('#ListIcon').click();
  await page.getByRole('img', { name: 'Options' }).click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('img', { name: 'Save' }).click();
  await page.getByRole('img', { name: 'Options' }).click();
  await page.locator('span:nth-child(5)').first().click();
});