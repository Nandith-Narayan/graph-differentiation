<script setup>
  import { onMounted, ref } from 'vue';
  const props = defineProps(['tree'])
  
  let canvas = ref(null);
  let ctx = ref(null);
  const RADIUS = 10;
  const TREE_NODE_X_OFFSET = 80;
  const TREE_NODE_Y_OFFSET = 50;
  const TREE_NODE_X_OFFSET_PER_LEVEL = 15;

  let node_data = ref({});

  onMounted(() => {
    canvas.value = document.getElementById("input-function-graph");
    ctx.value = canvas.value.getContext("2d");
    draw()
  })

  function draw() {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.value.beginPath();
    drawNode(props.tree, 0, 0)
    ctx.value.stroke();
    window.requestAnimationFrame(draw)
  }

  function drawNode(node, level, id){
    if(!node_data.value[id]){
      let x = 200;
      let y = 50 + TREE_NODE_Y_OFFSET*level
      let j = id;
      for(let i=level;j > 0; j=Math.floor(j/2)){
        if(j % 2==0){
          x += TREE_NODE_X_OFFSET - TREE_NODE_X_OFFSET_PER_LEVEL*i;
          j -= 2;
        }else{
          x -= TREE_NODE_X_OFFSET - TREE_NODE_X_OFFSET_PER_LEVEL*i;
          j -= 1;
        }
        i-=1
      }
      node_data.value[id] = {x:x, y:y, level:level, id:id}
    }

    ctx.value.beginPath();
    ctx.value.moveTo(node_data.value[id].x, node_data.value[id].y);
    ctx.value.arc(node_data.value[id].x, node_data.value[id].y, RADIUS, 0, 2*Math.PI, false);
    ctx.value.fill();
    ctx.value.stroke();

    
    
    if(node.left){
      if(node_data.value[id*2+1]){
        ctx.value.beginPath();
        ctx.value.moveTo(node_data.value[id].x, node_data.value[id].y);
        ctx.value.lineTo(node_data.value[id*2+1].x, node_data.value[id*2+1].y);
        ctx.value.stroke();
      }
      drawNode(node.left, level+1, id*2+1);
    }
    if(node.right){
      if(node_data.value[id*2+2]){
        ctx.value.beginPath();
        ctx.value.moveTo(node_data.value[id].x, node_data.value[id].y);
        ctx.value.lineTo(node_data.value[id*2+2].x, node_data.value[id*2+2].y);
        ctx.value.stroke();
      }
      drawNode(node.right, level+1, id*2+2);
    }
  }
</script>

<template>
  <div class="graph-container">
    <canvas id="input-function-graph" width="500" height="500"></canvas>
  </div>
</template>

<style scoped>


</style>