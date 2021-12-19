
Economy.prototype.Display_Solution = function() {

  this.output_tables = {
    'market_summary':null
  }


  let table = document.createElement('table');
  table.classList.add('mytables');
  

  
  // TITLE
  (function(){
    let tr = document.createElement('tr');
    table.appendChild(tr);
    
    let th = document.createElement('th');
    tr.appendChild(th);
    th.colSpan = 99;
    th.innerHTML = 'MARKET SUMMARY';
  })();
  
  // SUBTITLES
  let subtitle_row = document.createElement('tr');
  table.appendChild(subtitle_row);
    
  (function() {
    let th = document.createElement('th');
    subtitle_row.appendChild(th);
    th.innerHTML = 'x';
  })();
    
  let consumer_totals = [];
  let firm_totals = [];
  for (let i = 0; i < this.SOLUTION.markets.labor.length; i++) {
    consumer_totals.push(0);
    firm_totals.push(0);
    
    (function() {
      let td = document.createElement('th');
      subtitle_row.appendChild(td);
      td.innerHTML = 'LABOR[0]';
    })();
    
  }
  
  for (let i = 0; i < this.SOLUTION.markets.goods.length; i++) {
    consumer_totals.push(0);
    firm_totals.push(0);
    
    (function() {
      let td = document.createElement('th');
      subtitle_row.appendChild(td);
      td.innerHTML = 'GOODS[' + i + ']';
    })();
  }

  for (let i = 0; i < this.SOLUTION.consumers.length; i++) {
    
    let tr = document.createElement('tr');
    table.appendChild(tr);

    (function() {
      let th = document.createElement('th');
      tr.appendChild(th);
      th.innerHTML = 'CONSUMERS[' + i + ']';
      th.classList.add('row_header');
    })();

    let market_no = 0;

    // LABOR SUPPLY
    (function() {
      let td = document.createElement('td');
      tr.appendChild(td);
      td.innerHTML = this.SOLUTION.consumers[i].labor_supply[0].toFixed(4);
      consumer_totals[market_no] += this.SOLUTION.consumers[i].labor_supply[0];
      market_no++;
    }.bind(this))();
    
    // GOODS DEMAND
    for (let j = 0; j < this.SOLUTION.consumers[i].goods_demand.length; j++) {
      (function() {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = this.SOLUTION.consumers[i].goods_demand[j].toFixed(4);
        consumer_totals[market_no] += this.SOLUTION.consumers[i].goods_demand[j];
        market_no++;
      }.bind(this))();   
    }
     
  } // CLOSE CONSUMER CONTENT
  
  let consumer_totals_row = document.createElement('tr');
  table.appendChild(consumer_totals_row);
  
  (function() {
    let th = document.createElement('th');
    consumer_totals_row.appendChild(th);
    th.innerHTML = 'CONSUMERS';
    th.classList.add('row_header');
  })();
  
  for (let i = 0; i < consumer_totals.length; i++) {
    (function() {
      let td = document.createElement('td');
      consumer_totals_row.appendChild(td);
      td.innerHTML = consumer_totals[i].toFixed(4);
    }.bind(this))();
  }
  
  // FOR EACH FIRM
  for (let i = 0; i < this.SOLUTION.firms.length; i++) {
    
    let tr = document.createElement('tr');
    table.appendChild(tr);

    (function() {
      let th = document.createElement('th');
      tr.appendChild(th);
      th.innerHTML = 'FIRMS[' + i + ']';
      th.classList.add('row_header');
    })();

    let market_no = 0;
    
    // LABOR DEMAND
    (function() {
      let td = document.createElement('td');
      tr.appendChild(td);
      td.innerHTML = this.SOLUTION.firms[i].labor_demand[0].toFixed(4);
      firm_totals[market_no] += this.SOLUTION.firms[i].labor_demand[0];
      market_no++;
    }.bind(this))();
    
    // GOODS SUPPLY
    for (let j = 0; j < this.SOLUTION.firms[i].output_supply.length; j++) {
      (function() {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = this.SOLUTION.firms[i].output_supply[j].toFixed(4);
        firm_totals[market_no] += this.SOLUTION.firms[i].output_supply[j];
        market_no++;
      }.bind(this))();   
    }
    
    
  } // close firm content
  
  let firm_totals_row = document.createElement('tr');
  table.appendChild(firm_totals_row);
  
  (function() {
    let th = document.createElement('th');
    firm_totals_row.appendChild(th);
    th.innerHTML = 'FIRMS';
    th.classList.add('row_header');
  })();
  
  for (let i = 0; i < firm_totals.length; i++) {
    (function() {
      let td = document.createElement('td');
      firm_totals_row.appendChild(td);
      td.innerHTML = firm_totals[i].toFixed(4);
    }.bind(this))();
  }
  
  // return table;
  this.output_tables.market_summary = table;
  // console.log(this.output_tables.market_summary);
  return this.output_tables.market_summary;
}


// UPDATE 

Economy.prototype.Update_Display_Solution = function() {


  let table = this.output_tables.market_summary;
  table.innerHTML = '';
  table.classList.add('mytables');
  

  
  // TITLE
  (function(){
    let tr = document.createElement('tr');
    table.appendChild(tr);
    
    let th = document.createElement('th');
    tr.appendChild(th);
    th.colSpan = 99;
    th.innerHTML = 'MARKET SUMMARY';
  })();
  
  // SUBTITLES
  let subtitle_row = document.createElement('tr');
  table.appendChild(subtitle_row);
    
  (function() {
    let th = document.createElement('th');
    subtitle_row.appendChild(th);
    th.innerHTML = 'x';
  })();
    
  let consumer_totals = [];
  let firm_totals = [];
  for (let i = 0; i < this.SOLUTION.markets.labor.length; i++) {
    consumer_totals.push(0);
    firm_totals.push(0);
    
    (function() {
      let td = document.createElement('th');
      subtitle_row.appendChild(td);
      td.innerHTML = 'LABOR[0]';
    })();
    
  }
  
  for (let i = 0; i < this.SOLUTION.markets.goods.length; i++) {
    consumer_totals.push(0);
    firm_totals.push(0);
    
    (function() {
      let td = document.createElement('th');
      subtitle_row.appendChild(td);
      td.innerHTML = 'GOODS[' + i + ']';
    })();
  }

  for (let i = 0; i < this.SOLUTION.consumers.length; i++) {
    
    let tr = document.createElement('tr');
    table.appendChild(tr);

    (function() {
      let th = document.createElement('th');
      tr.appendChild(th);
      th.innerHTML = 'CONSUMERS[' + i + ']';
      th.classList.add('row_header');
    })();

    let market_no = 0;

    // LABOR SUPPLY
    (function() {
      let td = document.createElement('td');
      tr.appendChild(td);
      td.innerHTML = this.SOLUTION.consumers[i].labor_supply[0].toFixed(4);
      consumer_totals[market_no] += this.SOLUTION.consumers[i].labor_supply[0];
      market_no++;
    }.bind(this))();
    
    // GOODS DEMAND
    for (let j = 0; j < this.SOLUTION.consumers[i].goods_demand.length; j++) {
      (function() {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = this.SOLUTION.consumers[i].goods_demand[j].toFixed(4);
        consumer_totals[market_no] += this.SOLUTION.consumers[i].goods_demand[j];
        market_no++;
      }.bind(this))();   
    }
     
  } // CLOSE CONSUMER CONTENT
  
  let consumer_totals_row = document.createElement('tr');
  table.appendChild(consumer_totals_row);
  
  (function() {
    let th = document.createElement('th');
    consumer_totals_row.appendChild(th);
    th.innerHTML = 'CONSUMERS';
    th.classList.add('row_header');
  })();
  
  for (let i = 0; i < consumer_totals.length; i++) {
    (function() {
      let td = document.createElement('td');
      consumer_totals_row.appendChild(td);
      td.innerHTML = consumer_totals[i].toFixed(4);
    }.bind(this))();
  }
  
  // FOR EACH FIRM
  for (let i = 0; i < this.SOLUTION.firms.length; i++) {
    
    let tr = document.createElement('tr');
    table.appendChild(tr);

    (function() {
      let th = document.createElement('th');
      tr.appendChild(th);
      th.innerHTML = 'FIRMS[' + i + ']';
      th.classList.add('row_header');
    })();

    let market_no = 0;
    
    // LABOR DEMAND
    (function() {
      let td = document.createElement('td');
      tr.appendChild(td);
      td.innerHTML = this.SOLUTION.firms[i].labor_demand[0].toFixed(4);
      firm_totals[market_no] += this.SOLUTION.firms[i].labor_demand[0];
      market_no++;
    }.bind(this))();
    
    // GOODS SUPPLY
    for (let j = 0; j < this.SOLUTION.firms[i].output_supply.length; j++) {
      (function() {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = this.SOLUTION.firms[i].output_supply[j].toFixed(4);
        firm_totals[market_no] += this.SOLUTION.firms[i].output_supply[j];
        market_no++;
      }.bind(this))();   
    }
    
    
  } // close firm content
  
  let firm_totals_row = document.createElement('tr');
  table.appendChild(firm_totals_row);
  
  (function() {
    let th = document.createElement('th');
    firm_totals_row.appendChild(th);
    th.innerHTML = 'FIRMS';
    th.classList.add('row_header');
  })();
  
  for (let i = 0; i < firm_totals.length; i++) {
    (function() {
      let td = document.createElement('td');
      firm_totals_row.appendChild(td);
      td.innerHTML = firm_totals[i].toFixed(4);
    }.bind(this))();
  }
  
  // return table;
  // console.log(this.output_tables.market_summary);
  this.output_tables.market_summary = table;
  
  // return this.output_tables.market_summary
}
