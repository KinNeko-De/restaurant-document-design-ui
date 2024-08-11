import { formatTimeDifference } from './lastModified';
// import type { LocalesArgument } from 'intl';


describe.each`
modified | now | expectedMessage | testcase
${new Date(2022, 0, 1, 0, 0, 0, 800)} | ${new Date(2022, 0, 1, 0, 0, 0, 900)} | ${'less than a second ago'} | ${'milliseconds: Modified less than a second ago, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 0, 1, 0)} | ${'1 second ago'} | ${'seconds: Modified exactly one second ago, lower boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 0, 1, 999)} | ${'1 second ago'} | ${'seconds: Modified more than a second but less than two second, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 0, 2, 0)} | ${'2 seconds ago'} | ${'seconds: Modified exactly 2 seconds ago, lower boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 0, 59, 999)} | ${'59 seconds ago'} | ${'seconds: Modified more than 2 seconds but less than one minute ago, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 1, 0, 0)} | ${'1 minute ago'} | ${'minutes: Modified exactly one minute ago, lower boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 1, 59, 999)} | ${'1 minute ago'} | ${'minutes: Modified more than a minute but less than two minutes, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 2, 0, 0)} | ${'2 minutes ago'} | ${'minutes: Modified exactly 2 minutes ago, lower boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 59, 59, 999)} | ${'59 minutes ago'} | ${'minutes: Modified more than 2 minutes but less than one hour ago, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 1, 0, 0, 0)} | ${'1 hour ago'} | ${'hours: Modified exactly one hour ago, lower boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 1, 59, 59, 999)} | ${'1 hour ago'} | ${'hours: Modified more than a hour but less than two hours, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 2, 0, 0, 0)} | ${'2 hours ago'} | ${'hours: Modified exactly 2 hours ago, lower boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 23, 59, 59, 999)} | ${'23 hours ago'} | ${'hours: Modified more than 2 hours but less than one day ago, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 2, 0, 0, 0, 0)} | ${'yesterday'} | ${'days: Modified exactly one day ago, lower boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 2, 23, 59, 59, 999)} | ${'yesterday'} | ${'days: Modified more than a day but less than two days, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 3, 0, 0, 0, 0)} | ${'2 days ago'} | ${'days: Modified exactly 2 days ago, lower boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 31, 23, 59, 59, 999)} | ${'30 days ago'} | ${'days: monthWith31Days, Modified more than 2 days but less than one month ago, upper boundary'}
${new Date(2022, 3, 1, 0, 0, 0, 0)} | ${new Date(2022, 3, 30, 23, 59, 59, 999)} | ${'29 days ago'} | ${'days: monthWith30Days, Modified more than 2 days but less than one month ago, upper boundary'}
${new Date(2022, 1, 1, 0, 0, 0, 0)} | ${new Date(2022, 1, 27, 23, 59, 59, 999)} | ${'26 days ago'} | ${'days: monthWith28Days,  Modified more than 2 days but less than one month ago, upper boundary'}
${new Date(2020, 1, 1, 0, 0, 0, 0)} | ${new Date(2020, 1, 28, 23, 59, 59, 999)} | ${'27 days ago'} | ${'days: monthWith29Days,  Modified more than 2 days but less than one month ago, upper boundary'}
${new Date(2020, 3, 15, 0, 0, 0, 0)} | ${new Date(2020, 4, 14, 23, 59, 59, 999)} | ${'29 days ago'} | ${'days, overlappingMonthes with 30 days Modified more than 2 days but less than one month ago, upper boundary'}
${new Date(2020, 4, 15, 0, 0, 0, 0)} | ${new Date(2020, 5, 14, 23, 59, 59, 999)} | ${'30 days ago'} | ${'days, overlappingMonthes with 31 days Modified more than 2 days but less than one month ago, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 1, 1, 0, 0, 0, 0)} | ${'last month'} | ${'months: Modified exactly one month ago, lower boundary'}
${new Date(2022, 1, 1, 0, 0, 0, 0)} | ${new Date(2022, 2, 31, 23, 59, 59, 999)} | ${'last month'} | ${'months monthWith31Days: Modified more than a month but less than two months, upper boundary'}
${new Date(2022, 2, 1, 0, 0, 0, 0)} | ${new Date(2022, 3, 30, 23, 59, 59, 999)} | ${'last month'} | ${'months monthWith30Days: Modified more than a month but less than two months, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 1, 28, 23, 59, 59, 999)} | ${'last month'} | ${'months monthWith28Days: Modified more than a month but less than two months, upper boundary'}
${new Date(2020, 0, 1, 0, 0, 0, 0)} | ${new Date(2020, 1, 29, 23, 59, 59, 999)} | ${'last month'} | ${'months monthWith29Days: Modified more than a month but less than two months, upper boundary'}
${new Date(2022, 11, 15, 0, 0, 0, 0)} | ${new Date(2023, 0, 14, 23, 59, 59, 999)} | ${'last month'} | ${'months, overlappingYear: Modified more than a month but less than two months, upper boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 2, 1, 0, 0, 0, 0)} | ${'2 months ago'} | ${'months: Modified exactly 2 months ago, lower boundary'}
${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 11, 31, 23, 59, 59, 999)} | ${'11 months ago'} | ${'months: Modified more than 2 months but less than a year ago, upper boundary'}
${new Date(2021, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${'last year'} | ${'years: Modified exactly one year ago, lower boundary'}
${new Date(2021, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 11, 31, 23, 59, 59, 999)} | ${'last year'} | ${'years: Modified more than a year but less than two years ago, upper boundary'}
${new Date(2020, 0, 1, 0, 0, 0, 0)} | ${new Date(2022, 0, 1, 0, 0, 0, 0)} | ${'2 years ago'} | ${'years: Modified exactly 2 years ago, lower boundary'}
`('formatTimeDifference', ({ modified, now, expectedMessage, testcase }) => {

  beforeAll(() => {
    jest.useFakeTimers('modern' as unknown as FakeTimersConfig);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test(`${testcase}`, () => {
    jest.setSystemTime(now);
    expect(formatTimeDifference(modified)).toBe(expectedMessage);
  });
});