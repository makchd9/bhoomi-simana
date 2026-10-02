import { test, expect } from '@playwright/test';
import { getLeadErrors, isValidMobile, validateLead } from '../src/lib/enquiry';
const base = 'http://127.0.0.1:3001';

test('mobile validation accepts Indian formats and rejects short or malformed entries', () => {
  for (const phone of ['9876543210', '+91 98765 43210', '919876543210', '09876543210', '+1 202 555 0123']) expect(isValidMobile(phone), phone).toBe(true);
  for (const phone of ['1234567', '1234567890', '+91 1234567890', '98765abc10', '++91 98765 43210']) expect(isValidMobile(phone), phone).toBe(false);
  const valid = {name:'Local Test',phone:'+91 98765 43210',email:'test@example.com',configuration:'3 BHK Smart',enquiryType:'Request Pricing',message:'',consent:true};
  expect(validateLead(valid)).toMatchObject({...valid,callback:''});
  expect(getLeadErrors({...valid,name:'',phone:'123',email:'bad',consent:false})).toHaveProperty('phone');
  expect(getLeadErrors(valid)).toEqual({});
});

test('approved records, developer evidence, location illustration and mobile form are consistent', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${base}/about-bhoomi`);
  for (const value of ['61+', '12.5M+', '17,000+']) await expect(page.locator('.legacy-proof')).toContainText(value);
  await expect(page.locator('.legacy-projects')).not.toContainText('↗');
  await page.locator('.legacy-proof').scrollIntoViewIfNeeded();
  await page.screenshot({path:'.21st/previews/refinement-developer-mobile.png'});
  await page.goto(`${base}/rera`);
  for (const [wing, number] of [['A Wing','P51900033361'],['B Wing','P51900033360'],['C Wing','PR1170002500564']]) {
    const item=page.locator('.rera-list > div').filter({hasText:wing});
    await expect(item).toContainText(number);
    await expect(item.locator('a')).toHaveAttribute('href',/maharerait.maharashtra.gov.in/);
    await expect(page.locator('.footer-registrations')).toContainText(`${wing} — ${number}`);
  }
  await expect(page.locator('body')).not.toContainText(/mapping requires|discrepancy remains|Bhoomi Properties/);
  await page.goto(`${base}/location`);
  await expect(page.locator('.nearby-categories > div')).toHaveCount(4);
  for (const name of ['KEM Hospital','JBCN','Palladium Mall']) await expect(page.locator('.nearby-categories')).toContainText(name);
  await expect(page.locator('.illustrated-map img')).toHaveAttribute('src','/images/simana/location-brochure.webp');
  await expect(page.getByRole('link',{name:'Book a site visit',exact:true})).toHaveAttribute('href','/contact?type=Book%20Site%20Visit');
  await page.locator('.illustrated-map').scrollIntoViewIfNeeded();
  await expect(page.locator('.illustrated-map img')).toBeVisible();
  await page.screenshot({path:'.21st/previews/refinement-map-mobile.png'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.goto(`${base}/contact#enquiry-form`);
  await page.locator('input[name="phone"]').fill('123');
  await page.locator('input[name="email"]').focus();
  await expect(page.locator('#enquiry-phone-error')).toContainText('valid mobile number');
  await expect(page.locator('input[name="phone"]')).toHaveAttribute('aria-invalid','true');
  await page.locator('input[name="phone"]').fill('+91 98765 43210');
  await page.locator('input[name="email"]').focus();
  await expect(page.locator('#enquiry-phone-error')).toHaveCount(0);
  await expect(page.locator('input[name="callback"]')).toHaveCount(0);
  await page.getByLabel('Configuration',{exact:true}).selectOption('3 BHK Smart');
  await expect(page.getByRole('button',{name:'Online enquiries coming soon'})).toBeDisabled();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
