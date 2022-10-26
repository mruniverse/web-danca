<template>
    <v-col>
        <v-row no-gutters class="fill-height">
            <Seats></Seats>
        </v-row>
    </v-col>
</template>

<script setup>
import Seats from '@/components/account/Home/StageComponents/Seats.vue';
import { reactive } from 'vue';
</script>