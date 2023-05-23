<template>
    <div>
        <v-btn class="button" @click="setPage()" width="40" height="60" color="defaultBtn">
            <v-icon size="30" color="primary">mdi-home-outline</v-icon>
        </v-btn>
    </div>
</template>

<script setup>
import { usePageStore } from '@/store/page';
import { useRouter } from '@/plugins/router';
const pageStore = usePageStore();
const router = useRouter();

function setPage() {
    pageStore.setPage('Main');
    router.push('/');
}
</script>

<style lang="scss" scoped>
.button {
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    border-radius: 20px;
}
</style>