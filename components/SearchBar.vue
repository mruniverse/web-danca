<template>
    <v-text-field 
    v-model="search" 
    outlined 
    append-icon="mdi-magnify" 
    label="Buscar" 
    single-line 
    hide-details>
    </v-text-field>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'SearchBar',
    props: {
        search: {
            type: String,
            default: ''
        },
    },

    setup(props, context) {      
        const search = computed({
            get: () => props.search,
            set: (value) => context.emit('update:search', value)
        });

        return { search }
    }
}
</script>

<style lang="scss" scoped>
.v-text-field--outlined:deep(fieldset) {
    background: var(--v-textField-base);
    border: 1px solid #ECECF7;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    border-radius: 13px;
    transition: border 0.1s linear 0s;
}

.v-input--is-focused.v-text-field--outlined:deep(fieldset) {
    border: 2px solid #2886DA;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    transition: border 0.1s linear 0s;
}

.error--text.v-text-field--outlined:deep(fieldset) {
    border: 2px solid #ff5252;
}
</style>