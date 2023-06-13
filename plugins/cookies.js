import { getCurrentInstance } from 'vue';

export const useCookies = () => {
  const vm = getCurrentInstance();
  return vm.proxy?.$cookies || undefined;
};
