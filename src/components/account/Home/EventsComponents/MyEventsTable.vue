<template>
    <div>
        <v-data-table 
            :headers="state.headers" 
            :search="search"
            :items="state.desserts" 
            :items-per-page="resultsPerPage"
            :page.sync="page"
            @page-count="pageCount = $event"
            hide-default-footer 
            class="data-table-custom">
        </v-data-table>
        <v-row no-gutters align="center" class="my-4">
            <v-col></v-col>
            <v-col cols="4">
                <v-row no-gutters justify="center">
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                </v-row>
            </v-col>
            <v-col>
                <v-row no-gutters justify="end">
                    <v-col class="d-flex align-end justify-end mx-2">
                        <span style="color: var(--v-secondary-base);" class="subtitle-2">Resultados por página</span>
                    </v-col>
                    <v-col cols="auto" class="d-flex align-end justify-end">
                        <v-select v-model="resultsPerPage" :items="[5,10,15]" type="number" style="max-width: 80px" outlined>
                            <template v-slot:item="{ item, on, attrs }">
                                <v-list-item v-bind="attrs" v-on="on">
                                    <v-list-item-title 
                                        :id="attrs['aria-labelledby']" 
                                        v-text="item">
                                    </v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-select>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { usePageStore } from '@/store/page';

const pageStore = usePageStore();
const resultsPerPage = ref(5);
const page = ref(1);
const pageCount = ref(0);
const search = computed(() => pageStore.getSerach());



const state = reactive({
    headers: [
        {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
    ],
    desserts: [
        {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
        },
        {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
        },
        {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
        },
        {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
        },
        {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
        },
        {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
        },
        {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
        },
        {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
        },
        {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
        },
        {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6'
        },
    ],
});
</script>

<style lang="scss">
.data-table-custom {
    font-weight: 500;
    font-size: 12px;
    box-shadow: 0px 4px 4px rgba(59, 124, 182, 0.03);
    border-radius: 13px;
}

.v-input.v-text-field--outlined.v-select {
    height: 48px;
    background: var(--v-textField-base);
    border: 1px solid #ECECF7;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    border-radius: 13px;
    transition: border 0.1s linear 0s;
}

.v-text-field .v-label {
    top: 14px;
}

.v-text-field--outlined > .v-input__control > .v-input__slot, .v-text-field--outlined fieldset {
    min-height: 48px;
    border-width: 0;
}

.v-text-field--full-width .v-input__prepend-outer, .v-text-field--full-width .v-input__prepend-inner, .v-text-field--full-width .v-input__append-inner, .v-text-field--full-width .v-input__append-outer, .v-text-field--enclosed .v-input__prepend-outer, .v-text-field--enclosed .v-input__prepend-inner, .v-text-field--enclosed .v-input__append-inner, .v-text-field--enclosed .v-input__append-outer {
    margin-top: 14px;
}

.v-input--is-focused.v-text-field--outlined::v-deep(fieldset) {
    border: 2px solid #2886DA;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    transition: border 0.1s linear 0s;
}

.v-pagination__navigation, .v-pagination__item{
    border-radius: 10px;
    box-shadow: 0px 4px 4px 4px var(--vt-c-shadows-1);
}
</style>