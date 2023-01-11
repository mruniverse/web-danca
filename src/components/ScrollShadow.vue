<template>
  <v-row no-gutters @scroll.passive="updateShadow" class="my-2 mr-n2 mb-4 overflow-x">
    <div :style="styles.shadowLeft" class="shadow shadow--left"></div>
    <div :style="styles.shadowRight" class="shadow shadow--right"></div>
    <slot />
  </v-row>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  setup() {
    const shadows = reactive({
      left: 0,
      right: 0,
      opacityLeft: 0,
      opacityRight: 1
    });
    const styles = computed(() => {
      return {
        shadowLeft: { left: `${shadows.left}px`, opacity: shadows.opacityLeft },
        shadowRight: { right: `${shadows.right}px`, opacity: shadows.opacityRight }
      }
    });

    function updateShadow(event) {
      let scrollPosition = event.target.scrollLeft;
      let scrollPercentage = event.target.scrollLeft / (event.target.scrollWidth - event.target.clientWidth);

      shadows.right = 0 - scrollPosition;
      shadows.left = 0 + scrollPosition;
      shadows.opacityRight = 1 - scrollPercentage;
      shadows.opacityLeft = scrollPercentage;
    };

    return { shadows, styles, updateShadow }
  }
}
</script>

<style lang="scss" scoped>
.shadow {
  position: absolute;
  top: 0;
  z-index: 100;
  height: 100%;
  width: 50px;
  background: red;
}

.shadow--left {
  background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.9), transparent);
}

.shadow--right {
  background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent);
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.9), transparent);
}

.overflow-x {
  flex-flow: row;
  overflow-x: auto;
  border-radius: 4px;
}
</style>
