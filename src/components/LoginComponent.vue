<template>
    <v-col>
        <v-sheet class="login-sheet-style d-flex align-center">
            <v-row no-gutters class="d-flex justify-center">
                <v-col cols="9">
                    <v-row no-gutters justify="start">
                        <p class="login-title-text">Entre com e-mail e senha</p>
                    </v-row>
                    <v-row no-gutters class="mb-n5">
                        <v-text-field 
                            v-model="v$.email.$model" 
                            append-icon="mdi-email-outline" 
                            label="E-mail" 
                            outlined
                            class="login-input-style"
                            :error-messages="emailErrors">
                        </v-text-field>
                    </v-row>
                    <v-row no-gutters>
                        <v-text-field 
                            v-model="v$.password.$model" 
                            label="Senha" 
                            outlined
                            :style="{'font-size': state.passwordVisibility ? '22px':''}"
                            :type="state.passwordVisibility ? 'password' : 'text'"
                            :append-icon="state.passwordVisibility ? 'mdi-lock-off-outline' : 'mdi-lock-outline'"
                            @click:append="() => (state.passwordVisibility = !state.passwordVisibility)"
                            :error-messages="passwordErrors">
                        </v-text-field>
                    </v-row>
                    <v-row no-gutters class="mt-n5">
                        <v-col align-self="end">
                            <a>Esqueci a senha</a>
                        </v-col>
                        <v-col align="end">
                            <v-btn style="border-radius: 13px;" elevation="0" color="#2887DA" dark> Entrar </v-btn>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-5">
                        <v-divider></v-divider>
                    </v-row>
                    <v-row no-gutters justify="center" class="mt-10 mb-n5">
                        <p class="have-you-registered-text">É novo no Web Dança?</p>
                        <a @click="loginStore.showRegister" class="px-2">Cadastre-se</a>
                    </v-row>
                </v-col>
            </v-row>
        </v-sheet>
    </v-col>
</template>

<script setup>
    import { computed, reactive } from 'vue';
    import { useLoginStore } from '../stores/loginStore';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email } from '@vuelidate/validators';

    const state = reactive({
        passwordVisibility:'password',
        email:'',
        password:'',
    });

    const validations = {
        email: { required, email },
        password: { required },
    };
    
    const loginStore = useLoginStore();
    const v$ = useVuelidate(validations, state);

    const emailErrors = computed(() => {
        const errors = [];
        if (!v$.value.email.$dirty) return errors
        v$.value.email.email.$invalid && errors.push('Must be valid e-mail')
        v$.value.email.required.$invalid && errors.push('E-mail is required')
        return errors
    });

    const passwordErrors = computed(() => {
        const errors = [];
        if (!v$.value.password.$dirty) return errors
        v$.value.password.required.$invalid && errors.push('Password is required')
        return errors
    });
</script>   

<style scoped>
@import '../assets/loginComponent.scss';
</style>