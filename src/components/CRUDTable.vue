<template>
    <v-col>
        <v-row no-gutters justify="end">
            <v-col cols="auto">
                <SearchBar :search="search" @update:search="(value) => {search = value}"></SearchBar>
            </v-col>
            <div class="mx-2"></div>
            <v-col cols="auto" class="d-flex align-center">
                <slot name="options"></slot>
                <div v-show="$slots.options" class="mx-2"></div>
                <slot name="add-button">
                    <v-dialog v-model="dialog" max-width="500" content-class="custom-dialog" scrollable>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="btn-larger subtitle-2 font-weight-bold" v-bind="attrs" v-on="on">
                                Adicionar </v-btn>
                        </template>
                        <v-card>
                            <v-overlay absolute :value="loading">
                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </v-overlay>

                            <v-card-title class="pa-0">
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon dark @click="close()">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-toolbar>
                            </v-card-title>
                            <v-card-text class="text--primary subtitle-1 pt-6 mb-n6">
                                <div v-for="(property, key) in properties" :key="key">
                                    <v-text-field 
                                        v-if="property.type !== 'select'" :label="property.label" 
                                        v-model="editedItem[key]" :type="property.type"
                                        class="custom-field mb-4" outlined @keyup.enter="save()" 
                                        :ref="(ref) => { editTextField.push(ref) }"
                                        :rules="[rules.required]">
                                    </v-text-field>
                                    
                                    <v-select 
                                        v-else :label="property.label" v-model="editedItem[key]" 
                                        :items="property.item.items" class="mb-8"
                                        :item-text="property.item.text" :item-value="property.item.value" 
                                        :ref="(ref) => { editTextField.push(ref) }"
                                        :rules="[rules.required]"
                                        @keyup.enter="save()" outlined>
                                    </v-select>
                                </div>
                            </v-card-text>
                            <v-card-actions class="pa-4 pb-5">
                                <v-btn @click="close()" class="px-6" x-large rounded text color="error"> Cancelar </v-btn>
                                <v-btn @click="save()" x-large rounded color="primary" class="ml-auto px-6"> Salvar </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </slot>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" class="py-6">
                <v-card class="custom-card" style="overflow-x: auto;">
                    <v-data-table
                    :loading="loading"
                    loading-text="Loading... Please wait"
                    :headers="headersWithActions" 
                    :items="data" 
                    :page.sync="page"
                    :items-per-page="resultsPerPage"
                    :search="search" 
                    @page-count="pageCount = $event" 
                    hide-default-footer>
                        <template v-slot:item.actions="{ item }">
                            <slot name="edit" :item="item">
                                <v-icon color="primary lighten-1" class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
                            </slot>
                            <v-icon color="error lighten-1" @click="deleteItem(item)"> mdi-delete </v-icon>
                        </template>
                        <template v-slot:no-data> Ue tem nada aqui </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters align="center">
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
                        <v-select v-model="resultsPerPage" :items="[5, 10, 15]" type="number" style="max-width: 80px"
                            outlined>
                            <template v-slot:item="{ item, on, attrs }">
                                <v-list-item v-bind="attrs" v-on="on">
                                    <v-list-item-title :id="attrs['aria-labelledby']" v-text="item">
                                    </v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-select>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogDelete" content-class="custom-dialog" max-width="300">
            <v-card class="pa-2">
                <v-card-title class="text-h5">
                    <v-row justify="center">Tem certeza?</v-row>
                </v-card-title>
                <v-card-text></v-card-text>
                <v-card-actions>
                    <v-btn text @click="closeDelete">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" class="btn-custom" @click="emitAndCloseDelete()">Deletar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
    name: "CRUDTable",
    props: {
        loading: {
            type: Boolean,
            default: false,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            default: () => [
                {
                    text: "Exemplo 1",
                    align: "start",
                    sortable: true,
                    value: "example1",
                },
                {
                    text: "Exemplo 2",
                    align: "center",
                    sortable: true,
                    value: "example2",
                },
            ],
            required: true
        },
        properties: {
            type: Object,
            required: false
        },
    },

    components: { SearchBar },

    setup(props, { emit }) {
        const search = ref("");
        const editTextField = ref([]);
        const tableDialog = ref(false);
        const dialog = ref(false);
        const dialogDelete = ref(false);
        const editedIndex = ref(-1);
        const resultsPerPage = ref(5);
        const page = ref(1);
        const pageCount = ref(0);
        const editedItem = ref({});
        const defaultItem = ref({});
        const loading = computed(() => props.loading);
        const rules = ref({
            required: value => !!value || 'Obrigatório.'
        });

        onMounted(() => {
            console.log(props.data);
        });

        function emitAndCloseDelete() {
            emit("delete-item-confirm", editedItem.value, editedIndex.value);
            closeDelete();
        }
        function editItem(item) {
            editedIndex.value = props.data.indexOf(item);
            editedItem.value = Object.assign({}, item);
            dialog.value = true;
        }
        ;
        function deleteItem(item) {
            editedIndex.value = props.data.indexOf(item);
            editedItem.value = Object.assign({}, item);
            dialogDelete.value = true;
        }
        ;
        async function close() {
            dialog.value = false;
            await nextTick();
            editedItem.value = Object.assign({}, defaultItem.value);
            editedIndex.value = -1;
        }
        ;
        async function closeNewEnvironmentStatus() {
            tableDialog.value = false;
            await nextTick();
        }
        ;
        async function closeDelete() {
            dialogDelete.value = false;
            await nextTick();
            editedItem.value = Object.assign({}, defaultItem.value);
            editedIndex.value = -1;
        };

        function save() {
            if (editedIndex.value > -1) {
                emit("update-item", editedIndex.value, editedItem.value);
            } else {
                emit("add-new-item", editedItem.value);
            }
        };

        watch(loading, (value) => {
            if(!value){
                close();
            }
        });

        watch(tableDialog, (val) => {
            val || closeNewEnvironmentStatus();
        });

        watch(dialog, async (val) => {
            if (val) {
                await nextTick();
                editTextField.value[0].focus();
            }
            else {
                close();
            }
        });

        watch(dialogDelete, (val) => {
            val || closeDelete();
        });

        const headersWithActions = computed(() => {
            return [...props.headers, {
                text: "Ações",
                align: "end",
                value: "actions",
                sortable: false
            }];
        });

        const formTitle = computed(() => {
            return editedIndex === -1 ? "Novo item" : "Editar item";
        });
        
        return {
            editTextField,
            tableDialog,
            dialog,
            dialogDelete,
            editedIndex,
            resultsPerPage,
            page,
            pageCount,
            editedItem,
            defaultItem,
            editItem,
            deleteItem,
            close,
            closeNewEnvironmentStatus,
            closeDelete,
            save,
            formTitle,
            headersWithActions,
            emitAndCloseDelete,
            rules,
            search,
        };
    },
}
</script>

<style lang="scss" scoped>
.custom-card.v-sheet.v-card {
    box-shadow: 4px 4px 4px var(--vt-c-shadows-1) !important;
    border-radius: 13px;
}

.v-data-table {
    border-radius: 13px;
}

.v-dialog__content--active::v-deep .v-dialog.custom-dialog {
    border-radius: 16px;
}

.custom-field.v-text-field--outlined::v-deep(fieldset) {
    top: -2px;
    height: 48px;
    background: var(--v-background-color);
    border: 1px solid #ECECF7;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    border-radius: 13px;
    transition: border 0.1s linear 0s;
}

.custom-field.v-input--is-focused.v-text-field--outlined::v-deep(fieldset) {
    border: 2px solid #2886DA;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    transition: border 0.1s linear 0s;
}

.custom-field.error--text.v-text-field--outlined::v-deep(fieldset) {
    border: 2px solid #ff5252;
}
</style>