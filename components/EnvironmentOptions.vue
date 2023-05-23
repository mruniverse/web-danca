<template>
  <div class="text-center">
    <v-menu offset-y nudge-left="105" content-class="menu-style">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="defaultBtn"
          v-bind="attrs"
          v-on="on"
          class="btn-larger subtitle-2 font-weight-bold"
        >
          <v-icon color="primary">mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link>
          <EnvironmentTypes></EnvironmentTypes>
        </v-list-item>
        <v-list-item link>
          <EnvironmentFeatures></EnvironmentFeatures>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "EnvironmentOptions",
};
</script>

<style lang="scss" scoped>
.menu-style {
  margin-top: 4px;
  border-radius: 10px 0 10px 10px;
  box-shadow: 0px 4px 4px 4px var(--vt-c-shadows-1);
}
</style>
