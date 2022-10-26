<template>
    <v-col>
        <v-row no-gutters justify="end">
            <v-col cols="auto">
                <SearchBar></SearchBar>
            </v-col>
            <div class="mx-2"></div>
            <v-col cols="auto" class="d-flex align-center btn-larger">
                <v-btn class="button-custom subtitle-2 font-weight-bold" color="#2887DA" dark>
                    Novo Ambiente
                </v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters justify="center">
            <v-col cols="12" class="py-6">
                <MyEventsTable />
            </v-col>
        </v-row>
    </v-col>
</template>

<script setup>
import MyEventsTable from '@/components/MyEventsTable.vue';
import SearchBar from '@/components/SearchBar.vue';
</script>