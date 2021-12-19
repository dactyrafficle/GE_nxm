
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
  // console.log(e);

  input_container = document.getElementById('input_container');
  input_container.appendChild(e.input_tables.consumer_preferences.table);
  input_container.appendChild(e.input_tables.consumer_shares.table);
  input_container.appendChild(e.input_tables.firm_technology.table);

  e.UPDATE_TABLES();
  e.Find_Price_Vector_Solution();
  
  // ACTUALLY, I SHOULD MAKE THE TABLE PART OF ECONOMY, and simply update it.
  output_container = document.getElementById('output_container');
  output_container.appendChild(e.Display_Solution());

  
  add_consumer_btn = document.getElementById('add_consumer_btn');
  add_consumer_btn.addEventListener('click', function() {
    e.ADD_CONSUMER();
    e.UPDATE_TABLES();
    e.Find_Price_Vector_Solution();

    e.Update_Display_Solution();
  });
  
  add_firm_btn = document.getElementById('add_firm_btn');
  add_firm_btn.addEventListener('click', function() {
    e.ADD_FIRM();
    e.UPDATE_TABLES();
    e.Find_Price_Vector_Solution();

    e.Update_Display_Solution();
  });

}





