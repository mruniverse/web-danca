<template>
    <v-card class="custom-card" flat width="400" height="600">
        <v-container class="py-10">
            <v-row no-gutters class="py-8">
                <v-col>
                    <v-row no-gutters justify="center" class="mb-2">
                        <v-avatar color="primary" size="120">
                            <v-icon size="60" color="background">mdi-account</v-icon>
                        </v-avatar>
                    </v-row>
                    <v-row no-gutters justify="center">
                        <p class="mb-0 text-h5">{{ loginStore.username }}</p>
                    </v-row>
                    <v-row no-gutters justify="center">
                        <p class="mb-0 caption ">{{ loginStore.email }}</p>
                    </v-row>
                </v-col>
            </v-row>
            <v-row v-for="index in [1, 2, 3, 4, 5]" :key="index">
                <v-row no-gutters justify="center" class="my-1">
                    <v-card width="80%" height="30px" flat color="grey"></v-card>
                </v-row>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup>
import { useLoginStore } from '@/store/login';
const loginStore = useLoginStore();

</script>

<style lang="scss" scoped>
.custom-card.v-sheet.v-card {
    box-shadow: 4px 4px 4px var(--vt-c-shadows-1) !important;
    border-radius: 13px;
}
</style>