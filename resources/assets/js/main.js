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
            let nextId = 1;
            let seat = 1;
            let row = 1            
            for (let i = 0; i < this.lengthRow * this.rows ; ++i) {
                if (seat == this.lengthRow + 1) {
                    seat = 1;
                    row++;
                }
                this.seats.push({
                    row: row, 
                    seat: seat++,
                    purchased: false,
                    booked: false,
                    price: 100,
                    id: nextId++
                });
            }
        },
        
        randomPurchased() {
            let randSeat,
                randRow;
            for (let i = 1; i <= this.initialPurchased; i++) {
                randSeat = 1 + Math.floor(Math.random() * (this.lengthRow));
                randRow = 1 + Math.floor(Math.random() * 100);
                if (this.seats[randRow - 1].seat[randSeat - 1] == randSeat) {
                    this.seats.some((item, i) => {
                        randRow = i;
                        return !item.purchased;
                    })
                    this.seats[randRow].purchased = true;
                } else {
                    this.seats[randRow - 1].purchased = true;
                }
            }
        }
    },
    created: function () {
        this.generateSeats();
        this.randomPurchased();
    }
});