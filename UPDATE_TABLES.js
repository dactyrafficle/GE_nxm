Economy.prototype.UPDATE_INPUT_TABLES = function() {
  this.UPDATE_CONSUMER_PREFERENCES_TABLE();
  this.UPDATE_CONSUMER_SHARES_TABLE();
  this.UPDATE_FIRM_TECHNOLOGY_TABLE();
};

Economy.prototype.UPDATE_OUTPUT_TABLES = function() {
  this.UPDATE_MARKET_SUMMARY_TABLE();
  this.UPDATE_OUTPUT_ALLOCATION_TABLE();
  this.UPDATE_CONSUMER_SHARES_TABLE_PERCENTAGES();
  // this.UPDATE_INCOME_STATEMENT_TABLE();
};