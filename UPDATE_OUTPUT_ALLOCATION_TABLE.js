


Economy.prototype.UPDATE_OUTPUT_ALLOCATION_TABLE = function() {

  let subtitle_row = this.output_tables.output_allocation.subtitle_row;
  let tbody = this.output_tables.output_allocation.tbody;
  subtitle_row.innerHTML = '';
  tbody.innerHTML = '';
  
  // consumer x firm
  // each square is the size of consumption
  
  let tr = document.createElement('tr');
  tbody.appendChild(tr);
  let th = document.createElement('th');
  tr.appendChild(th);
  th.innerHTML = 'x';
  for (let y = 0; y < this.n_goods; y++) {
    let th = document.createElement('th');
    tr.appendChild(th);
    th.innerHTML = 'G[' + y + ']';
  }
  
  for (let y = 0; y < this.n_consumers; y++) {
    
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    
    let th = document.createElement('th');
    tr.appendChild(th);
    th.innerHTML = 'C[' + y + ']';
      
    for (let x = 0; x < this.n_firms; x++) {
      let td = document.createElement('td');
      tr.appendChild(td);
      
      let div = document.createElement('div');
      td.appendChild(div);
      
      let s_sq = this.SOLUTION.consumers[y].goods_demand[x];
      // console.log(s_sq);
      let s = Math.sqrt(s_sq);
      div.style.backgroundColor = '#fc0';
      div.style.width = s*10 + 'px';
      div.style.height = s*10 + 'px';
      div.style.borderRadius = '50%';
      
    }
  }

};