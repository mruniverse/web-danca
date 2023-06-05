import { getCurrentInstance } from 'vue';

export const useAxios = () => {
  const vm = getCurrentInstance();
  return vm.proxy?.$axios || undefined;
};
