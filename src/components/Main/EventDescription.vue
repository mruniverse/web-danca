<template>
    <v-card>
        <v-img :style="cardTitleHeight" :src="image">
            <v-row class="fill-height">
                    <v-row align="center" justify="start" class="ml-1">
                        <v-card-title :style="cardTitleHeight" class="text-h1 font-weight-bold white--text">
                            {{ title }}
                        </v-card-title>
                    </v-row>
                <v-col cols="2" align="start" class="mt-3">
                    <v-app-bar flat color="transparent">
                        <v-spacer></v-spacer>
                        <v-btn fab color="white">
                            <v-icon @click="setDialog(false)" large>mdi-close</v-icon>
                        </v-btn>
                    </v-app-bar>
                </v-col>
            </v-row>
        </v-img>
        <v-card-text class="text--primary subtitle-1 py-2"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean eget diam semper, mollis turpis vel, lobortis ipsum. Nam nec dapibus turpis. Maecenas nisl odio,
            egestas elementum fermentum quis, mattis in urna. Nunc aliquam sapien non venenatis laoreet. Pellentesque
            habitant morbi. </v-card-text>
        <v-card-actions class="pa-4 pb-5">
            <v-btn class="px-6" x-large rounded text @click="setDialog(false)" color="error"> Cancelar </v-btn>
            <v-btn x-large rounded @click="" color="primary" class="ml-auto px-6"> Comprar </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { reactive } from 'vue';


export default {
    name: 'EventDescription',

    props: {
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    },

    setup(props, { emit }) {
        const cardTitleHeight = reactive({
            maxHeight: '40%'
        });

        const setDialog = (status) => {
            return emit('setDialog', status)
        }

        return { cardTitleHeight, setDialog }
    }
}

</script>