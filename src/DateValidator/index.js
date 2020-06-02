const DateError = require('../Errors/DateErrors');
const DueDate = require('../Date');
module.exports = class DateValidator extends DueDate {
  constructor(dateConfig) {
    super(dateConfig);
  }

  _isValidSubmitHours(date) {
    const time = date.getUTCHours();
    if (!(time >= this.validStart && time <= this.validEnd)) {
      throw new DateError('Invalid time provided (Not working hours)');
    }
    return true;
  }

  isValidInput(submitDate, turnAround) {
    try {
      this._isValidHours(turnAround);
      this._isValidDate(submitDate);
      this._isValidSubmitHours(submitDate);
      this._isValidDay(submitDate);

      return true;
    } catch (e) {
      throw e;
    }
  }

  _isValidDay(date) {
    try {
      const day = new Date(date).getUTCDay();
      if (!this.validDays.has(day)) {
        throw new DateError('Invalid day provided (Not working days)');
      }
      return true;
    } catch (e) {
      throw new DateError('Invalid date');
    }
  }

  isWorkDay(date) {
    const day = new Date(date).getUTCDay();
    return this.validDays.has(day);
  }

  _isValidHours(turnAround) {
    if (Number(turnAround) && turnAround > 0) {
      return true;
    } else {
      throw new DateError('Invalid Hours');
    }
  }

  _isValidDate(date) {
    try {
      const time = date.getTime();
      if (time !== time) {
        throw new DateError('Invalid date');
      }
      return true;
    } catch (e) {
      throw new DateError('Invalid date');
    }
  }
};
