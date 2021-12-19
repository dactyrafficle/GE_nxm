
Economy.prototype.Test_Price_Vector = function(wages, prices) {

  let TEST_SOLUTION = {
    'wages': wages,
    'prices': prices,
    'markets':{
      'labor':[],
      'goods':[]
    },
    'firms':[],
    'consumers':[],
    'ERROR':0   // ECONOMY-WIDE AGGREGATE MARKET ERROR
  }
  
  // FOR EACH MARKET, CREATE A MARKET OBJECT
  TEST_SOLUTION.markets.labor.push(new Market());
  for (let i = 0; i < prices.length; i++) {
    TEST_SOLUTION.markets.goods.push(new Market());
  }

  // FROM EACH FIRM WE NEED :
  //  1. LABOR DEMAND
  //  2. OUTPUT SUPPLY
  //  3. PROFIT
  for (let i = 0; i < this.firms.length; i++) {
    
    let firm = {
      'labor_demand':[0],
      'output_supply':[],
      'profit':[0]
    }
    TEST_SOLUTION.firms.push(firm);
    
    // FOR EACH PRICE/GOOD
    for (let j = 0; j < TEST_SOLUTION.prices.length; j++) {
    
      firm.output_supply.push(0);
    
      // GET LABOR DEMAND
      let A = this.firms[i].technology[j].value;
      let p = TEST_SOLUTION.prices[j];
      let w = TEST_SOLUTION.wages[0];
      let z = A * p / w;
      
      TEST_SOLUTION.markets.labor[0].demand += z;
      firm.labor_demand[0] += z;
      
      // GET OUTPUT SUPPLY
      let q = (z > 0) ? (A * Math.log(z)) : (0) 
      TEST_SOLUTION.markets.goods[j].supply += q;
      firm.output_supply[j] += q;

      // GET PROFIT
      let profit = p * q - w * z;
      firm.profit[0] += profit;
      
    }
    
  }
  
  // FOR EACH CONSUMER :
  //  1. GET BUDGET CONSTRAINT : PCT*PROFITS + WAGE * THIS.L [done]
  //  2. CONSUMER GOODS DEMAND [done]
  //  3. CONSUMER LEISURE DEMAND
  //  4. CONSUMER LABOR SUPPLY
  
  for (let i = 0; i < this.consumers.length; i++) {
    let consumer = {
      'budget':[0],
      'goods_demand':[],
      'leisure_demand':[0],
      'labor_supply':[0]
    }
    TEST_SOLUTION.consumers.push(consumer);
    
    // SOLVE CONSUMER BUDGET
    consumer.budget[0] = this.consumers[i].L * TEST_SOLUTION.wages[0];
    for (let j = 0; j < TEST_SOLUTION.firms.length; j++) {
      consumer.budget[0] += this.consumers[i].ownership.percentage[j] * TEST_SOLUTION.firms[j].profit[0];
    }
    
    // GOODS DEMAND
    
    for (let j = 0; j < this.firms.length; j++) {
      consumer.goods_demand.push(0);
    
      // GET GOODS DEMAND
      let a = this.consumers[i].preferences.goods[j].value;
      let sum = this.consumers[i].preferences.sum;
      let M = consumer.budget[0];
      let p = TEST_SOLUTION.prices[j];
      let x = (a / sum) * (M / p);
      
      TEST_SOLUTION.markets.goods[j].demand += x;
      consumer.goods_demand[j] += x; 
    }
    
    // CONSUMER LEISURE DEMAND
    let a = this.consumers[i].preferences.leisure[0].value;
    let sum = this.consumers[i].preferences.sum;
    let M = consumer.budget[0];
    let w = TEST_SOLUTION.wages[0];
    let b = (a / sum) * (M / w);
    consumer.leisure_demand[0] = b;
      
    // CONSUMER LABOR SUPPLY
    let n = this.consumers[i].L - b;
    TEST_SOLUTION.markets.labor[0].supply += n;
    consumer.labor_supply[0] = n;
  }

  // CRASH MARKETS
  TEST_SOLUTION.markets.labor[0].net = TEST_SOLUTION.markets.labor[0].supply - TEST_SOLUTION.markets.labor[0].demand;
  TEST_SOLUTION.markets.labor[0].net_sq = TEST_SOLUTION.markets.labor[0].net**2;
  TEST_SOLUTION.ERROR += TEST_SOLUTION.markets.labor[0].net_sq;
  for (let i = 0; i < TEST_SOLUTION.markets.goods.length; i++) {
    let market = TEST_SOLUTION.markets.goods[i];
    market.net = market.supply - market.demand;
    market.net_sq = market.net**2;
    TEST_SOLUTION.ERROR += market.net_sq;
  }
  
  // console.log(TEST_SOLUTION);
  return TEST_SOLUTION;

}

function Market() {
  this.supply = 0;
  this.demand = 0;
  this.net = 0;
  this.net_sq = 0; // MARKET ERROR
}


