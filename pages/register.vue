<template>
    <v-col class="fill-height pa-0">
        <v-row no-gutters class="logo">
            <img width="200" src="@/assets/Logo Horizontal.svg" />
        </v-row>
        <v-row no-gutters class="login-sheet" justify="center">
            <Register></Register>
        </v-row>
    </v-col>
</template>

<style lang="scss" scoped>
@import '@/assets/loginScreen.scss';

.teste {
    display: flex;
    align-content: center;
    justify-content: center;
}


*,
*::before,
*::after {
  position: relative;
}
</style>