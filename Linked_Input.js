
// ECONOMY > CONSUMER/FIRM > LINKED_INPUT

/*
let obj = 
 'econ':economy,
 'value':value,
 'step':step,
*/

function Linked_Input(obj, value, step) {
  
  // THE VALUE
  this.value = value;
  
  // THE INPUT ELEMENT
  this.input = document.createElement('input');
  this.input.value = this.value;
  this.input.step = step;
  this.input.type = 'number';
  
  if (value === 0) {
    this.input.disabled = true;  // just taking a shortcut, but it's dumb...
  }

  // EVENT LISTENER
  this.input.addEventListener('input', function() {
    
    // LINK OBJ VALUE WITH INPUT VALUE
    this.value = parseFloat(this.input.value);
    
    obj.UPDATE_CONSUMER_PREFERENCE_SUM();
    obj.UPDATE_FIRM_SHARES_OUTSTANDING();
    obj.UPDATE_CONSUMER_OWNERSHIP_PERCENTAGES();
    obj.Find_Price_Vector_Solution();
    obj.UPDATE_OUTPUT_TABLES();

  }.bind(this));
}