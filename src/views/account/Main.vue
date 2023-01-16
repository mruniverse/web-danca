<template>
    <v-container class="container-style">
        <v-row no-gutters justify="center" class="mb-4">
            <TopBar></TopBar>
        </v-row>
        <v-row no-gutters>
            <p class="text-h6 mx-2 mb-2">Em Destaque</p>
        </v-row>
        <v-row no-gutters justify="center">
            <Carousel :slides="slides"></Carousel>
        </v-row>
        <v-divider class="ma-6 mb-4"></v-divider>
        <EventsList :cards="cards" title="Perto de você"></EventsList>
        <EventsList :cards="cards" title="Outros eventos"></EventsList>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import TopBar from '@/components/Main/TopBar.vue';
import Carousel from '@/components/Main/Carousel.vue';
import EventsList from '@/components/Main/EventsList.vue';

const slides = ref([{
    title: 'Slide apenas teste 1',
    image: '/temp/1.jpg',
    color: 'white--text'
}, {
    title: 'Slide apenas teste 2',
    image: '/temp/2.jpg',
    color: 'success--text'
}, {
    title: 'Slide apenas teste 3',
    image: '/temp/3.jpg',
    color: 'white--text'
}]);

const cards = ref([{
    title: 'Teste 1',
    image: '/temp/cards/card (1).jpg',
    color: 'white--text'
}, {
    title: 'Teste 2 apenas teste',
    image: '/temp/cards/card (2).jpg',
    color: 'success--text'
}, {
    title: 'Teste 3',
    image: '/temp/cards/card (3).jpg',
    color: 'white--text'
}, {
    title: 'Teste 4',
    image: '/temp/cards/card (4).jpg',
    color: 'white--text'
}, {
    title: 'Teste 5',
    image: '/temp/cards/card (5).jpg',
    color: 'white--text'
}]);
</script>

<style lang="scss" scoped>
.container-style {
    width: 80%;
}
</style>