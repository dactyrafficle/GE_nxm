
/*
  let e = new Economy();

  e.ADD_CONSUMER();
  e.ADD_CONSUMER();

  e.ADD_FIRM();
  e.ADD_FIRM();
  
  e.ADD_CONSUMER();
  e.ADD_FIRM();

  console.log(e);
*/

function Economy()  {
  
  this.n_consumers = 0;
  this.n_firms = 0;
  this.n_goods = 0;
  this.n_leisures = 1;
  
  this.consumers = [];
  this.firms = [];
  
  this.input_tables = {
    'consumer_preferences': new Input_Table({'key':'consumer_preferences','title':'CONSUMER PREFERENCES'}),
    'consumer_shares': new Input_Table({'key':'consumer_shares','title':'CONSUMER SHARES'}),
    'firm_technology': new Input_Table({'key':'firm_technology','title':'FIRM TECHNOLOGY'})
  }

  this.output_tables = {
    'market_summary': new Input_Table({'key':'market_summary','title':'MARKET SUMMARY'}),
    'output_allocation': new Input_Table({'key':'output_allocation','title':'OUTPUT ALLOCATION'})
  }

}

let consumer_preferences_min = 0.01;
let consumer_preferences_max = 9.99;
let consumer_preferences_step = 0.01;
let consumer_preferences_decimal = 2;

let consumer_shares_step = 1;
let consumer_shares_min = 0;
let consumer_shares_max = 999;
let consumer_shares_decimal = 0;

let firm_technology_step = 0.01;
let firm_technology_min = 1;
let firm_technology_max = 9.99;
let firm_technology_decimal = 2;

Economy.prototype.UPDATE_INPUT_TABLES = function() {
  this.UPDATE_CONSUMER_PREFERENCES_TABLE();
  this.UPDATE_CONSUMER_SHARES_TABLE();
  this.UPDATE_FIRM_TECHNOLOGY_TABLE();
};

Economy.prototype.UPDATE_OUTPUT_TABLES = function() {
  this.UPDATE_MARKET_SUMMARY_TABLE();
  this.UPDATE_OUTPUT_ALLOCATION_TABLE();
  this.UPDATE_CONSUMER_SHARES_TABLE_PERCENTAGES();
};

// THIS IS A GOOD BASE
function Input_Table(obj) {
  
  this.name = obj.key;
  
  this.table = document.createElement('table');
  this.table.classList.add('mytables');

  this.thead = document.createElement('thead');
  this.table.appendChild(this.thead);
  
  this.tbody = document.createElement('tbody');
  this.table.appendChild(this.tbody);
 
  this.title_row = document.createElement('tr');
  this.title_row.classList.add('title-row');
  this.thead.appendChild(this.title_row);

  this.corner_cell = document.createElement('th');
  this.title_row.appendChild(this.corner_cell);
  
  this.title_cell = document.createElement('th');
  this.title_row.appendChild(this.title_cell);
  this.title_cell.colSpan = 99;
  this.title_cell.innerHTML = obj.title;
  this.title_cell.classList.add('title-cell');

  // HIDE-SHOW CONTENTS
  this.title_cell.addEventListener('click', function(e) {
    if (this.tbody.style.display === 'none') {
      this.tbody.style.display = 'table-row-group';
    } else {
      this.tbody.style.display = 'none';
    }
  }.bind(this));

  this.subtitle_row = document.createElement('tr');
  this.thead.appendChild(this.subtitle_row);


  this.thead.classList.add('no-select');
  this.tbody.classList.add('no-select');
}



Economy.prototype.UPDATE_CONSUMER_PREFERENCES_TABLE = function() {

  let title_row = this.input_tables.consumer_preferences.title_row;
  let subtitle_row = this.input_tables.consumer_preferences.subtitle_row;
  let tbody = this.input_tables.consumer_preferences.tbody;
  
  // tbody.style.display = 'none';
  
  subtitle_row.innerHTML = '';
  tbody.innerHTML = '';

  (function() {
  let th = document.createElement('th');
  th.innerHTML = 'x';
  subtitle_row.appendChild(th);
  })();

  for (let x = 0; x < this.n_firms; x++) {
  let th = document.createElement('th');
  th.innerHTML = 'G[' + x + ']';
  subtitle_row.appendChild(th);
  }

  (function() {
  let th = document.createElement('th');
  th.innerHTML = 'L[0]';
  subtitle_row.appendChild(th);
  })();

  // FOR EACH CONSUMER
  for (let y = 0; y < this.n_consumers; y++) {
    let tr = document.createElement('tr');
    this.input_tables.consumer_preferences.tbody.appendChild(tr);
    
    let th = document.createElement('th');
    th.innerHTML = 'C[' + y + ']';
    tr.appendChild(th);
    
    for (let x = 0; x < this.consumers[y].preferences.goods.length; x++) {
      let td = document.createElement('td');
      td.appendChild(this.consumers[y].preferences.goods[x].input);
      tr.appendChild(td);
    }
    
    let td = document.createElement('td');
    td.appendChild(this.consumers[y].preferences.leisure[0].input);
    tr.appendChild(td);
  }
  
}

Economy.prototype.UPDATE_CONSUMER_SHARES_TABLE = function() {
  
  let subtitle_row = this.input_tables.consumer_shares.subtitle_row;
  let tbody = this.input_tables.consumer_shares.tbody;
  subtitle_row.innerHTML = '';
  tbody.innerHTML = '';

  // tbody.style.display = 'none';

  (function() {
  let th = document.createElement('th');
  th.innerHTML = 'x';
  subtitle_row.appendChild(th);
  })();

  for (let x = 0; x < this.n_firms; x++) {
  let th = document.createElement('th');
  th.innerHTML = 'F[' + x + ']';
  subtitle_row.appendChild(th);
  }

  // FOR EACH CONSUMER
  for (let y = 0; y < this.n_consumers; y++) {
    let tr = document.createElement('tr');
    this.input_tables.consumer_shares.tbody.appendChild(tr);
    
    let th = document.createElement('th');
    th.innerHTML = 'C[' + y + ']';
    tr.appendChild(th);
    
    for (let x = 0; x < this.consumers[y].preferences.goods.length; x++) {
      let td = document.createElement('td');
      td.appendChild(this.consumers[y].ownership.shares[x].input);
      
      // PERCENTAGE OF OWNERSHIP
      let p = document.createElement('div');
      p.id = 'consumer-shares-pct-' + y + '-' + x;
      p.style.padding = '2px';
      p.style.textAlign = 'center';
      td.appendChild(p);
      
      tr.appendChild(td);
    }
  } 
}

Economy.prototype.UPDATE_CONSUMER_SHARES_TABLE_PERCENTAGES = function() {
  for (let y = 0; y < this.n_consumers; y++) {
    for (let x = 0; x < this.n_firms; x++) {
      let p = document.getElementById('consumer-shares-pct-' + y + '-' + x);
      p.innerHTML = (this.consumers[y].ownership.percentage[x]).toFixed(3);
    }
  }   
}

Economy.prototype.UPDATE_FIRM_TECHNOLOGY_TABLE = function() {
  
  // CLEAR THE CONTENTS
  let subtitle_row = this.input_tables.firm_technology.subtitle_row;
  let tbody = this.input_tables.firm_technology.tbody;
  subtitle_row.innerHTML = '';
  tbody.innerHTML = '';

  // THE CORNER X
  (function() {
    let th = document.createElement('th');
    th.innerHTML = 'x';
    subtitle_row.appendChild(th);
  })();

  // COLUMN HEADERS
  for (let x = 0; x < this.n_firms; x++) {
    let th = document.createElement('th');
    th.innerHTML = 'G[' + x + ']';
    subtitle_row.appendChild(th);
  }

  // FOR EACH FIRM
  for (let y = 0; y < this.n_firms; y++) {
    
    let tr = document.createElement('tr');
    this.input_tables.firm_technology.tbody.appendChild(tr);
    
    let th = document.createElement('th');
    th.innerHTML = 'F[' + y + ']';
    tr.appendChild(th);
    
    for (let x = 0; x < this.firms[y].technology.length; x++) {
      let td = document.createElement('td');
      td.appendChild(this.firms[y].technology[x].input);
      tr.appendChild(td);
    }
  } 
}

Economy.prototype.ADD_FIRM = function() {
  
  // INCREMENT FIRM COUNT
  this.n_firms++;
  this.n_goods++;
  
  // INITIALIZE NEW FIRM
  let new_firm = new Firm();
  
  // GIVE IT A TECH VALUE OF 0 FOR ALL EXISTING GOODS
  for (let i = 0; i < this.n_firms; i++) {
    new_firm.technology.push(new Linked_Input({
      'Economy':this,
      'Consumer':null,
      'Firm':new_firm,
      'value':0,
      'step':firm_technology_step,
      'min':0,
      'max':firm_technology_max,
      'decimal':firm_technology_decimal,
      'disabled':true
    })); 
  }
  
  // GIVE IT A REAL TECH VALUE FOR THE NEW GOOD
  new_firm.technology[this.n_firms-1] = new Linked_Input({
    'Economy':this,
    'Consumer':null,
    'Firm':new_firm,
    'value':return_firm_technology_level(),
    'step':firm_technology_step,
    'min':firm_technology_min,
    'max':firm_technology_max,
    'decimal':firm_technology_decimal,
    'disabled':false
  });

  // GIVE EXISTING FIRMS A TECH VALUE OF 0 FOR THE NEW GOOD
  for (let i = 0; i < this.n_firms-1; i++) {
    this.firms[i].technology.push(new Linked_Input({
      'Economy':this,
      'Consumer':null,
      'Firm':this.firms[i],
      'value':0,
      'step':firm_technology_step,
      'min':0,
      'max':firm_technology_max,
      'decimal':firm_technology_decimal,
      'disabled':true
    }));
    
  }

  // UPDATE CONSUMER VALUES
  for (let i = 0; i < this.n_consumers; i++) {
    
    // GIVE ALL EXISTING CONSUMERS A PREFERENCE VALUE FOR THE NEW GOOD
    let x = return_goods_preference();
    this.consumers[i].preferences.goods.push(new Linked_Input({
      'Economy':this,
      'Consumer':this.consumers[i],
      'Firm':new_firm,
      'value':x,
      'step':consumer_preferences_step,
      'min':consumer_preferences_min,
      'max':consumer_preferences_max,
      'decimal':consumer_preferences_decimal,
      'disabled':false
    }));
    this.consumers[i].preferences.sum += x
    
    // GIVE ALL EXISTING CONSUMERS A SHARE OWNERSHIP OF THE NEW FIRM
    let share_allocation = return_shares_allocation();
    this.consumers[i].ownership.shares.push(new Linked_Input({
      'Economy':this,
      'Consumer':this.consumers[i],
      'Firm':new_firm,
      'value':share_allocation,
      'step':consumer_shares_step,
      'min':consumer_shares_min,
      'max':consumer_shares_max,
      'decimal':consumer_shares_decimal,
      'disabled':false
    })); 

    // RECORD THE TOTAL NUMBER OF SHARES ISSUED
    new_firm.shares_outstanding += share_allocation;
  
  }
  
  // MAKE SPACE FOR THE PERCENTAGE OWNERSHIP
  for (let i = 0; i < this.n_consumers; i++) {
    let pct_ownership =  this.consumers[i].ownership.shares[this.n_firms-1].value / new_firm.shares_outstanding;
    this.consumers[i].ownership.percentage.push(pct_ownership);
  }
  
  // ADD FIRM TO ARRAY
  this.firms.push(new_firm);
}


Economy.prototype.ADD_CONSUMER = function() {
  
  // INCREMENT CONSUMER COUNT
  this.n_consumers++;
  
  // INITIALIZE NEW CONSUMER
  let new_consumer = new Consumer();
  
  let leisure_rv = return_leisure_preference();
  new_consumer.preferences.leisure.push(new Linked_Input({
      'Economy':this,
      'Consumer':new_consumer,
      'Firm':null,
      'value':leisure_rv,
      'step':consumer_preferences_step,
      'min':consumer_preferences_min,
      'max':consumer_preferences_max,
      'decimal':consumer_preferences_decimal,
      'disabled':false
    })); 
  new_consumer.preferences.sum += leisure_rv;
  
  for (let i = 0; i < this.n_firms; i++) {
    
    // GIVE THIS CONSUMER A PREFERENCE FOR EACH EXISTING GOOD
    let x = return_goods_preference();
    new_consumer.preferences.goods.push(new Linked_Input({
      'Economy':this,
      'Consumer':new_consumer,
      'Firm':this.firms[i],
      'value':x,
      'step':consumer_preferences_step,
      'min':consumer_preferences_min,
      'max':consumer_preferences_max,
      'decimal':consumer_preferences_decimal,
      'disabled':false
    })); 
    new_consumer.preferences.sum += x;
    
    // GIVE THIS CONSUMER A SHARE ALLOCATION FOR EACH EXISTING FIRM
    let share_allocation = return_shares_allocation();
    new_consumer.ownership.shares.push(new Linked_Input({
      'Economy':this,
      'Consumer':new_consumer,
      'Firm':this.firms[i],
      'value':share_allocation,
      'step':consumer_shares_step,
      'min':consumer_shares_min,
      'max':consumer_shares_max,
      'decimal':consumer_shares_decimal,
      'disabled':false
    }));
 
    // RECORD THE INCREASED SHARE ALLOCATION FOR EACH FIRM
    this.firms[i].shares_outstanding += share_allocation;
    
    new_consumer.ownership.percentage.push(share_allocation / this.firms[i].shares_outstanding);
 
  }
  
  // ADD CONSUMER TO ARRAY
  this.consumers.push(new_consumer);
  
  let x = 0;
  // RECALC OWNERSHIP PERCENTAGE
  for (let i = 0; i < this.n_consumers; i++) {
    for (let j = 0; j < this.n_firms; j++) {
      this.consumers[i].ownership.percentage[j] = this.consumers[i].ownership.shares[j].value / this.firms[j].shares_outstanding;
      x += this.consumers[i].ownership.percentage[j];
    } 
  }
}
