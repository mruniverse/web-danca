<template>
    <v-dialog 
    v-model="eventDescriptionStatus" 
    :fullscreen="isExtraSmall" 
    :content-class="customModalClass" 
    scrollable>
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="primary" class="ml-auto" rounded> {{ btnTitle }} </v-btn>
        </template>
        <EventDescription :description="description" @setDialog="setDialog" :title="title" :image="image"></EventDescription>
    </v-dialog>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    name: 'EventDescriptionModal',

    props: {
        image: String,
        title: String,
        btnTitle: String,
        description: String
    },

    setup() {
        const eventDescriptionStatus = ref(false);

        function setDialog(status) {
            eventDescriptionStatus.value = status;
        };

        const customModalClass = computed({
            get() {
                return isExtraSmall.value ? '' : 'custom-dialog';
            }
        });

        const isExtraSmall = computed({
            get() {
                return this.$vuetify.breakpoint.width <= 600 ? true : false;
            }
        });

        return { setDialog, eventDescriptionStatus, isExtraSmall, customModalClass }
    }
}
</script>

<style lang="scss" scoped>
.v-dialog__content--active::v-deep .v-dialog.custom-dialog {
    border-radius: 16px;
    max-width: 80%;
    max-height: 80%;
}
</style>