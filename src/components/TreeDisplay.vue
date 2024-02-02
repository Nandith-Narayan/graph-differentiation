<script setup>
  import { onMounted, ref } from 'vue';
  const props = defineProps(['tree', 'name'])
  
  let canvas = ref(null);
  let ctx = ref(null);
  const RADIUS = 10;
  const TREE_NODE_X_OFFSET = 100;
  const TREE_NODE_Y_OFFSET = 40;
  const TREE_NODE_X_OFFSET_PER_LEVEL = 15;
  const CENTER_FORCE_COEFF = 0.5;
  const MOUSE_FORCE_COEFF = 50000.0;
  const DAMPING_COEFF = 0.99;

  const NODE_TYPE_COLOR = {"multiply":"red", "add":"darkorange", "sub":"orange", "divide":"yellow", "power":"blue", "number":"green", "constant":"green", "letter":"purple"}
  const NODE_TYPE_SYMBOL = {"multiply":"*", "add":"+", "sub":"-", "divide":"÷", "power":"^"}

  let node_data = ref({});
  let mx = 0;
  let my = 0;
  let bt = performance.now();
  onMounted(() => {
    canvas.value = document.getElementById(props.name);
    ctx.value = canvas.value.getContext("2d");
    ctx.value.font = "bold 20px Courier New";
    ctx.value.lineWidth = 2;
    draw()
  })
  function updateNodeData(dt) {
    Object.keys(node_data.value).forEach((val) => {
      const node = node_data.value[val];
      let f_center = CENTER_FORCE_COEFF * (Math.pow(node.x-node.initial_x, 2)+Math.pow(node.y-node.initial_y, 2));
      let c_theta = Math.atan2(node.initial_y-node.y, node.initial_x-node.x);
      let f_mouse = -MOUSE_FORCE_COEFF / Math.max(Math.pow(node.x-mx, 2)+Math.pow(node.y-my, 2), 5);
      let m_theta = Math.atan2(my-node.y, mx-node.x);
      let fx = f_center*Math.cos(c_theta) + f_mouse*Math.cos(m_theta);
      let fy = f_center*Math.sin(c_theta) + f_mouse*Math.sin(m_theta)
      node.x += node.vx*dt + 0.5*fx*dt*dt;
      node.y += node.vy*dt + 0.5*fy*dt*dt;
      node.vx += fx*dt;
      node.vy += fy*dt;
      node.vx *= DAMPING_COEFF
      node.vy *=DAMPING_COEFF

    });
  }

  function draw() {
    const dt = Math.min(performance.now() - bt, 5000.0);
    bt = performance.now();
    //try{
    updateNodeData(dt/1000.0);
    //}catch(e){console.log(e);}

    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.value.beginPath();
    drawNode(props.tree, 0, 0)
    ctx.value.stroke();
    ctx.value.fillText(Math.round(1000/dt)+"fps", 0, 20)

    window.requestAnimationFrame(draw);
  }

  function drawNode(node, level, id){
    if(!node_data.value[id]){
      let x = 250;
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
      node_data.value[id] = {x:x, y:y, initial_x:x, initial_y:y, vx:(Math.random()-0.5)*150.0, vy:(Math.random()-0.5)*150.0,  level:level, id:id}
    }
    

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

    ctx.value.fillStyle = NODE_TYPE_COLOR[node.type]
    ctx.value.beginPath();
    ctx.value.arc(node_data.value[id].x, node_data.value[id].y, RADIUS, 0, 2*Math.PI, false);
    ctx.value.fill();
    ctx.value.stroke();
    ctx.value.fillStyle = "#000000"
    if(node.type==="number" || node.type==="letter" || node.type==="constant"){
      if(node.value.toString().length > 2){
        ctx.value.fillText("c", node_data.value[id].x-5, node_data.value[id].y+6);
      }else{
        let value = node.value;
        if(node.value ==="pi"){
          value = "π";
        }
        ctx.value.fillText(value, node_data.value[id].x-(5*value.toString().length), node_data.value[id].y+6);
      }
    }else{
      ctx.value.fillText(NODE_TYPE_SYMBOL[node.type], node_data.value[id].x-6, node_data.value[id].y+5);
    }

  }

  function getMousePos(e) {
    const rect = canvas.value.getBoundingClientRect();

    mx = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.value.width,
    my = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.value.height

}
</script>

<template>
  <div class="graph-container" >
    <canvas :id="props.name" width="500" height="500" @mousemove="getMousePos"></canvas>
  </div>
</template>

<style scoped>
  .graph-container{
    padding: 0.25em;
    border-radius: 1em;
    background-color: var(--bg-color2);
    border-style: solid;
    border-color: #000000;
    border-width: 3px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

</style>