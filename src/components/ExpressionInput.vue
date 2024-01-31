<script setup>
import { ref } from 'vue'
const raw_input = ref("x^2 + 4")
</script>

<template>
  <div id="input-container">
    <label for="raw_input">
    <input id="raw_input" type="text" :value="raw_input"/>
  </label>
  </div>
</template>

<style scoped>
  #input-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  label{
    padding: 5em;
    display: block;
    /*border-width: 1px;
    border-style: solid;*/ 
  }
  #raw_input{
    background-color: transparent;
    border-color: transparent;
    color: var(--fg-color1);
    font-size: xx-large;
    text-align: center;
  }
  #raw_input:focus{
    color: var(--fg-color2);
    outline: none;
  }

</style>