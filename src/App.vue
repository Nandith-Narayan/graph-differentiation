<script setup>
import ExpressionInput from './components/ExpressionInput.vue';
</script>

<template>
  <div class="latex-container"> <h1>⚠️Work In Progress⚠️</h1></div>
  <ExpressionInput />
</template>

<style>
body{
  --bg-color1: #0F0F0F;
  --bg-color2: #232D3F;
  --fg-color1: #005B41;
  --fg-color2: #008170;
  background-color: var(--bg-color1);
}
h1{
  color:white;
  padding:0;
  margin: 0;
}

.latex-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>