<template>
    <div>
        <v-card class="mr-2" max-width="350" elevation="0" rounded>
            <v-img class="white--text align-end" height="200px" :src="image">
                <v-card-title>
                    {{ title }}
                    <EventDescriptionModal :description="description" btn-title="Comprar" :image="image" :title="title"></EventDescriptionModal>
                </v-card-title>
            </v-img>
        </v-card>
    </div>
</template>

<script>
import EventDescriptionModal from './EventDescriptionModal.vue';

export default {
    props: {
        image: String,
        title: String,
        description: String
    },
    components: { EventDescriptionModal }
}
</script>