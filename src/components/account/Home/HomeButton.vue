<template>
    <div>
        <v-btn class="button" @click="pageStore.setPage('Main')" width="40" height="60" color="defaultBtn">
            <v-icon size="30" color="primary">mdi-home-outline</v-icon>
        </v-btn>
    </div>
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
</style>