<template>
    <div>
        <v-row no-gutters>
            <p class="text-h6 mx-2 mb-0">{{ title }}</p>
            <v-btn @click="toggleOverflow = !toggleOverflow" text rounded class="custom-font ml-auto">
                Ver todos 
                <v-icon v-if="!toggleOverflow">mdi-chevron-right</v-icon>
                <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
        </v-row>
        <ScrollShadow v-if="!toggleOverflow">
            <v-col v-for="(card, index) in cards" :key="index">
                <EventCard :description="card.lang.description" :title="card.title" :image="card.image || '/temp/not_found.jpg'"></EventCard>
            </v-col>
        </ScrollShadow>
        <v-row no-gutters v-else>
            <v-col cols="auto" class="my-1" v-for="(card, index) in cards" :key="index">
                <EventCard :description="card.lang.description" :title="card.title" :image="card.image || '/temp/not_found.jpg'"></EventCard>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'EventsList',

    props: {
        cards: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    },

    setup() {
        const toggleOverflow = ref(false);

        return { toggleOverflow };
    }
}
</script>

<style lang="scss" module>
.custom-font {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 700;
    text-transform: none;
    letter-spacing: normal;
}
</style>