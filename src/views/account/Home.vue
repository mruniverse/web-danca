<template>
    <v-row no-gutters>
        <v-col cols="2">
            <NavigationDrawer />
        </v-col>
        <v-col cols="10">
            <v-row no-gutters>
                <v-col cols=6 class="pa-4">
                    <div class="pl-2 text-title-custom">Meus eventos</div>
                </v-col>
                <v-col cols="6" class="pa-4">
                    <v-row no-gutters justify="end">
                        <v-col cols="2">
                            <Notification />
                        </v-col>
                        <v-col cols="6">
                            <MyAccount />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row no-gutters justify="center">
                <v-col cols="12" class="pa-6">
                    <MyEventsTable/>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>
import NavigationDrawer from '@/components/account/Home/NavigationDrawer.vue';
import Notification from '@/components/account/Home/Notification.vue';
import MyAccount from '@/components/account/Home/MyAccount.vue';
import MyEventsTable from '@/components/account/Home/MyEventsTable.vue';
</script>

<style lang="scss" scoped>
.text-title-custom {
    font-weight: 700;
    font-size: 28px;
}
</style>
