<template>
    <div v-if="!dense">
        <v-btn @click="pageStore.setPage('Main')" width="40" height="60" class="button" color="white">
            <v-icon size="28" color="primary">mdi-home-outline</v-icon>
        </v-btn>
    </div>
    <v-badge v-else>
        <v-btn @click="pageStore.setPage('Main')" icon>
            <v-icon size="28" color="primary">mdi-home-outline</v-icon>
        </v-btn>
    </v-badge>
</template>

<script setup>
import { usePageStore } from '@/store/page';
const pageStore = usePageStore();
</script>

<style lang="scss" scoped>
.button {
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    border-radius: 20px;
}

.menu-style {
    margin-top: 10px;
    border-radius: 10px 0 10px 10px;
    box-shadow: 0px 4px 4px 4px var(--vt-c-shadows-1);
}
</style>