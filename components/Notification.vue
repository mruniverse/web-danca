<template>
    <v-menu content-class="menu-style" transition="slide-y-transition" left offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-badge v-if="!dense" offset-y="20" offset-x="14" overlap bottom color="error" :content="getNotificationNumber">
                <v-btn v-bind="attrs" v-on="on" width="40" height="60" class="button" color="defaultBtn">
                    <v-icon size="28" color="primary">mdi-bell-outline</v-icon>
                </v-btn>
            </v-badge>
            <v-badge v-else offset-y="36" offset-x="14" bottom color="error" :content="getNotificationNumber">
                <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon size="28" color="primary">mdi-bell-outline</v-icon>
                </v-btn>
            </v-badge>
        </template>
        <v-list shaped>
            <v-list-item-group color="primary">
                <v-list-item link disabled>
                    <v-list-item-title>Você não tem notificações</v-list-item-title>
                    <v-icon class="ml-2">mdi-emoticon-happy-outline</v-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
import { computed, reactive } from 'vue';

export default {
    props: {
        dense: Boolean,
    },

    setup(props, { emit }) {
        const state = reactive({
            notifications: 3
        });

        const getNotificationNumber = computed(() => {
            return state.notifications >= 100 ? '99+' : state.notifications;
        });

        return { state, getNotificationNumber }
    }
}

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