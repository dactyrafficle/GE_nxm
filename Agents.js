
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
