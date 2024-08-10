import { formatlastModified } from './lastModified';
// import type { LocalesArgument } from 'intl';


describe('formatDate2', () => {
  /*
  let originalToLocaleString: jest.SpyInstance;

  beforeAll(() => {
    // Mock the toLocaleString method to always use en-US locale
    originalToLocaleString = jest.spyOn(Date.prototype, 'toLocaleString').mockImplementation(function (this: Date, _locales?: LocalesArgument, options?: Intl.DateTimeFormatOptions): string {
      return Date.prototype.toLocaleString.call(this, 'en-US', options);
    });
  });

  afterAll(() => {
    // Restore the original toLocaleString method
    originalToLocaleString.mockRestore();
  });
  */


  test('returns "Updated X hours ago" for dates within the last 24 hours', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000); // 1 hour ago
    expect(formatlastModified(oneHourAgo)).toBe('Updated 1 hours ago');
  });

  test('returns "Updated on Month Day, Year" for dates more than a year ago', () => {
    const moreThanAYearAgo = new Date('2022-01-01T00:00:00');
    expect(formatlastModified(moreThanAYearAgo)).toBe('Updated on January 1, 2022');
  });

  test('returns "Updated on Month Day" for dates within the last year but more than 24 hours ago', () => {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    const expectedMonth = twoDaysAgo.toLocaleString('default', { month: 'long' });
    const expectedDay = twoDaysAgo.getDate();
    expect(formatlastModified(twoDaysAgo)).toBe(`Updated on ${expectedMonth} ${expectedDay}`);
  });
});