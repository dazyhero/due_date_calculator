const DueDate = require('../Date');

module.exports = class DateCalculator extends DueDate {
  constructor(dateValidator, dateConfig) {
    super(dateConfig);
    this.dateValidator = dateValidator;
  }

  calculateDue(submitDate, turnAround) {
    try {
      this.dateValidator.isValidInput(submitDate, turnAround);
      return this.getDate(submitDate, turnAround);
    } catch (e) {
      console.log(e);
    }
  }

  getDate(sub, turnAround) {
    if (turnAround > 0) {
      const currentHours = sub.getUTCHours();
      const timeAdded = currentHours + turnAround;
      if (timeAdded > this.validEnd) {
        const diff = timeAdded - this.validEnd;
        return this.getDate(this.addDay(sub), diff);
      } else {
        const dueDate = new Date(sub.setUTCHours(timeAdded));
        return this.hasTimeLeft(dueDate);
      }
    } else {
      return sub;
    }
  }

  hasTimeLeft(sub) {
    const minutes = sub.getUTCMinutes();
    const seconds = sub.getUTCSeconds();
    if (sub.getUTCHours() === this.validEnd && (minutes > 0 || seconds > 0)) {
      return this.addDay(sub, minutes, seconds);
    }
    return sub;
  }

  addDay(date) {
    do {
      date = new Date(date.setUTCHours(this.validStart));
      date = new Date(date.setUTCDate(date.getDate() + 1));
    } while (!this.dateValidator.isWorkDay(date));

    return date;
  }
};
