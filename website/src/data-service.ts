import $apiService from "./api-service";

const KEYS = {
  RESTID: "RESTID",
  USERID: "USERID",
  RESTAURANT: "RESTAURANT",
  CATEGORIES: "CATEGORIES",
  MENUS: "MENUS"
}

let CAT_CACHE_CALL = false;
let REST_CACHE_CALL = false;
let MENU_CACHE_CALL = false;

const getCategory = async () => {
  let records: any = [];
  try {
    const fromLocal = window.localStorage.getItem(KEYS.CATEGORIES) || '';
    if (fromLocal && CAT_CACHE_CALL) {
      console.log("from local");
      records = JSON.parse(fromLocal);
    } else {
      console.log("from server");
      const test = await $apiService.getCall("categories");
      records = test.apidata || [];
      CAT_CACHE_CALL = true;
    }
    return records;
  } catch (error) {
    records = [];
  }
  return records;
}

const getRestaurant = async () => {
  let records: any = [];
  try {
    const fromLocal = window.localStorage.getItem(KEYS.RESTAURANT) || '';
    if (fromLocal && REST_CACHE_CALL) {
      records = JSON.parse(fromLocal);
    } else {
      const test = await $apiService.getCall("restaurant");
      records = test.apidata || [];
      REST_CACHE_CALL = true;
    }
    return records;
  } catch (error) {
    records = [];
  }
  return records;
}

const getMenu = async () => {
  let records: any = [];
  try {
    const fromLocal = window.localStorage.getItem(KEYS.MENUS) || '';
    if (fromLocal && MENU_CACHE_CALL) {
      records = JSON.parse(fromLocal);
    } else {
      const test = await $apiService.getCall("menus");
      records = test.apidata || [];   
      MENU_CACHE_CALL = true;   
    }

    const restId = window.localStorage.getItem(KEYS.RESTID);
    if(restId){
      records = records.filter((m: any) => m.RestaurantId._id == restId) || [];
    }

    for(let m = 0 ; m < (records || []).length; m++){
      records[m].RestaurantId.Distance = '1.8 Km';
      records[m].RestaurantId.OpenStatus = 'Open';
    }

    return records;
  } catch (error) {
    records = [];
  }
  return records;
}

const getMenuPrice = (currentMenu: any) => {
  let price = parseFloat(currentMenu.Price);

  for (let t = 0; t < (currentMenu.Toppings || []).length; t++) {
    if (currentMenu.Toppings[t].isChecked) {
      price = price + parseFloat(currentMenu.Toppings[t].Price);
    }
  }
  return price;
}


const getMenuPriceOnCart = (currentItem: any) => {
  let price = parseFloat(currentItem.MenuObject.Price);

  for (let t = 0; t < (currentItem.AddOns || []).length; t++) {
    if (currentItem.AddOns) {
      price = price + parseFloat(currentItem.AddOns[t].Price);
    }
  }
  
  return price;
}

export default {
  KEYS, getCategory, getRestaurant, getMenu, getMenuPrice, getMenuPriceOnCart
}
