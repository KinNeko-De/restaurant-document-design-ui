import { formatTimeDifference } from './timeDifference';
// import type { LocalesArgument } from 'intl';

describe('formatTimeDifference', () => {
  
  beforeAll(() => {
    jest.useFakeTimers('modern' as unknown as FakeTimersConfig);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  
  /*
  let mockToLocaleString: jest.SpyInstance<string, [locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions | undefined], any>;

  beforeAll(() => {
    mockToLocaleString = jest.spyOn(Date.prototype, 'toLocaleString').mockImplementation(function (this: Date, _locales?: LocalesArgument, options?: Intl.DateTimeFormatOptions): string {
      return Date.prototype.toLocaleString.call(this, 'de-DE', options);
    });
  });

  afterAll(() => {
    mockToLocaleString.mockRestore();
  });
  */

  test('milliseconds: Modified less than a second ago, upper boundary', () => {
    const expectedMessage = 'less than a second ago';
    const modifiedLessThanASecondAgo = new Date(2022, 0, 1, 0, 0, 0, 800);
    const now = new Date(2022, 0, 1, 0, 0, 0, 900);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedLessThanASecondAgo)).toBe(expectedMessage);
  });

  test('seconds: Modified exactly one second ago, lower boundary', () => {
    const expectedDifference = 1;
    const expectedUnit = 'second';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 0, 0, 1, 0);
    
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('seconds: Modified more than a second but less than two second, upper boundary', () => {
    const expectedDifference = 1;
    const expectedUnit = 'second';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 0, 0, 1, 999);
    
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('seconds: Modified exactly 2 seconds ago, lower boundary', () => {
    const expectedDifference = 2;
    const expectedUnit = 'seconds';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 0, 0, 2, 0);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('seconds: Modified more than 2 seconds but less than one minute ago, upper boundary', () => {
    const expectedDifference = 59;
    const expectedUnit = 'seconds';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 0, 0, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('minutes: Modified exactly one minute ago, lower boundary', () => {
    const expectedDifference = 1;
    const expectedUnit = 'minute';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 0, 1, 0, 0);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('minutes: Modified more than a minute but less than two minutes, upper boundary', () => {
    const expectedDifference = 1;
    const expectedUnit = 'minute';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 0, 1, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('minutes: Modified exactly 2 minutes ago, lower boundary', () => {
    const expectedDifference = 2;
    const expectedUnit = 'minutes';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 0, 2, 0, 0);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('minutes: Modified more than 2 minutes but less than one hour ago, upper boundary', () => {
    const expectedDifference = 59;
    const expectedUnit = 'minutes';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 0, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('hours: Modified exactly one hour ago, lower boundary', () => {
    const expectedDifference = 1;
    const expectedUnit = 'hour';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 1, 0, 0, 0);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('hours: Modified more than a hour but less than two hours, upper boundary', () => {
    const expectedDifference = 1;
    const expectedUnit = 'hour';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 1, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('hours: Modified exactly 2 hours ago, lower boundary', () => {
    const expectedDifference = 2;
    const expectedUnit = 'hours';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 2, 0, 0, 0);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('hours: Modified more than 2 hours but less than one day ago, upper boundary', () => {
    const expectedDifference = 23;
    const expectedUnit = 'hours';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 1, 23, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('days: Modified exactly one day ago, lower boundary', () => {
    const expectedMessage = `yesterday`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 2, 0, 0, 0, 0);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('days: Modified more than a day but less than two days, upper boundary', () => {
    const expectedMessage = `yesterday`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 2, 23, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('days: Modified exactly 2 days ago, lower boundary', () => {
    const expectedDifference = 2;
    const expectedUnit = 'days';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 3, 0, 0, 0, 0);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('days: monthWith31Days, Modified more than 2 days but less than one month ago, upper boundary', () => {
    const expectedDifference = 30;
    const expectedUnit = 'days';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 0, 1, 0, 0, 0, 0);
    const now = new Date(2022, 0, 31, 23, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('days: monthWith30Days, Modified more than 2 days but less than one month ago, upper boundary', () => {
    const expectedDifference = 29;
    const expectedUnit = 'days';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 3, 1, 0, 0, 0, 0);
    const now = new Date(2022, 3, 30, 23, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('days: monthWith28Days,  Modified more than 2 days but less than one month ago, upper boundary', () => {
    const expectedDifference = 26;
    const expectedUnit = 'days';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2022, 1, 1, 0, 0, 0, 0);
    const now = new Date(2022, 1, 27, 23, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('days: monthWith29Days,  Modified more than 2 days but less than one month ago, upper boundary', () => {
    const expectedDifference = 27;
    const expectedUnit = 'days';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2020, 1, 1, 0, 0, 0, 0);
    const now = new Date(2020, 1, 28, 23, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('days, overlappingMonthes with 30 days Modified more than 2 days but less than one month ago, upper boundary', () => {
    const expectedDifference = 29;
    const expectedUnit = 'days';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2020, 3, 15, 0, 0, 0, 0);
    const now = new Date(2020, 4, 14, 23, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });

  test('days, overlappingMonthes with 31 days Modified more than 2 days but less than one month ago, upper boundary', () => {
    const expectedDifference = 30;
    const expectedUnit = 'days';
    const expectedMessage = `${expectedDifference} ${expectedUnit} ago`;
    const modifiedMoreThanASecondButLessThanAHour = new Date(2020, 4, 15, 0, 0, 0, 0);
    const now = new Date(2020, 5, 14, 23, 59, 59, 999);
    jest.setSystemTime(now);

    expect(formatTimeDifference(modifiedMoreThanASecondButLessThanAHour)).toBe(expectedMessage);
  });
});