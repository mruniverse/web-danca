<template>
    <v-row no-gutters justify="center" align="center">
        <v-col cols="auto">
            <v-btn icon @click="handleMinus">
                <v-icon>mdi-minus</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="3" class="mx-1">
            <v-text-field 
                :value="value"
                @input="handleChange" 
                outlined 
                type="number"
                :label="label" 
                hide-details>
            </v-text-field>
        </v-col>
        <v-col cols="auto">
            <v-btn @click="handlePlus" icon>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        label: String,
        value: Number
    },

    setup(props, { emit }) {
        const handleChange = (event) => {
            emit("customModel", event)
        }
        const handlePlus = () => {
            emit("plus")
        }
        const handleMinus = () => {
            emit("minus")
        }
        return {
            handleChange, handlePlus, handleMinus
        }
    }
}
</script>


<style lang="scss" scoped>
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

.error--text.v-text-field--outlined::v-deep(fieldset) {
    border: 2px solid #ff5252;
}
</style>