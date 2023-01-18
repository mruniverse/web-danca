<template>
    <v-col>
        <v-row no-gutters justify="end">
            <v-col cols="auto">
                <SearchBar></SearchBar>
            </v-col>
            <div class="mx-2"></div>
            <v-col cols="auto" class="d-flex align-center">
                <EnvironmentOptions></EnvironmentOptions>
                <div class="mx-2"></div>
                <v-btn class="btn-larger subtitle-2 font-weight-bold"
                    @click="$router.push({ name: 'NewEnvironment' }).catch()" color="primary" dark> Novo Ambiente </v-btn>
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
import MyEventsTable from '@/components/Home/EventsComponents/MyEventsTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import EnvironmentOptions from '@/components/Home/EnvironmentsComponents/EnvironmentsOptions/EnvironmentOptions.vue';
</script>