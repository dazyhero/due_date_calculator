const DateValidator = require('../src/DateValidator');
const DateError = require('../src/Errors/DateErrors');
const DateConfig = require('../src/DateConfig');
const config = require('../src/config');

const dateConfig = new DateConfig(config);

const dateValidator = new DateValidator(dateConfig);

describe('DateValidator', () => {
  describe('isValidDate', () => {
    it('Should handle valid date', () => {
      const date = new Date(Date.UTC(2020, 5, 2, 15, 58, 0));
      expect(dateValidator._isValidDate(date)).toBe(true);
    });

    it('Should handle invalid date', () => {
      const date = 'not a date';
      expect(() => dateValidator._isValidDate(date)).toThrow(DateError);
    });
  });

  describe('isValidSubmitHours', () => {
    it('Should handle valid submit hours', () => {
      const date = new Date(Date.UTC(2020, 5, 2, 15, 58, 0));
      expect(dateValidator._isValidSubmitHours(date)).toBe(true);
    });

    it('Should handle after submit hours', () => {
      const date = new Date(Date.UTC(2020, 5, 2, 18, 58, 0));
      expect(() => dateValidator._isValidSubmitHours(date)).toThrow(DateError);
    });

    it('Should handle before submit hours', () => {
      const date = new Date(Date.UTC(2020, 5, 2, 8, 58, 0));
      expect(() => dateValidator._isValidSubmitHours(date)).toThrow(DateError);
    });
  });

  describe('isValidHours', () => {
    it('Should handle valid hours', () => {
      const hours = 12;
      expect(dateValidator._isValidHours(hours)).toBe(true);
    });

    it('Should handle invalid hours', () => {
      const hours = -2;
      expect(() => dateValidator._isValidHours(hours)).toThrow(DateError);
    });
  });

  describe('isValidInput', () => {
    it('Should handle valid input', () => {
      const date = new Date(Date.UTC(2020, 5, 2, 9, 58, 0));
      const turnAround = 12;
      expect(dateValidator.isValidInput(date, turnAround)).toBe(true);
    });

    it('Should handle invalid hours', () => {
      const date = new Date(Date.UTC(2020, 5, 2, 9, 58, 0));
      const turnAround = -12;
      expect(() => dateValidator.isValidInput(date, turnAround)).toThrow(
        DateError
      );
    });
  });

  describe('isValidDay', () => {
    it('Should handle valid day', () => {
      const date = new Date(Date.UTC(2020, 5, 2, 9, 58, 0));
      expect(dateValidator._isValidDay(date)).toBe(true);
    });

    it('Should handle not working day', () => {
      const date = new Date(Date.UTC(2020, 5, 6, 9, 58, 0));
      expect(() => dateValidator._isValidDay(date)).toThrow(DateError);
    });

    it('Should handle invalid day', () => {
      const date = 'not a date';
      expect(() => dateValidator._isValidDay(date)).toThrow(DateError);
    });
  });

  describe('isWorkDay', () => {
    it('Should handle work day', () => {
      const date = new Date('2020-06-02T09:58:00');
      expect(dateValidator.isWorkDay(date)).toBe(true);
    });

    it('Should handle not working day', () => {
      const date = new Date('2020-06-06T09:58:00');
      expect(dateValidator.isWorkDay(date)).toBe(false);
    });
  });
});
