<template>
    <v-container class="container-style">
        <v-row no-gutters justify="center" class="mb-4">
            <TopBar></TopBar>
        </v-row>
        <v-row no-gutters>
            <p class="text-h6 mx-2 mb-2">Em Destaque</p>
        </v-row>
        <v-row no-gutters justify="center">
            <Carousel></Carousel>
        </v-row>
        <v-divider class="ma-6 mb-4"></v-divider>
        <v-row no-gutters>
            <p class="text-h6 mx-2 mb-0">Perto de você</p>
            <v-btn text rounded class="custom-font ml-auto">Ver todos <v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
        <ScrollShadow>
            <v-col v-for="(card, index) in cards" :key="index">
                <EventCard :title="card.title" :image="card.image"></EventCard>
            </v-col>
        </ScrollShadow>
        <v-row no-gutters>
            <p class="text-h6 mx-2 mb-0">Outros eventos</p>
            <v-btn text rounded class="custom-font ml-auto">Ver todos <v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
        <ScrollShadow>
            <v-col v-for="(card, index) in cards" :key="index">
                <EventCard :title="card.title" :image="card.image"></EventCard>
            </v-col>
        </ScrollShadow>
    </v-container>
</template>

<script setup>
import TopBar from '@/components/Main/TopBar.vue';
import Carousel from '@/components/Main/Carousel.vue';
import EventCard from '@/components/Main/EventCard.vue';
import ScrollShadow from '@/components/ScrollShadow.vue';
import { ref } from 'vue';

const cards = ref([{
    title: 'Teste 1',
    image: '/temp/cards/card (1).jpg'
}, {
    title: 'Teste 2',
    image: '/temp/cards/card (2).jpg'
}, {
    title: 'Teste 3',
    image: '/temp/cards/card (3).jpg'
}, {
    title: 'Teste 4',
    image: '/temp/cards/card (4).jpg'
}, {
    title: 'Teste 5',
    image: '/temp/cards/card (5).jpg'
}
]);


</script>

<style lang="scss" scoped>
.container-style {
    width: 80%;
}

.custom-font {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 700;
    text-transform: none;
    letter-spacing: normal;
}
</style>