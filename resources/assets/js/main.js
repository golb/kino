'use strict';

import Vue from 'vue'
import store from './store'

Vue.component('seat', function (resolve) {
    require(['./components/seat.vue'], resolve)
})

Vue.component('stats', function (resolve) {
    require(['./components/stats.vue'], resolve)
})


let app = new Vue({
    el: '.app',
    store,
    data: {
        nextId: 1,
        rowSeats: [],
        rows: 10,
        lengthRow: 10,
        initialPurchased: 10
    },
    computed: {
        seats() {
            return this.$store.state.seats
        }
    },
    methods: {
        generateSeats() {
            for (let i = 1; i <= this.lengthRow; i++) {
                this.rowSeats.push({
                    seat: i,
                    purchased: false,
                    booked: false,
                    price: 100
                })
            }
        },
        
        generateRows() {
            for (let i = 1; i <= this.rows; i++) {
                this.seats.push({
                    row: i,
                    seats: this.rowSeats.map((item) => {
                        return {
                            seat: item.seat,
                            purchased: item.purchased,
                            booked: item.booked,
                            price: item.price,
                            id: this.nextId++
                        }
                    })
                });
            }
        },
        
        randomPurchased() {
            let randSeat,
                randRow;
            for (let i = 1; i <= this.initialPurchased; i++) {
                randSeat = 1 + Math.floor(Math.random() * (this.lengthRow));
                randRow = 1 + Math.floor(Math.random() * (this.lengthRow));
                if (this.seats[randRow - 1].seats[randSeat - 1].purchased) {
                    this.seats[randRow - 1].seats.some((item, i) => {
                        randSeat = i;
                        return !item.purchased;
                    })
                    this.seats[randRow - 1].seats[randSeat].purchased = true;
                } else {
                    this.seats[randRow - 1].seats[randSeat - 1].purchased = true;
                }
            }
        }
    },
    created: function () {
        this.generateSeats();
        this.generateRows();
        this.randomPurchased();
    }
});