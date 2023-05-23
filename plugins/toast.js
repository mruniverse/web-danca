import { getCurrentInstance } from 'vue';

export const useToast = () => {
  const vm = getCurrentInstance();
  return vm.proxy?.$toast || undefined;
};
