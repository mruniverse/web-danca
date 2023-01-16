<template>
    <div class="text-center">
        <v-menu offset-y nudge-left="105" content-class="menu-style">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="secondary" v-bind="attrs" v-on="on" class="btn-larger subtitle-2 font-weight-bold"> Opções
                </v-btn>
            </template>
            <v-list>
                <v-list-item link>
                    <NewEnvironmentType></NewEnvironmentType>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
import NewEnvironmentType from './NewEnvironmentType.vue';

export default {
    name: "NewEnvironmentOptions",
    components: { NewEnvironmentType }
}
</script>

<style lang="scss" scoped>
.menu-style {
    margin-top: 4px;
    border-radius: 10px 0 10px 10px;
    box-shadow: 0px 4px 4px 4px var(--vt-c-shadows-1);
}
</style>