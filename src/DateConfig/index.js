const ConfigError = require('../Errors/ConfigErrors');

module.exports = class DateConfig {
  constructor(config) {
    this.config = config;
  }

  get(prop) {
    if (this.config[prop]) {
      return this.config[prop];
    } else {
      throw new ConfigError(`Property ${v} does not exist in config`);
    }
  }
};
