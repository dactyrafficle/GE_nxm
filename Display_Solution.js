
Economy.prototype.UPDATE_INCOME_STATEMENT_TABLE = function() {
  
  let subtitle_row = this.output_tables.income_statement.subtitle_row;
  let tbody = this.output_tables.income_statement.tbody;
  subtitle_row.innerHTML = '';
  tbody.innerHTML = '';
  
  let arr = [];
  
  arr.push(['p']);
  for (let i = 0; i < this.SOLUTION.prices.length; i++) {
    arr[0].push(this.SOLUTION.prices[i]);
  }
  
  arr.push(['q']);
  for (let i = 0; i < this.SOLUTION.prices.length; i++) {
    arr[1].push(this.SOLUTION.firms[i].output_supply[i]);
  }
  
  arr.push(['r']);
  for (let i = 0; i < this.SOLUTION.prices.length; i++) {
    arr[2].push(arr[0][i+1] * arr[1][i+1]);
  }
  
  arr.push(['z @w=1']);
  for (let i = 0; i < this.SOLUTION.prices.length; i++) {
    arr[3].push(this.SOLUTION.firms[i].labor_demand[0]);
  }
  
  arr.push(['&pi;']);
  for (let i = 0; i < this.SOLUTION.prices.length; i++) {
    arr[4].push(arr[2][i+1] - arr[3][i+1]);
  }
  
  // for each consumer
  
  for (let y = 0; y < this.n_consumers; y++) {
    arr.push(['C[' + y + ']']);
    for (let x = 0; x < this.n_firms; x++) {
      arr[5+y].push(this.consumers[y].ownership.percentage[x]);
    }
    let dividends_total = 0;
    for (let x = 0; x < this.n_firms; x++) {
      let s = this.consumers[y].ownership.percentage[x]*arr[4][x+1];
      dividends_total += s
      arr[5+y].push(s);
    }
    for (let x = 0; x < this.n_firms; x++) {
      
      if (x === y) {
        arr[5+y].push(dividends_total);
      } else {
        arr[5+y].push('&middot;');
      }
    }
  }
  
  arr.push(['L']);
arr.push(['Budget, M']);
arr.push(['Leisure Demand, b']);
arr.push(['Labor Supply, n']);
arr.push(['Income']);

for (let i = 0; i < this.n_goods; i++) {
  arr.push(['x[' + i + ']']);
}
  
  for (let y = 0; y < arr.length; y++) {
    
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    
    for (let x = 0; x < arr[y].length; x++) {
      
      let td = document.createElement('td');
      tr.appendChild(td);
      
      td.innerHTML = (arr[y][x]);
      if (arr[y][x] + 0 === arr[y][x]) {
        td.innerHTML = (arr[y][x]).toFixed(3);
      }
      
    }
  }
  
};

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
  arr[0] = ['&middot;','b[0]'];
  for (let i = 0; i < this.n_goods; i++) {
    arr[0].push('x[' + i + ']');
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
