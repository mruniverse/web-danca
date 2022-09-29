<script setup>
import { useLoginStore } from '../../store/loginStore';
const loginStore = useLoginStore();
</script>
        
<template>
    <v-sheet class="login-sheet-style d-flex align-center">
        <v-row no-gutters class="d-flex justify-center">
            <v-col cols="9">
                <v-row no-gutters justify="start">
                    <p class="login-title-text">Cadastre-se</p>
                </v-row>
                <v-row no-gutters>
                    <v-text-field 
                        append-icon="mdi-account-outline" 
                        label="Seu nome" 
                        outlined>
                    </v-text-field>
                </v-row>
                <v-row no-gutters>
                    <v-text-field 
                        append-icon="mdi-email-outline" 
                        label="Seu e-mail" 
                        outlined>
                    </v-text-field>
                </v-row>
                <v-row no-gutters>
                    <v-checkbox>
                        <template v-slot:label>
                            <div>Li e aceito os <a @click.stop href="https://google.com">termos e condições</a> de uso.
                            </div>
                        </template>
                    </v-checkbox>
                </v-row>
                <v-row no-gutters class="mt-10">
                    <v-col align-self="end">
                        <a @click="$router.go(-1)">Voltar</a>
                    </v-col>
                    <v-col align="end">
                        <v-btn style="border-radius: 13px;" elevation="0" color="#2887DA" dark> Registrar-se </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
</template>
    
<style lang="scss" scoped>
@import '@/assets/loginComponent.scss';
</style>