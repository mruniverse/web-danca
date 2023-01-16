<template>
    <div>
        <v-card class="mr-2" max-width="350" elevation="0" rounded>
            <v-img class="white--text align-end" height="200px" :src="image">
                <v-card-title>
                    {{ title }}
                    <v-dialog v-model="eventDescriptionStatus" scrollable>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                v-bind="attrs"
                                v-on="on"
                                color="primary" 
                                class="ml-auto" 
                                rounded> 
                                Comprar
                            </v-btn>
                        </template>
                        <EventDescription @setDialog="setDialog" :title="title" :image="image"></EventDescription>
                    </v-dialog>
                </v-card-title>
            </v-img>
        </v-card>
    </div>
</template>

<script>
import EventDescription from '@/components/Main/EventDescription.vue';
import { ref } from 'vue';

export default {
    props: {
        image: String,
        title: String,
    },

    components: { EventDescription },

    setup(){
        const eventDescriptionStatus = ref(false);

        function setDialog(status) {
            eventDescriptionStatus.value = status;
        }

        return { setDialog, eventDescriptionStatus }
    }
}
</script>

<style lang="scss" scoped>
.v-dialog__content--active::v-deep .v-dialog {
    border-radius: 16px;
    max-width: 80%;
    max-height: 80%;
}
</style>