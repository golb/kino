<template>
<li :class="classSeat"
    @click="chooseSeat"></li>
</template>

<script>
    export default {
        props: ['id', 'purchased', 'booked', 'price'],        
        data: function() {
            return {
                opts: {
                    id: this.id,
                    price: this.price
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
                return this.purchased ? true : false
            },
            
            isBooked() {
                return this.booked ? true : false
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