
export function treeToLatex(node){
    
    let type = node.type;
    
    
    if(type==='add'){
        let left = node.left;
        let right = node.right;
        return "{"+treeToLatex(left) +"} + {"+ treeToLatex(right)+"}"; 
    }
    if(type==='sub'){
        let left = node.left;
        let right = node.right;
        return "{"+treeToLatex(left) +"} - {"+ treeToLatex(right)+"}"; 
    }
    if(type==='multiply'){
        let left = node.left;
        let right = node.right;
        return "{"+treeToLatex(left) +"} * {"+ treeToLatex(right)+"}";        
    }
    if(type==='divide'){
        let left = node.left;
        let right = node.right;
        return "\\frac{"+treeToLatex(left) +"}{"+ treeToLatex(right)+"}"; 
    }
    if(type==='power'){
        let left = node.left;
        let right = node.right;
        return "{"+treeToLatex(left) +"} ^ {"+ treeToLatex(right)+"}"; 
    }
    if(type==='number'){
        return node.value.toString(); 
    }
    if(type==='letter'){
        return node.value.toString(); 
    }
}