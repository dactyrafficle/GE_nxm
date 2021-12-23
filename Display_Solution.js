

Economy.prototype.UPDATE_MARKET_EQUILIBRIUM_TABLE = function() {

  let subtitle_row = this.output_tables.market_equilibrium.subtitle_row;
  let tbody = this.output_tables.market_equilibrium.tbody;
  subtitle_row.innerHTML = '';
  tbody.innerHTML = '';
  
  let str = '';
  for (let i = 0; i < this.n_firms-1; i++) {
    str += 'z_{' + i + '} + ' 
  }
  str += 'z_{' + (this.n_firms-1) + '} = '

  let s = document.createElement('span');
  s.classList.add('math');
  
let str2 = '\\displaystyle\\sum_{i=0}^n \\Bigg ( {L_i - \\dfrac{\\beta_i}{\\sum_{j=0}^m \\alpha_j + \\beta_i} \\cdot \\dfrac{wL_i + \\sum_{j=0}^{m} \\theta_{ij} \\cdot \\pi_j}{w}} \\Bigg ) = \\displaystyle\\sum_{j=0}^m A_j \\cdot \\dfrac{p_j}{w}';
  
  s.innerHTML = str2;
  
  let tr = document.createElement('tr');
  tbody.appendChild(tr);
  
  let td = document.createElement('td');
  tr.appendChild(td);
  
  td.appendChild(s);
};

Economy.prototype.UPDATE_MARKET_SUMMARY_TABLE = function() {

  let title_row = this.output_tables.market_summary.title_row;
  let corner_cell = this.output_tables.market_summary.corner_cell;
  let title_cell = this.output_tables.market_summary.title_cell;
  let subtitle_row = this.output_tables.market_summary.subtitle_row;
  let tbody = this.output_tables.market_summary.tbody;
  subtitle_row.innerHTML = '';
  tbody.innerHTML = '';
  corner_cell.innerHTML = '';
  
  let download_btn = document.createElement('div');
  download_btn.innerHTML = "DL";
  corner_cell.appendChild(download_btn);
  
  
  let arr = [];
  download_btn.addEventListener('click', function(e) {
    console.log(e);
    let csv_string = arr_of_arr_to_csv_string(arr);
    export_csv_string(csv_string);
  });

  let n_cols = this.n_leisures + this.n_goods + 1;
  let consumer_totals = [], firm_totals = [], totals = [];
  for (let i = 0; i < n_cols; i++) {
    consumer_totals.push(0);
    firm_totals.push(0);
    totals.push(0);
  }
  
  // THE COLUMN HEADERS
  arr[0] = ['x','L[0]'];
  for (let i = 0; i < this.n_goods; i++) {
    arr[0].push('G[' + i + ']');
  }
  
  // THE PRICES
  arr[1] = ['PRICES', 1];
  for (let i = 0; i < this.SOLUTION.prices.length; i++) {
    arr[1].push(this.SOLUTION.prices[i]); 
  }
  
  
  // CONSUMER DATA
  consumer_totals[0] = 'C';
  for (let i = 0; i < this.n_consumers; i++) {
    let row = ['C[' + i + ']'];
    row.push(this.SOLUTION.consumers[i].labor_supply[0]);
    consumer_totals[1] += this.SOLUTION.consumers[i].labor_supply[0];
    for (let j = 0; j < this.n_goods; j++) {
      row.push(this.SOLUTION.consumers[i].goods_demand[j]);
      consumer_totals[j+2] += this.SOLUTION.consumers[i].goods_demand[j];
    }
    arr.push(row)
  }
  arr.push(consumer_totals);

  // FIRM DATA
  firm_totals[0] = 'F';
  for (let i = 0; i < this.n_firms; i++) {
    let row = ['F[' + i + ']'];
    row.push(this.SOLUTION.firms[i].labor_demand[0]);
    firm_totals[1] += this.SOLUTION.firms[i].labor_demand[0];
    for (let j = 0; j < this.n_goods; j++) {
      row.push(this.SOLUTION.firms[i].output_supply[j]);
      firm_totals[j+2] += this.SOLUTION.firms[i].output_supply[j];
    }
    arr.push(row)
  }
  arr.push(firm_totals);
  
  // TOTALS
  let row = ['NET'];
  for (let i = 1; i < n_cols; i++) {
    row[i] = consumer_totals[i] - firm_totals[i];
  }
  arr.push(row);
  
  // POPULATE TBODY
  for (let y = 0; y < arr.length; y++) {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    
    for (let x = 0; x < arr[y].length; x++) {
      let td = document.createElement('td');
      tr.appendChild(td);
      td.innerHTML = (parseFloat(arr[y][x])+0 === parseFloat(arr[y][x])) ? (arr[y][x].toFixed(4)) : (arr[y][x]);
    }
  }
  // console.log(arr);
  
}
