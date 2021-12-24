


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
  th.innerHTML = '&middot;';

  (function(){
    let th = document.createElement('th');
    tr.appendChild(th);
    th.innerHTML = 'n[0]';
  })();

  (function(){
    let th = document.createElement('th');
    tr.appendChild(th);
    th.innerHTML = 'b[0]';
  })();

  
  
  for (let y = 0; y < this.n_goods; y++) {
    let th = document.createElement('th');
    tr.appendChild(th);
    th.innerHTML = 'x[' + y + ']';
  }

  for (let y = 0; y < this.n_consumers; y++) {
    
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    
    let th = document.createElement('th');
    tr.appendChild(th);
    th.innerHTML = 'C[' + y + ']';
    
    // LABOR SUPPLY
    
    (function() {
      
      let td = document.createElement('td');
      tr.appendChild(td);

      td.appendChild(returnCircle({
        'value':this.SOLUTION.consumers[y].labor_supply[0],
        'color_string':'#d9f2e6'
      }));
     
    }.bind(this))();
    
    // LEISURE DEMAND
    
    (function() {
      
      let td = document.createElement('td');
      tr.appendChild(td);

      td.appendChild(returnCircle({
        'value':this.SOLUTION.consumers[y].leisure_demand[0],
        'color_string':'#c2d1f0'
      }));
     
    }.bind(this))();
    
    
    for (let x = 0; x < this.n_firms; x++) {
      
      let td = document.createElement('td');
      tr.appendChild(td);
      
      td.appendChild(returnCircle({
        'value':this.SOLUTION.consumers[y].goods_demand[x],
        'color_string':'#ffe680'
      }));
      

    }
  }

};

function returnCircle(obj) {
  let div = document.createElement('div');
  let s_sq = obj.value;
  let s = Math.sqrt(s_sq);
  div.style.backgroundColor = obj.color_string;
  div.style.width = s*10 + 'px';
  div.style.height = s*10 + 'px';
  div.style.borderRadius = '50%';
  div.style.margin = '0 auto';
  return div;
}