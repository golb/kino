'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        seats: [],
        bookedSeatsHuman: [],
        totalPrice: 0,
        messageSuccess: false
    },
    mutations: {
        clearData(state) {
            state.totalPrice = 0;
            state.bookedSeatsHuman = [];
            state.messageSuccess = false;
        },
        
        book(state, seats) {            
            state.seats.forEach((item) => {
                item.seats.forEach((seat) => {
                    if (seat.id == seats.id) seat.booked = true;
                })
            })
            state.bookedSeatsHuman.push(`ряд ${seats.row} место ${seats.seat}`)
            state.totalPrice += +seats.price
        },
        
        unbook(state, seats) {
            state.seats.forEach((item) => {
                item.seats.forEach((seat) => {
                    if (seat.id == seats.id) seat.booked = false;
                })
            })
            let indx;
            state.bookedSeatsHuman.some((item, i) => {
                indx = i;
                return item == `ряд ${seats.row} место ${seats.seat}`
            })
            state.bookedSeatsHuman.splice(indx, 1)
            state.totalPrice -= +seats.price
        },
        
        payOrder(state) {            
            state.seats.forEach((item) => {
                item.seats.forEach((seat) => {
                    if (seat.booked) {
                        seat.purchased = true;
                        seat.booked = false;
                    }
                })
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
