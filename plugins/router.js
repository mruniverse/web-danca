import { getCurrentInstance } from 'vue';

export const useRouter = () => {
  const vm = getCurrentInstance();
  return vm.proxy?.$router || undefined;
};

export const useRoute = () => {
  const vm = getCurrentInstance();
  return vm.proxy?.$route || undefined;
};
