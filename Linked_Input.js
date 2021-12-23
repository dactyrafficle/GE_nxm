
// ECONOMY > CONSUMER/FIRM > LINKED_INPUT

/*
let obj = {
 'Economy':economy,
 'Consumer':consumer,
 'Firm':firm,
 'value':value,
 'step':step,
 'min':min,
 'max':max,
 'decimals':decimals,
 'disabled':false
}
*/

function Linked_Input(obj) {

  // THE REQUIRED
  this.Economy = obj.Economy;
  this.Consumer = obj.Consumer;
  this.Firm = obj.Firm;
  this.value = obj.value;
  
  // THE INPUT ELEMENT
  this.input = document.createElement('input');
  this.input.value = this.value;
  this.input.type = 'number';
  
  this.input.step = 1;
  if (obj.step) {
    this.input.step = obj.step;
  }
  
  this.input.decimal = 0;
  if (obj.decimal) {
    this.input.decimal = obj.decimal;
  }
  
  this.input.min = 1;
  if (obj.min !== null) { // REMEMBER, IF obj.min === 0, IT READS AS FALSE
    this.input.min = obj.min;
  }
  
  this.input.max = 1;
  if (obj.max) {
    this.input.max = obj.max;
  }
  
  this.input.disabled = false;
  if (obj.disabled) {
    this.input.disabled = obj.disabled;
  }
  
  // CLEANING THE INPUT
  let is_number = (parseFloat(this.input.value)*0 === 0);
  if (!is_number) {this.input.value = this.input.min}
  
  let too_high = parseFloat(this.input.value) > this.input.max;
  if (too_high) {this.input.value = this.input.max};
  
  let too_low = parseFloat(this.input.value) < this.input.min;
  if (too_low) {this.input.value = this.input.min};
  
  this.input.value = (parseFloat(this.input.value)/1);
  this.input.value = (parseFloat(this.input.value)).toFixed(this.input.decimal);

  // EVENT LISTENER
  this.input.addEventListener('input', function() {
    
    // CLEANING THE INPUT
    let is_number = (parseFloat(this.input.value)*0 === 0);
    if (!is_number) {this.input.value = this.input.min}
    
    let too_high = parseFloat(this.input.value) > this.input.max;
    if (too_high) {this.input.value = this.input.max};
    
    let too_low = parseFloat(this.input.value) < this.input.min;
    if (too_low) {this.input.value = this.input.min};
    
    this.input.value = (parseFloat(this.input.value)/1);
    this.input.value = (parseFloat(this.input.value)).toFixed(this.input.decimal);

    // LINK OBJ VALUE WITH INPUT VALUE
    this.value = parseFloat(this.input.value);
    
    this.Economy.UPDATE_CONSUMER_PREFERENCE_SUM();
    this.Economy.UPDATE_FIRM_SHARES_OUTSTANDING(this);
    this.Economy.UPDATE_CONSUMER_OWNERSHIP_PERCENTAGES();
    this.Economy.Find_Price_Vector_Solution();
    this.Economy.UPDATE_OUTPUT_TABLES();

  }.bind(this));
}