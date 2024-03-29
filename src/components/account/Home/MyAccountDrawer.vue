<template>
    <v-menu 
        content-class="menu-style" 
        transition="slide-y-transition" 
        bottom offset-y :close-on-content-click="state.closeOnContentClick">
        <template v-slot:activator="{ on, attrs }">
            <v-list class="pa-0" rounded :max-width="dense ? 53 : 300" color="transparent">
                <v-list-item class="pa-0" v-bind="attrs" v-on="on">
                    <v-btn :height="dense ? 50 : 60" min-width="40" :width="dense ? 53 : 65" :class="dense ? `button-dense` : `button`" color="primary">
                        <v-icon size="28" color="var(--color-background)">mdi-account-outline</v-icon>
                    </v-btn>
                    <v-list-item-content v-if="!dense" class="ml-4">
                        <v-list-item-title class="title">{{loginStore.username}}</v-list-item-title>
                        <v-list-item-subtitle>{{loginStore.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action v-if="!dense">
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </template>
        <v-list shaped>
            <v-list-item link @click="pageStore.setPage('Settings')">
                <v-list-item-title>Minha conta</v-list-item-title>
                <v-icon>mdi-account-outline</v-icon>
            </v-list-item>
            <v-list-item link @click="logout()">
                <v-list-item-title>Sair</v-list-item-title>
                <v-icon>mdi-logout</v-icon>
            </v-list-item>
            <v-list-item>
                <v-list-item-content class="pa-0 pl-2">
                    <v-row no-gutters justify="center">
                        <v-btn-toggle rounded color="primary" v-model="themeDark" mandatory>
                            <v-btn x-large height="32">
                                <v-icon>mdi-white-balance-sunny</v-icon>
                            </v-btn>
                            <v-btn x-large height="32">
                                <v-icon>mdi-weather-night</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import router from '@/router';
import { watch, onMounted, reactive, ref } from 'vue';
import { useThemeStore } from '@/store/theme';
import { useLoginStore } from '@/store/login';
import { usePageStore } from '@/store/page';

export default {
    props: {
        dense: Boolean,
    },

    setup(props, { emit }) {
        const loginStore = useLoginStore();
        const themeStore = useThemeStore();
        const pageStore = usePageStore();
        const themeDark = ref(false);
        const state = reactive({
            notifications: 3,
            closeOnContentClick: true,
        });

        onMounted(() => {
            themeDark.value = themeStore.getThemeDark();
        });

        watch(themeDark, (value) => {
            themeStore.setThemeDark(value);
            state.closeOnContentClick = false;
            setTimeout(() => {
                state.closeOnContentClick = true;
            }, 100);
        });

        function logout() {
            router.push({ name: 'Login' });
        }

        return { loginStore, themeDark, state, logout, pageStore };
    }
}
</script>

<style lang="scss" scoped>
.button {
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    border-radius: 20px;
}

.button-dense {
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    border-radius: 26px;
}

.menu-style {
    margin-top: 4px;
    border-radius: 0 10px 10px 10px;
    box-shadow: 0px 4px 4px 4px var(--vt-c-shadows-1);
}
</style>