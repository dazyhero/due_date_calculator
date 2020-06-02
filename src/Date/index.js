module.exports = class DueDate {
  constructor(dateConfig) {
    this.validStart = dateConfig.get('startHour');
    this.validEnd = dateConfig.get('endHour');
    this.validDays = new Set(dateConfig.get('workDays'));
  }
};
