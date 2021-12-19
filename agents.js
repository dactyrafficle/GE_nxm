

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

}

Economy.prototype.UPDATE_TABLES = function() {
  this.UPDATE_CONSUMER_PREFERENCES_TABLE();
  this.UPDATE_CONSUMER_SHARES_TABLE();
  this.UPDATE_FIRM_TECHNOLOGY_TABLE();
};

// e.input_tables.consumer_preferences.UPDATE_TABLE();

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
  this.thead.appendChild(this.title_row);
  
  this.title_cell = document.createElement('th');
  this.title_row.appendChild(this.title_cell);
  this.title_cell.colSpan = 99;
  this.title_cell.innerHTML = obj.title;
    
  this.subtitle_row = document.createElement('tr');
  this.thead.appendChild(this.subtitle_row);
 
}



Economy.prototype.UPDATE_CONSUMER_PREFERENCES_TABLE = function() {
  
  let subtitle_row = this.input_tables.consumer_preferences.subtitle_row;
  let tbody = this.input_tables.consumer_preferences.tbody;
  subtitle_row.innerHTML = '';
  tbody.innerHTML = '';

  (function() {
  let th = document.createElement('th');
  th.innerHTML = 'x';
  subtitle_row.appendChild(th);
  })();

  for (let x = 0; x < this.n_firms; x++) {
  let th = document.createElement('th');
  th.innerHTML = 'GOODS[' + x + ']';
  subtitle_row.appendChild(th);
  }

  (function() {
  let th = document.createElement('th');
  th.innerHTML = 'LEISURE[0]';
  subtitle_row.appendChild(th);
  })();

  // FOR EACH CONSUMER
  for (let y = 0; y < this.n_consumers; y++) {
    let tr = document.createElement('tr');
    this.input_tables.consumer_preferences.tbody.appendChild(tr);
    
    let th = document.createElement('th');
    th.innerHTML = 'CONSUMERS[' + y + ']';
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

  (function() {
  let th = document.createElement('th');
  th.innerHTML = 'x';
  subtitle_row.appendChild(th);
  })();

  for (let x = 0; x < this.n_firms; x++) {
  let th = document.createElement('th');
  th.innerHTML = 'FIRMS[' + x + ']';
  subtitle_row.appendChild(th);
  }

  // FOR EACH CONSUMER
  for (let y = 0; y < this.n_consumers; y++) {
    let tr = document.createElement('tr');
    this.input_tables.consumer_shares.tbody.appendChild(tr);
    
    let th = document.createElement('th');
    th.innerHTML = 'CONSUMERS[' + y + ']';
    tr.appendChild(th);
    
    for (let x = 0; x < this.consumers[y].preferences.goods.length; x++) {
      let td = document.createElement('td');
      td.appendChild(this.consumers[y].ownership.shares[x].input);
      tr.appendChild(td);
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
    th.innerHTML = 'GOODS[' + x + ']';
    subtitle_row.appendChild(th);
  }

  // FOR EACH FIRM
  for (let y = 0; y < this.n_firms; y++) {
    
    let tr = document.createElement('tr');
    this.input_tables.firm_technology.tbody.appendChild(tr);
    
    let th = document.createElement('th');
    th.innerHTML = 'FIRMS[' + y + ']';
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
    new_firm.technology.push(new Linked_Input(this, 0, 0.001));
  }
  
  // GIVE IT A REAL TECH VALUE FOR THE NEW GOOD
  new_firm.technology[this.n_firms-1] = new Linked_Input(this, return_firm_technology_level(), 0.001);
  
  // GIVE EXISTING FIRMS A TECH VALUE OF 0 FOR THE NEW GOOD
  for (let i = 0; i < this.n_firms-1; i++) {
    this.firms[i].technology.push(new Linked_Input(this, 0, 0.001));
  }

  // UPDATE CONSUMER VALUES
  for (let i = 0; i < this.n_consumers; i++) {
    
    // GIVE ALL EXISTING CONSUMERS A PREFERENCE VALUE FOR THE NEW GOOD
    let x = return_goods_preference();
    this.consumers[i].preferences.goods.push(new Linked_Input(this, x, 0.01));
    this.consumers[i].preferences.sum += x
    
    // GIVE ALL EXISTING CONSUMERS A SHARE OWNERSHIP OF THE NEW FIRM
    let share_allocation = return_shares_allocation();
    this.consumers[i].ownership.shares.push(new Linked_Input(this, share_allocation, 1));

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


Economy.prototype.UPDATE_CONSUMER_PREFERENCE_SUM = function() {

  let sum = 0;
  for (let i = 0; i < this.consumers.length; i++) {
    
    sum = this.consumers[i].preferences.leisure[0].value;
    for (let j = 0; j < this.consumers[i].preferences.goods.length; j++) {
      sum += this.consumers[i].preferences.goods[j].value;
    }
    this.consumers[i].preferences.sum = sum;
  }
};

Economy.prototype.UPDATE_FIRM_SHARES_OUTSTANDING = function() {
  
  // LOOK AT EACH FIRM
  for (let j = 0; j < this.firms.length; j++) {

    this.firms[j].shares_outstanding = 0;
    
    // FOR EACH CONSUMER
    for (let i = 0; i < this.consumers.length; i++) {
      this.firms[j].shares_outstanding += this.consumers[i].ownership.shares[j].value;
    }
  }
}

Economy.prototype.UPDATE_CONSUMER_OWNERSHIP_PERCENTAGES = function() {
  
  // FOR EACH CONSUMER
  for (let i = 0; i < this.consumers.length; i++) {
    
    // LOOK AT EACH FIRM
    for (let j = 0; j < this.firms.length; j++) {

      this.consumers[i].ownership.percentage[j] = this.consumers[i].ownership.shares[j].value / this.firms[j].shares_outstanding;
  
    }
  }
  
};

Economy.prototype.ADD_CONSUMER = function() {
  
  // INCREMENT CONSUMER COUNT
  this.n_consumers++;
  
  // INITIALIZE NEW CONSUMER
  let new_consumer = new Consumer();
  
  let leisure_rv = return_leisure_preference();
  new_consumer.preferences.leisure.push(new Linked_Input(this, leisure_rv, 0.01)),
  new_consumer.preferences.sum += leisure_rv;
  
  for (let i = 0; i < this.n_firms; i++) {
    
    // GIVE THIS CONSUMER A PREFERENCE FOR EACH EXISTING GOOD
    let x = return_goods_preference();
    new_consumer.preferences.goods.push(new Linked_Input(this, x, 0.01));
    new_consumer.preferences.sum += x;
    
    // GIVE THIS CONSUMER A SHARE ALLOCATION FOR EACH EXISTING FIRM
    let share_allocation = return_shares_allocation();
    new_consumer.ownership.shares.push(new Linked_Input(this, share_allocation, 1));
    
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


function Linked_Input(obj, value, step) {
  this.value = value;
  this.input = document.createElement('input');
  this.input.value = this.value;
  this.input.step = step;
  this.input.type = 'number';

  this.input.addEventListener('input', function(e) {
    this.value = parseFloat(this.input.value);
    
    obj.UPDATE_CONSUMER_PREFERENCE_SUM();
    obj.UPDATE_FIRM_SHARES_OUTSTANDING();
    obj.UPDATE_CONSUMER_OWNERSHIP_PERCENTAGES();
    obj.Find_Price_Vector_Solution();
    obj.Update_Display_Solution();

  }.bind(this));
}

// EVERY CONSUMER STARTS OFF WITH A LEISURE PREFERENCE
function Consumer() {
  this.L = 24; // LEISURE ENDOWMENT

  this.preferences = {
    'leisure':[],
    'goods':[],
    'sum':0
  }

  this.ownership = {
    'shares':[],
    'percentage':[]
  }
}

function Firm() {
  this.technology = [];
  this.shares_outstanding = 0;
}

function return_leisure_preference() {
  let min_value = 0.5;
  let max_value = 1.0;
  let range = max_value - min_value;
  let raw_value = min_value + Math.random()*range;
  let decimal_places = 2;
  let multiplier = 10**decimal_places;
  let final_value = Math.floor(raw_value * multiplier) / multiplier;
  return final_value;
}
function return_goods_preference() {
  let min_value = 0.1;
  let max_value = 0.6;
  let range = max_value - min_value;
  let raw_value = min_value + Math.random()*range;
  let decimal_places = 2;
  let multiplier = 10**decimal_places;
  let final_value = Math.floor(raw_value * multiplier) / multiplier;
  return final_value;
}
function return_shares_allocation() {
  let min_value = 5;
  let max_value = 100;
  let range = max_value - min_value;
  let raw_value = min_value + Math.random()*range;
  let decimal_places = 0;
  let multiplier = 10**decimal_places;
  let final_value = Math.floor(raw_value * multiplier) / multiplier;
  return final_value;
}
function return_firm_technology_level() {
  let min_value = 3;
  let max_value = 7;
  let range = max_value - min_value;
  let raw_value = min_value + Math.random()*range;
  let decimal_places = 3;
  let multiplier = 10**decimal_places;
  let final_value = Math.floor(raw_value * multiplier) / multiplier;
  return final_value;
}
