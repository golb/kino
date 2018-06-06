<template>
    <div class="stats">
        <div class="wrapper" v-if="bookedSeatsHuman.length && !messageSuccess">
            <div class="orderedSeats"><span>Вы выбрали места:</span> {{ youOrdered }}</div>
            <div class="total"><span>Стоимость:</span> {{ totalPrice }} руб.</div>
            <div class="buttons">
                <div class="buy" @click="buyTickets">Купить</div>
                <div class="cancel">Отмена</div>
            </div>
        </div>
        <div class="message" v-if="messageSuccess">Спасибо за заказ!</div>
    </div>
</template>

<script>
    export default {
        computed: {
            bookedSeatsHuman() {
                let arr = this.$store.state.seats.filter((item) => {
                    return item.booked
                })
                return arr.map((item) => {
                    return `ряд ${item.row} место ${item.seat}`
                });
            },
            
            youOrdered() {
                return this.bookedSeatsHuman.join(', ')
            },
            
            totalPrice() {
                return this.$store.state.totalPrice
            },
            
            messageSuccess() {
                return this.$store.state.messageSuccess
            }
        },
        methods: {
            buyTickets() {
                this.$store.commit('payOrder');
            }
        }
    }
</script>