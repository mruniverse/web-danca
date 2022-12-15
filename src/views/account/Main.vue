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
        <v-row no-gutters justify="center" class="my-2 mx-n2 mb-4">
            <v-col>
                <EventCard title="Teste 1" image="/temp/cards/card (1).jpg"></EventCard>
            </v-col>
            <v-col>
                <EventCard title="Teste 2" image="/temp/cards/card (2).jpg"></EventCard>
            </v-col>
            <v-col>
                <EventCard title="Teste 3" image="/temp/cards/card (3).jpg"></EventCard>
            </v-col>
            <v-col>
                <EventCard title="Teste 2" image="/temp/cards/card (2).jpg"></EventCard>
            </v-col>
            <v-col>
                <v-sheet class="mx-2" width="auto" height="200" rounded color="grey"></v-sheet>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <p class="text-h6 mx-2 mb-0">Outros eventos</p>
            <v-btn text rounded class="custom-font ml-auto">Ver todos <v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
        <v-row no-gutters justify="center" class="my-2 mx-n2 mb-4">
            <v-col>
                <EventCard title="Teste 4" image="/temp/cards/card (4).jpg"></EventCard>
            </v-col>
            <v-col>
                <EventCard title="Teste 5" image="/temp/cards/card (5).jpg"></EventCard>
            </v-col>
            <v-col>
                <EventCard title="Teste 2" image="/temp/cards/card (2).jpg"></EventCard>
            </v-col>
            <v-col>
                <EventCard title="Teste 1" image="/temp/cards/card (1).jpg"></EventCard>
            </v-col>
            <v-col>
                <v-sheet class="mx-2" width="auto" height="200" rounded color="grey"></v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import TopBar from '@/components/Main/TopBar.vue';
import Carousel from '@/components/Main/Carousel.vue';
import EventCard from '@/components/Main/EventCard.vue';
</script>

<style lang="scss" scoped>
.container-style {
    width: 80%;
}

.custom-font {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 700;
    text-transform:none;
    letter-spacing: normal;
}
</style>