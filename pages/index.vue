<template>
    <v-container :class="containerStyle">
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
import { computed, onMounted, ref } from 'vue';
import { useEventStore } from '@/store/Models/Event/event.js';
import { useToast } from '@/plugins/toast.js';

const notify = useToast();
const eventStore = useEventStore();
const slides = ref([{
    title: 'Slide apenas teste 1',
    image: '/temp/1.jpg',
    color: 'white--text',
    lang: {description: 'Sem descrição'}
}, {
    title: 'Slide apenas teste 2',
    image: '/temp/2.jpg',
    color: 'success--text',
    lang: {description: 'Sem descrição'}
}, {
    title: 'Slide apenas teste 3',
    image: '/temp/3.jpg',
    color: 'white--text',
    lang: {description: 'Sem descrição'}
}]);

const cards = ref([{
    title: 'Teste 1',
    image: '/temp/cards/card (1).jpg',
    color: 'white--text',
    lang: {description: 'Sem descrição'}
}, {
    title: 'Teste 2 apenas teste',
    image: '/temp/cards/card (2).jpg',
    color: 'success--text',
    lang: {description: 'Sem descrição'}
}, {
    title: 'Teste 3',
    image: '/temp/cards/card (3).jpg',
    color: 'white--text',
    lang: {description: 'Sem descrição'}
}, {
    title: 'Teste 4',
    image: '/temp/cards/card (4).jpg',
    color: 'white--text',
    lang: {description: 'Sem descrição'}
}, {
    title: 'Teste 5',
    image: '/temp/cards/card (5).jpg',
    color: 'white--text',
    lang: {description: 'Sem descrição'}
}]);

const containerStyle = computed({
    get() {
        // return this.$vuetify.breakpoint.width > 1280 ? 'container-style' : '';
        return '';
    }
});

onMounted(() => {
    cards.value = [...eventStore.events, ...cards.value];
    slides.value = [...eventStore.events, ...slides.value];
});
</script>

<style lang="scss" scoped>
.container-style {
    width: 80%;
}
</style>