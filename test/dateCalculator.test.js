const DateValidator = require('../src/DateValidator');
const DateConfig = require('../src/DateConfig');
const DateCalculator = require('../src/DateCalculator');
const config = require('../src/config');

const dateConfig = new DateConfig(config);
const dateValidator = new DateValidator(dateConfig);
const dateCalculator = new DateCalculator(dateValidator, dateConfig);

describe('DateCalculator', () => {
  describe('addDay', () => {
    it('Should return Monday', () => {
      const date = new Date(Date.UTC(2020, 5, 5, 16, 0, 0));
      expect(dateCalculator.addDay(date)).toEqual(
        new Date('2020-06-08T09:00:00.000Z')
      );
    });

    it('Should return Friday', () => {
      const date = new Date(Date.UTC(2020, 5, 4, 17, 0, 0));
      expect(dateCalculator.addDay(date)).toEqual(
        new Date('2020-06-05T09:00:00.000Z')
      );
    });
  });

  describe('calculateEndDate', () => {
    it('Should handle minutes', () => {
      const date = new Date(Date.UTC(2020, 5, 3, 16, 30, 0));
      const turnAround = 9;
      expect(dateCalculator.calculateDue(date, turnAround)).toEqual(
        new Date('2020-06-05T09:30:00.000Z')
      );
    });

    it('Should handle seconds', () => {
      const date = new Date(Date.UTC(2020, 5, 3, 16, 0, 10));
      const turnAround = 9;
      expect(dateCalculator.calculateDue(date, turnAround)).toEqual(
        new Date('2020-06-05T09:00:10.000Z')
      );
    });

    it('Should handle weekends', () => {
      const date = new Date(Date.UTC(2020, 5, 5, 16, 0, 10));
      const turnAround = 9;
      expect(dateCalculator.calculateDue(date, turnAround)).toEqual(
        new Date('2020-06-09T09:00:10.000Z')
      );
    });
  });
});
