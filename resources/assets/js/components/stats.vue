<template>
    <div class="stats" v-if="this.$store.state.bookedSeatsHuman.length">
        <div class="wrapper">
            <div class="orderedSeats"><span>Вы выбрали места:</span> {{ youOrdered }}</div>
            <div class="total"><span>Стоимость:</span> {{ totalPrice }} руб.</div>
            <div class="buttons">
                <div class="buy" @click="buyTickets">Купить</div>
                <div class="cancel">Отмена</div>
            </div>
            <div class="message" v-if="messageSuccess">Спасибо за заказ!</div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            youOrdered() {
                return this.$store.state.bookedSeatsHuman.join(', ')
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
            },
            
            cancelTickets() {
                this.$store.commit('cancelOrder');
            }
        }
    }
</script>