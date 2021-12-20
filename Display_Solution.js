

Economy.prototype.UPDATE_MARKET_SUMMARY_TABLE = function() {

  let subtitle_row = this.output_tables.market_summary.subtitle_row;
  let tbody = this.output_tables.market_summary.tbody;
  subtitle_row.innerHTML = '';
  tbody.innerHTML = '';

  let arr = [];
  
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
  
}
