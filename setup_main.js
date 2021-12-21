
// 1. create an economy and its consumers and firms
// 2. create tables using Linked_Inputs: e.createTables();
// 3. tables are just shells

let e;
let input_container, output_container;
let add_consumer_btn, add_firm_btn;

window.onload = function() {

  e = new Economy();
  for (let i = 0; i < 4; i++) {
    e.ADD_CONSUMER();
    e.ADD_FIRM();
  }

  input_container = document.getElementById('input_container');
  input_container.appendChild(e.input_tables.consumer_preferences.table);
  input_container.appendChild(e.input_tables.consumer_shares.table);
  input_container.appendChild(e.input_tables.firm_technology.table);

  output_container = document.getElementById('output_container');
  output_container.appendChild(e.output_tables.market_summary.table);
  output_container.appendChild(e.output_tables.output_allocation.table);
  // output_container.appendChild(e.output_tables.market_equilibrium.table);
  
  e.UPDATE_INPUT_TABLES();
  e.Find_Price_Vector_Solution();
  e.UPDATE_OUTPUT_TABLES();
  
  add_consumer_btn = document.getElementById('add_consumer_btn');
  add_consumer_btn.addEventListener('click', function() {
    e.ADD_CONSUMER();
    e.UPDATE_INPUT_TABLES();
    e.Find_Price_Vector_Solution();
    e.UPDATE_OUTPUT_TABLES();
  });
  
  add_firm_btn = document.getElementById('add_firm_btn');
  add_firm_btn.addEventListener('click', function() {
    e.ADD_FIRM();
    e.UPDATE_INPUT_TABLES();
    e.Find_Price_Vector_Solution();
    e.UPDATE_OUTPUT_TABLES();
  });

}





