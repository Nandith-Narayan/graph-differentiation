
export function treeToLatex(node){
    
    let type = node.type;
    let left = node.left;
    let right = node.right;
    
    if(type==='add'){
        return "{"+addParens(type, left.type, treeToLatex(left)) +"} + {"+ addParens(type, right.type, treeToLatex(right))+"}"; 
    }
    if(type==='sub'){
        return "{"+addParens(type, left.type, treeToLatex(left)) +"} - {"+ addParens(type, right.type, treeToLatex(right))+"}"; 
    }
    if(type==='multiply'){
        return "{"+addParens(type, left.type, treeToLatex(left)) +"} * {"+ addParens(type, right.type, treeToLatex(right))+"}";        
    }
    if(type==='divide'){
        return "\\frac{"+treeToLatex(left) +"}{"+ treeToLatex(right)+"}"; 
    }
    if(type==='power'){
        return "{"+addParens(type, left.type, treeToLatex(left)) +"} ^ {"+ treeToLatex(right)+"}"; 
    }
    if(type==='number'){
        return node.value.toString(); 
    }
    if(type==='letter'){
        return node.value.toString(); 
    }
    if(type==='constant'){
        return node.value.toString(); 
    }
}

const PRIORITY = {"add":0, "sub":0, "multiply":2, "divide":2, "power":4, "number":100, "letter":100, "constant":100}

function addParens(parent, child, val){
    if(PRIORITY[parent] > PRIORITY[child]){
        return "("+val+")";
    }
    return val;
}

function copyTree(node){
    let type = node.type;
    let left = node.left;
    let right = node.right;
    let new_node = {type:type}
    if(left != undefined){
        new_node.left = copyTree(left);
    }
    if(right != undefined){
        new_node.right = copyTree(right);
    }
    if(node.value != undefined){
        new_node.value = node.value;
    }
    return new_node;
}

export function computeDerivative(node){
    return copyTree(node)
}