<template>
    <v-dialog v-model="tableDialog" :fullscreen="isExtraSmall" :max-width="maxWidth" content-class="custom-dialog"
        scrollable>
        <template v-slot:activator="{ on, attrs }">
            <v-list-item-title v-bind="attrs" v-on="on">{{ title }}</v-list-item-title>
        </template>
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
        <v-card class="custom-dialog">
            <slot></slot>
            <v-card-title class="pa-0">
                <v-toolbar dark color="primary">
                            <v-toolbar-title>{{ title }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon dark @click="closeNewEnvironmentStatus()">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar>
            </v-card-title>
            <v-card-text class="pa-0">
                <v-data-table :headers="headersWithActions" :items="data" :page.sync="page"
                    :items-per-page="resultsPerPage" @page-count="pageCount = $event" hide-default-footer>
                    <template v-slot:item.actions="{ item }">
                        <v-icon color="primary lighten-1" class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
                        <v-icon color="error lighten-1" @click="deleteItem(item)"> mdi-delete </v-icon>
                    </template>
                    <template v-slot:no-data> Ue tem nada aqui </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions class="row no-gutters">
                <v-row no-gutters justify="center">
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                </v-row>
                <v-row align="end" class="mb-5 mx-4">
                    <v-col cols="auto" class="px-0">
                        <v-row no-gutters align="end">
                            <v-col cols="auto" class="d-flex align-end justify-end">
                                <v-select v-model="resultsPerPage" :items="[5, 10, 15]" type="number"
                                    style="max-width: 80px" outlined>
                                    <template v-slot:item="{ item, on, attrs }">
                                        <v-list-item v-bind="attrs" v-on="on">
                                            <v-list-item-title :id="attrs['aria-labelledby']" v-text="item">
                                            </v-list-item-title>
                                        </v-list-item>
                                    </template>
                                </v-select>
                            </v-col>
                            <v-col class="d-flex align-end justify-end mx-2">
                                <span style="color: var(--v-secondary-base);" class="subtitle-2">Resultados por
                                    página</span>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="ml-auto" align="end">
                        <v-dialog v-model="dialog" max-width="400" content-class="custom-dialog">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="btn-larger subtitle-2 font-weight-bold mt-2"
                                    v-bind="attrs" v-on="on"> Adicionar </v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="pa-0">
                                    <v-toolbar dark color="primary">
                                        <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-btn icon dark @click="close()">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-card-title>
                                <v-card-text class="text--primary subtitle-1 pt-6">
                                    <v-text-field v-for="(header, index) in headers" :key="index" :label="header.text"
                                        outlined v-model="editedItem[header.value]" @keyup.enter="save()"
                                        :ref="(ref) => { editTextField.push(ref) }">
                                    </v-text-field>
                                </v-card-text>
                                <v-card-actions class="pa-4 pb-5">
                                    <v-btn @click="close()" class="px-6" x-large rounded text color="error"> Cancelar
                                    </v-btn>
                                    <v-btn @click="save()" x-large rounded color="primary" class="ml-auto px-6"> Salvar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue';

export default {
    name: 'CRUDTableModal',

    props: {
        title: {
            type: String,
            default: 'Título',
            required: true
        },
        maxWidth: {
            type: String,
            default: '500',
            required: false
        },
        data: {
            type: Array,
            default: () => [],
            required: true
        },
        headers: {
            type: Array,
            default: () => [
                {
                    text: 'Exemplo 1',
                    align: 'start',
                    sortable: true,
                    value: 'example1',
                }, {
                    text: 'Exemplo 2',
                    align: 'center',
                    sortable: true,
                    value: 'example2',
                },
            ],
            required: true
        },
    },

    setup(props, { emit }) {
        const loadingUpdate = ref(false);
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

        function emitAndCloseDelete() {
            emit('delete-item-confirm', editedItem.value, editedIndex.value);
            closeDelete();
        }

        function editItem(item) {
            editedIndex.value = props.data.indexOf(item)
            editedItem.value = Object.assign({}, item)
            dialog.value = true
        };

        function deleteItem(item) {
            editedIndex.value = props.data.indexOf(item)
            editedItem.value = Object.assign({}, item)
            dialogDelete.value = true
        };

        async function close() {
            dialog.value = false
            await nextTick();
            editedItem.value = Object.assign({}, defaultItem.value)
            editedIndex.value = -1
        };

        async function closeNewEnvironmentStatus() {
            tableDialog.value = false
            await nextTick();
        };

        async function closeDelete() {
            dialogDelete.value = false
            await nextTick();
            editedItem.value = Object.assign({}, defaultItem.value)
            editedIndex.value = -1
        };

        function save() {
            if (editedIndex.value > -1) {
                emit('update-item', editedItem.value, editedIndex.value);
            } else {
                emit('add-new-item', editedItem.value);
            }
            close();
        };

        watch(tableDialog, (val) => {
            val || closeNewEnvironmentStatus();
        });

        watch(dialog, async (val) => {
            if (val) {
                await nextTick();
                editTextField.value[0].focus();
            } else {
                close();
            }
        });

        watch(dialogDelete, (val) => {
            val || closeDelete();
        });

        const headersWithActions = computed(() => {
            return [...props.headers, {
                text: 'Ações',
                align: 'end',
                value: 'actions',
                sortable: false
            }];
        })

        const formTitle = computed(() => {
            return editedIndex === -1 ? 'Novo item' : 'Editar item'
        });

        const isExtraSmall = computed({
            get() {
                return this.$vuetify.breakpoint.width <= 600 ? true : false;
            }
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
            isExtraSmall,
            headersWithActions,
            emitAndCloseDelete,
            loadingUpdate
        }
    }
}
</script>

<style lang="scss" scoped>
.v-data-table{
    border-radius: 0;
}
.v-dialog__content--active::v-deep .v-dialog.custom-dialog {
    border-radius: 16px;
}

.v-text-field--outlined::v-deep(fieldset) {
    background: var(--v-textField-base);
    border: 1px solid #ECECF7;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    border-radius: 13px;
    transition: border 0.1s linear 0s;
}

.v-input--is-focused.v-text-field--outlined::v-deep(fieldset) {
    border: 2px solid #2886DA;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    transition: border 0.1s linear 0s;
}
</style>