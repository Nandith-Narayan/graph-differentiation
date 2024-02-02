<script setup>
  import { parse } from '../../parser/expression.js'
  import { treeToLatex, computeDerivative, simplifyTree } from '../treeFunctions.js'
  import TreeDisplay from './TreeDisplay.vue';
  import { ref, watch } from 'vue'



  const raw_input = ref("8^2 + 4 + 8")
  const input_latex = ref("")
  const root_node = ref(null)
  const derivative_node = ref(null)

  try {
    root_node.value = parse(raw_input.value.replaceAll(' ', '').toLowerCase());
    // eslint-disable-next-line no-undef
    input_latex.value = katex.renderToString("\\color{white}\\frac{d}{dx}("+treeToLatex(root_node.value)+")", {
        throwOnError: false
    });
    derivative_node.value = simplifyTree(computeDerivative(root_node.value));
  } catch (error) { /* empty */ }
  
  
  watch(raw_input, async (new_value) => {
    try {
      root_node.value = parse(new_value.replaceAll(' ', '').toLowerCase());
      // eslint-disable-next-line no-undef
      input_latex.value = katex.renderToString("\\color{white}\\frac{d}{dx}("+treeToLatex(root_node.value)+")", {
          throwOnError: false
      });
      derivative_node.value = simplifyTree(computeDerivative(root_node.value));
    } catch (error) { /* empty */ }
  });
</script>

<template>
  <div id="input-container">
    <label for="raw-input">
    <input id="raw-input" type="text" v-model="raw_input"/>
  </label>
  </div>
  <div class="latex-container" v-html="input_latex">
  </div>
  <div id="display-container">
  <TreeDisplay :tree="root_node" name="input-function-graph"/>
  <TreeDisplay :tree="derivative_node" name="output-function-graph"/>
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
  #raw-input{
    background-color: transparent;
    border-color: transparent;
    color: var(--fg-color1);
    font-size: xx-large;
    text-align: center;
    width: 100vw;
    text-transform: lowercase;
  }
  #raw-input:focus{
    color: var(--fg-color2);
    outline: none;
  }
  .latex-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: x-large;
  }
  #display-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: x-large;
    gap: 0.25em;
    margin-top: 1em;
  }

</style>