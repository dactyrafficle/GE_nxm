
Economy.prototype.Find_Price_Vector_Solution = function() {

  let CURRENT_PRICE_VECTOR, PROSPECTIVE_PRICE_VECTOR;
  let CURRENT_SOLUTION, PROSPECTIVE_SOLUTION;
  let CURRENT_ERROR, PROSPECTIVE_ERROR, IMPROVEMENT;

  // INITIALIZE THE CURRENT VALUES
  CURRENT_PRICE_VECTOR = [];
  for (let i = 0; i < this.firms.length; i++) {
    CURRENT_PRICE_VECTOR.push(1);
  }
  CURRENT_SOLUTION = this.Test_Price_Vector([1],CURRENT_PRICE_VECTOR);
  CURRENT_ERROR = CURRENT_SOLUTION.ERROR;

  // DEFINE STEPS 
  let dx = [1, 0.1, 0.01, 0.001];
  let i = 0;
  let dx_min = dx[dx.length-1];
  
  let search_count = 0;
  let change_count = 0;
  while (dx[i] >= dx_min) {
    
    for (let j = 0; j < CURRENT_PRICE_VECTOR.length; j++) {
      
      search_count++;
      
      // COPY CURRENT PRICES EACH ATTEMP
      PROSPECTIVE_PRICE_VECTOR = CURRENT_PRICE_VECTOR.slice(0);
      
      // REPLACE JTH VALUE WITH AN UP/DOWN MOVEMENT
      PROSPECTIVE_PRICE_VECTOR[j] = CURRENT_PRICE_VECTOR[j] + dx[i];
      
      // GET THE SOLUTION AND ITS ERROR
      PROSPECTIVE_SOLUTION = this.Test_Price_Vector([1],PROSPECTIVE_PRICE_VECTOR);
      PROSPECTIVE_ERROR = PROSPECTIVE_SOLUTION.ERROR;
      
      if (PROSPECTIVE_ERROR < CURRENT_ERROR) {
        
        change_count++;
        IMPROVEMENT = CURRENT_ERROR - PROSPECTIVE_ERROR;
        // print_results('+', dx[i], j, CURRENT_PRICE_VECTOR[j], PROSPECTIVE_PRICE_VECTOR[j], dx[i], CURRENT_ERROR, PROSPECTIVE_ERROR, IMPROVEMENT);
        
        CURRENT_PRICE_VECTOR = PROSPECTIVE_PRICE_VECTOR.slice(0);
        CURRENT_SOLUTION = PROSPECTIVE_SOLUTION;
        CURRENT_ERROR = CURRENT_SOLUTION.ERROR;
        
        break;
      }
      
      search_count++;
      PROSPECTIVE_PRICE_VECTOR = CURRENT_PRICE_VECTOR.slice(0);
      PROSPECTIVE_PRICE_VECTOR[j] = CURRENT_PRICE_VECTOR[j] - dx[i];
      PROSPECTIVE_SOLUTION = this.Test_Price_Vector([1],PROSPECTIVE_PRICE_VECTOR);
      PROSPECTIVE_ERROR = PROSPECTIVE_SOLUTION.ERROR;
      
      if (PROSPECTIVE_ERROR < CURRENT_ERROR) {
        
        change_count++;
        IMPROVEMENT = CURRENT_ERROR - PROSPECTIVE_ERROR;
        // print_results('-', dx[i], j, CURRENT_PRICE_VECTOR[j], PROSPECTIVE_PRICE_VECTOR[j], dx[i], CURRENT_ERROR, PROSPECTIVE_ERROR, IMPROVEMENT);
        
        CURRENT_PRICE_VECTOR = PROSPECTIVE_PRICE_VECTOR.slice(0);
        CURRENT_SOLUTION = PROSPECTIVE_SOLUTION;
        CURRENT_ERROR = CURRENT_SOLUTION.ERROR;
        
        break;
      }
      
      if (j === CURRENT_PRICE_VECTOR.length-1) {
        // console.log(CURRENT_PRICE_VECTOR);
        i++;
      }
      
    } // CLOSING FOR LOOP

  } // CLOSING WHILE LOOP
  // console.log('search count : ' + search_count);
  // console.log('change count : ' + change_count);  

  CURRENT_SOLUTION.stats = {
    'search_count':search_count,
    'change_count':change_count
  }

  this.SOLUTION = CURRENT_SOLUTION;
  console.log(this);
}

function print_results(sign, dx, j, price_01, price_02, price_change, error_01, error_02, error_change) {

  let str = '';
  str += 'price[' + j + '] ';
  str += sign + dx + ' : ';

  str += ' \n';
  str += 'price[' + j + '] :   INITIAL : ' + Math.floor(price_01*dx)/dx + ' : ';
  str += 'FINAL : ' + Math.floor(price_02*dx)/dx + ' : ';
  str += 'CHANGE : ' + Math.floor(price_change*dx)/dx;

  str += ' \n';
  str += 'ERROR : ';
  str += '     INITIAL : ' + error_01.toFixed(5) + ' : ';
  str += 'FINAL : ' + error_02.toFixed(5) + ' : ';
  str += 'CHANGE : ' + error_change.toFixed(5);
  console.log(str);

}