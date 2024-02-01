<script setup>
  import { parse } from '../../parser/expression.js'
  import {treeToLatex} from '../treeFunctions.js'
  import { ref, watch } from 'vue'
  const raw_input = ref("8^2 + 4")
  const input_latex = ref("")
  try {
    const root_node = parse(raw_input.value.replaceAll(' ', ''));
    // eslint-disable-next-line no-undef
    input_latex.value = katex.renderToString("\\color{white}"+treeToLatex(root_node), {
        throwOnError: false
    });
  } catch (error) { /* empty */ }
  
  
  watch(raw_input, async (new_value) => {
    try {
      const root_node = parse(new_value.replaceAll(' ', ''));
      // eslint-disable-next-line no-undef
      input_latex.value = katex.renderToString("\\color{white}"+treeToLatex(root_node), {
          throwOnError: false
      });
    } catch (error) { /* empty */ }
  });
</script>

<template>
  <div id="input-container">
    <label for="raw_input">
    <input id="raw_input" type="text" v-model="raw_input"/>
  </label>
  </div>
  <div class="latex-container" v-html="input_latex">
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
    width: 100vw;
  }
  #raw_input:focus{
    color: var(--fg-color2);
    outline: none;
  }
  .latex-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: x-large;
  }

</style>