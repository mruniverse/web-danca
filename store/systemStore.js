import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('systemStore', () =>{
  var menuBar = ref(true);

  function toggleMenuBar(){
    menuBar.value = !menuBar.value;
  }

  function setMenuBar(value){
    menuBar.value = value;
  }

  return { menuBar, toggleMenuBar }
})
