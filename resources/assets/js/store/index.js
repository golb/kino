'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        seats: [],
        totalPrice: 0,
        messageSuccess: false
    },
    mutations: {
        clearData(state) {
            state.totalPrice = 0;
            state.messageSuccess = false;
        },
        
        book(state, seats) {            
            state.seats.forEach((item) => {
                if (item.id == seats.id) {
                    item.booked = true;
                    state.totalPrice += +seats.price
                }
            })
        },
        
        unbook(state, seats) {
            state.seats.forEach((item) => {
                if (item.id == seats.id) {
                    item.booked = false;
                    state.totalPrice -= +seats.price
                }
            })
        },
        
        payOrder(state) {            
            state.seats.forEach((item) => {
                if (item.booked) {
                    item.purchased = true;
                    item.booked = false;
                }
            })
            state.messageSuccess = true;
        }
    },
    actions: {
        book(context, seats) {
            if (context.state.messageSuccess) context.commit('clearData');
            context.commit('book', seats);
        },
        
        unbook(context, seats) {
            if (context.state.messageSuccess) context.commit('clearData');
            context.commit('unbook', seats);
        }
    }
})