import { test, expect } from '@playwright/test';

test('sample lesson completes, persists, and stays completed after rereading', async ({ page }) => {
  await page.goto('/learn/habits');
  const answers = [
    'Read one page after my morning coffee',
    'It happens reliably in your existing routine',
    'Leave a pencil and sketchbook on your table',
    'Review the obstacle and return to a small action',
  ];
  for (const [index, answer] of answers.entries()) {
    await page.getByLabel(answer, { exact: false }).check();
    await page.getByRole('button', { name: 'Check my answer' }).click();
    await expect(page.getByText('You’ve got it.', { exact: true })).toBeVisible();
    await page
      .getByRole('button', { name: index === 3 ? 'Complete lesson' : 'Next chapter' })
      .click();
  }
  await expect(page.getByRole('heading', { name: 'That clicked.' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'That clicked.' })).toBeVisible();
  await page.getByRole('button', { name: /The idea/ }).click();
  await page.goto('/studio');
  await expect(page.getByText('Lesson completed', { exact: true })).toBeVisible();
});

test('course brief is saved locally and survives reload', async ({ page }) => {
  await page.goto('/studio');
  await page
    .getByLabel('What would you like to understand?')
    .fill('Understand how to give better feedback');
  await page.getByRole('button', { name: 'Save my idea' }).click();
  await expect(page.getByRole('status')).toContainText('Your brief is saved on this device.');
  await page.reload();
  await expect(page.getByLabel('What would you like to understand?')).toHaveValue(
    'Understand how to give better feedback',
  );
});

test('preview chapters work and primary pages fit the viewport', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Next preview chapter' }).click();
  await expect(page.getByText('02 / 04', { exact: true })).toBeVisible();
  for (const path of [
    '/',
    '/studio',
    '/learn/ai',
    '/learn/thinking',
    '/privacy',
    '/terms',
    '/credits',
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  expect((await page.goto('/learn/missing'))?.status()).toBe(404);
});
