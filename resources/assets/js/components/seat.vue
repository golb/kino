<template>
<li :class="classSeat"
    @click="chooseSeat"><!--Ряд: {{ row }}, место: {{ seat.seat }}--></li>
</template>

<script>
    export default {
        props: ['row', 'seat'],        
        data: function() {
            return {
                opts: {
                    id: this.seat.id,
                    row: this.row,
                    seat: this.seat.seat,
                    price: this.seat.price
                }
            }
        },        
        computed: {
            classSeat() {
                return {
                    purchased: this.isPurchased && !this.isBooked,
                    booked: !this.isPurchased && this.isBooked
                }
            },
            
            isPurchased() {
                return this.seat.purchased ? true : false
            },
            
            isBooked() {
                return this.seat.booked ? true : false
            }
        },
        methods: {
            chooseSeat() {
                if (!this.isPurchased) {
                    if (this.isBooked) {
                        this.$store.dispatch('unbook', this.opts);
                    } else {
                        this.$store.dispatch('book', this.opts);
                    }
                }
            }
        }
    }
</script>