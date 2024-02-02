
export function treeToLatex(node){
    
    let type = node.type;
    
    
    if(type==='add'){
        let left = node.left;
        let right = node.right;
        return "{"+addParens(type, left.type, treeToLatex(left)) +"} + {"+ addParens(type, right.type, treeToLatex(right))+"}"; 
    }
    if(type==='sub'){
        let left = node.left;
        let right = node.right;
        return "{"+addParens(type, left.type, treeToLatex(left)) +"} - {"+ addParens(type, right.type, treeToLatex(right))+"}"; 
    }
    if(type==='multiply'){
        let left = node.left;
        let right = node.right;
        return "{"+addParens(type, left.type, treeToLatex(left)) +"} * {"+ addParens(type, right.type, treeToLatex(right))+"}";        
    }
    if(type==='divide'){
        let left = node.left;
        let right = node.right;
        return "\\frac{"+treeToLatex(left) +"}{"+ treeToLatex(right)+"}"; 
    }
    if(type==='power'){
        let left = node.left;
        let right = node.right;
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