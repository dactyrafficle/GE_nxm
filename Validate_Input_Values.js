Economy.prototype.UPDATE_CONSUMER_PREFERENCE_SUM = function() {

  let sum = 0;
  for (let i = 0; i < this.n_consumers; i++) {
    
    let preferences = this.consumers[i].preferences;
    sum = preferences.leisure[0].value;
    for (let j = 0; j < this.n_firms; j++) {
      sum += preferences.goods[j].value;
    }
    this.consumers[i].preferences.sum = sum;
  }
};


Economy.prototype.UPDATE_FIRM_SHARES_OUTSTANDING = function(Linked_Input) {
  
  for (let j = 0; j < this.n_firms; j++) {
    
    let sum = 0;
    for (let i = 0; i < this.n_consumers; i++) {
      
      let ownership = this.consumers[i].ownership;
      sum += ownership.shares[j].value;
    }
    this.firms[j].shares_outstanding = sum;
    
    if (sum === 0) {
      Linked_Input.value = 1;
      Linked_Input.input.value = 1;  // REMEMBER, THE LINKED INPUT IS PART OF THE CONSUMER
      Linked_Input.Firm.shares_outstanding = 1;
    }
  }
}

Economy.prototype.UPDATE_CONSUMER_OWNERSHIP_PERCENTAGES = function() {

  for (let i = 0; i < this.n_consumers; i++) {
    for (let j = 0; j < this.n_firms; j++) {

      this.consumers[i].ownership.percentage[j] = this.consumers[i].ownership.shares[j].value / this.firms[j].shares_outstanding;
  
    }
  }
  
};