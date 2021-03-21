//add this in the router index.js
import Vue from 'vue'


export const authGuard = (to, from, next) => {

  debugger;


  let access_token = Vue.$cookies.get('access_token')
    if (access_token == null) {
        // user doesn't have access token, redirect to login
        next({ path: '/' })
    }
    else {
        // user has access token, user can open the page
        next()
    }

};
