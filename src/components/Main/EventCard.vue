<template>
    <v-card class="mx-1" max-width="350" elevation="0" rounded>
        <v-img class="white--text align-end" height="200px" :src="image">
            <v-card-title>
                {{ title }} <v-btn color="primary" class="ml-auto" flat rounded> Comprar </v-btn>
            </v-card-title>
        </v-img>
    </v-card>
</template>

<script>
import { onMounted } from 'vue';

export default {
    props: {
        image: String,
        title: String,
    },

    setup(props) {
        onMounted(() => {
            console.log(props)
        });
    }
}
</script>
