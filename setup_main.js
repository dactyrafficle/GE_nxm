
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

function arr_to_csv_string(arr) {

  let csv_string = '';
  let n = arr.length - 1;

  for (let i = 0; i < n; i++) {
   csv_string += arr[i] + ',';
  }
  csv_string += arr[n];

  return csv_string;
}

function arr_of_arr_to_csv_string(arr) {
  
  let csv_string = '';
  let n = arr.length;
  
  // EACH ROW
  for (let i = 0; i < n; i++) {
   csv_string += arr_to_csv_string(arr[i]);
   csv_string += '\n';
  }
  return csv_string;
}
function export_csv_string(csv_string) {

  let a = document.createElement('a');
  a.href = 'data:,' + encodeURI(csv_string); // this really is key
  a.target = '_blank';
  a.download = 'name.csv';
  a.click();
  a.remove();
}

 


