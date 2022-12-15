<template>
    <v-sheet class="login-sheet-style d-flex align-center">
        <v-row no-gutters class="d-flex justify-center">
            <v-col cols="9">
                <v-row no-gutters justify="start">
                    <p class="login-title-text">Entre com e-mail e senha</p>
                </v-row>
                <v-row no-gutters>
                    <v-text-field v-model="state.email" append-icon="mdi-email-outline" label="E-mail" outlined
                        class="login-input-style" @blur="v$.email.$touch"
                        :error-messages="v$.email.$error ? v$.email.$errors[0].$message:''">
                    </v-text-field>
                </v-row>
                <v-row no-gutters>
                    <v-text-field v-model="state.password" label="Senha" outlined
                        :style="{'font-size': passwordVisibility ? '22px':''}"
                        :type="passwordVisibility ? 'password' : 'text'"
                        :append-icon="passwordVisibility ? 'mdi-lock-off-outline' : 'mdi-lock-outline'"
                        @click:append="() => (passwordVisibility = !passwordVisibility)"
                        @blur="v$.password.$touch"
                        :error-messages="v$.password.$error ? v$.password.$errors[0].$message:''">
                    </v-text-field>
                </v-row>
                <v-row no-gutters>
                    <v-col align-self="end">
                        <a>Esqueci a senha</a>
                    </v-col>
                    <v-col align="end">
                        <v-btn 
                            @click="submit()" 
                            style="border-radius: 13px;" 
                            elevation="0" 
                            color="#2887DA" 
                            dark> Entrar
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters class="mt-5">
                    <v-divider></v-divider>
                </v-row>
                <v-row no-gutters justify="center" class="mt-10 mb-n5">
                    <p class="have-you-registered-text">É novo no Web Dança?</p>
                    <a @click="$router.push({name: 'Register'})" class="px-2">Cadastre-se</a>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useLoginStore } from '@/store/login';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, email } from '@vuelidate/validators';
import router from '@/router';
import api from '@/plugins/axios';

const loginStore = useLoginStore();
const passwordVisibility = ref('password');

const state = reactive({
    email: '',
    password: '',
    username: '',
});

const validations = {
    email: {
        required: helpers.withMessage('O E-mail é obrigatório', required),
        email: helpers.withMessage('E-mail inválido', email)
    },
    password: { required: helpers.withMessage('A senha é obrigatória', required) },
};
const v$ = useVuelidate(validations, state);

function submit() {
    v$.value.$touch();
    if (v$.value.$invalid) {
        return;
    }

    api.post('auth/authenticate', {}, {
        auth: {
            username: state.email,
            password: state.password
        }
    }).then((response) => {
        console.log('success', response);
    }).catch((error) => {
        console.log('error', error);
    })

    state.username = "Usuário Teste";
    loginStore.submitLogin(state);
    router.push({ name: 'Home' });
}

</script>   

<style lang="scss" scoped>
@import '@/assets/loginComponent.scss';
</style>