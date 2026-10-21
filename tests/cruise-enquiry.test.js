const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('cruise port-call details survive submission through the shared form client', async () => {
  const fields = {
    tour: 'Cruise Ship Excursions', date: '2026-12-01', guests: '4',
    ship: 'Example ship', port: 'Banjul', arrival: '08:00', allAboard: '17:00',
    guideLanguage: 'Polish', name: 'Test guest', email: 'test@example.com', notes: 'Gentle walking'
  };
  let submit, received;
  const button = { disabled: false };
  const feedback = { className: '', dataset: {}, setAttribute() {}, classList: { remove() {}, add() {} } };
  const form = {
    dataset: { source: 'cruise-excursion-enquiry' },
    addEventListener: (_, fn) => { submit = fn; }, reportValidity: () => true,
    querySelector: selector => selector === 'button[type="submit"]' ? button : feedback,
    reset() {}, after() {}, dispatchEvent() {}
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../form-client.js'), 'utf8'), {
    document: { querySelectorAll: () => [form], documentElement: { lang: 'en' }, createElement: () => ({ setAttribute() {}, append() {} }) },
    window: { location: { protocol: 'http:', href: 'http://localhost/cruise-ship-excursions-tour.html' } },
    FormData: class { entries() { return Object.entries(fields); } },
    crypto: { randomUUID: () => 'test' }, Event: class {},
    submitWebsiteEnquiry: async payload => { received = payload; return { id: 'GT-TEST' }; }
  });
  await submit({ preventDefault() {} });
  assert.equal(received.source, 'cruise-excursion-enquiry');
  assert.equal(received.tour, fields.tour);
  for (const value of ['Example ship', 'Banjul', '08:00', '17:00', 'Polish', 'Gentle walking']) assert.ok(received.notes.includes(value));
  assert.equal(form.dataset.submitted, 'true');
});
