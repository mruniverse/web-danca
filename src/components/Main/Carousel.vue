<template>
    <v-carousel cycle show-arrows-on-hover>
        <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="`/temp/${i + 1}.jpg`">
            <v-col cols="6" class="fill-height pa-0">
                <v-sheet height="100%" color="black" class="blur gradient"></v-sheet>
                <v-row no-gutters :class="`carousel-title text-h1 font-weight-bold ${colors[i]}`"> Título apenas teste
                </v-row>
            </v-col>
            <v-col class="carousel-sub-info" align="end">
                <v-btn rounded elevation="0" color="primary"> Mais informações </v-btn>
            </v-col>
        </v-carousel-item>
    </v-carousel>
</template>

<script setup>
import { ref } from 'vue';

const colors = ref([
    'white--text',
    'success--text',
    'white--text',
]);

const slides = ref([
    'First',
    'Second',
    'Third',
]);
</script>

<style lang="scss" scoped>
.v-carousel {
    border-radius: 10px;
}

.carousel-title {
    position: absolute;
    top: 50px;
    left: 60px;
}

.carousel-sub-info {
    position: absolute;
    bottom: 50px;
    right: 10px;
}

.blur {
    backdrop-filter: blur(1px);
}

.gradient {
    mask-image: -webkit-linear-gradient(left,
            rgba(0, 0, 0, 0.9),
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.2),
            transparent);
}
</style>