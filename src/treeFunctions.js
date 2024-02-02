
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

export function copyTree(node){
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
    let type = node.type;
    let left = node.left;
    let right = node.right;

    let new_node = {};
    if(type==='add'){
        new_node.type = 'add';
        new_node.left = computeDerivative(left);
        new_node.right = computeDerivative(right)
        return new_node; 
    }
    if(type==='sub'){
        new_node.type = 'sub';
        new_node.left = computeDerivative(left);
        new_node.right = computeDerivative(right)
        return new_node; 
    }
    if(type==='multiply'){
        new_node ={type:'add',
            left:{type:'multiply', 
                left:computeDerivative(left),
                right:copyTree(right)},
            right: {type:'multiply',
                left:copyTree(left),
                right:computeDerivative(right)}
            };
        return new_node; 
    }
    if(type==='divide'){
        new_node = {type: 'divide',
            left:{type:'sub',
                left:{type:'multiply', 
                    left:computeDerivative(left),
                    right:copyTree(right)},
                right: {type:'multiply',
                    left:copyTree(left),
                    right:computeDerivative(right)}
                },
            right:{type:'power',
                left:copyTree(right),
                right:{type:'number', value:'2'}
                }
            };
        return new_node; 
    }
    if(type==='power'){
        let base = simplifyTree(left);
        let exponent = simplifyTree(right);
        if((base.type === 'constant' || base.type === 'number') && (exponent.type === 'constant' || exponent.type === 'number')){
            new_node = {type:'number', value: '0'};
            return new_node;
        }
        /*if(base.type === 'constant' || base.type === 'number'){

        }*/
        // TODO: implement power and exponent rules
        return copyTree(node);
    }

    if(type==='constant' || type==='number'){
        new_node.type = 'number'
        new_node.value = '0';
        return new_node; 
    }

    
}

export function simplifyTree(node){
    let type = node.type;
    if(type==='add'){
        let left = simplifyTree(node.left);
        let right = simplifyTree(node.right);
        if(left.type === 'number' && right.type === 'number'){
            return {type: 'number', value: (parseInt(left.value)+parseInt(right.value)).toString()};
        }
        if(left.type === 'number' && left.value.toString() === '0'){
            return right;
        }
        if(right.type === 'number' && right.value.toString() === '0'){
            return left;
        }
        
        return {type: 'add', left:left, right:right};
        
    }
    if(type==='sub'){
        let left = simplifyTree(node.left);
        let right = simplifyTree(node.right);
        if(left.type === 'number' && right.type === 'number'){
            return {type: 'number', value: (parseInt(left.value)-parseInt(right.value)).toString()};
        }
        else if(left.type === 'number' && left.value.toString() === '0'){
            return right;
        }else if(right.type === 'number' && right.value.toString() === '0'){
            return left;
        }
        else{
            return {type: 'sub', left:left, right:right};
        }
    }
    if(type==='multiply'){
        let left = simplifyTree(node.left);
        let right = simplifyTree(node.right);
        if(left.type === 'number' && right.type === 'number'){
            return {type: 'number', value: (parseInt(left.value)*parseInt(right.value)).toString()};
        }
        else if(left.type === 'number' && left.value.toString() === '0'){
            return {type: 'number', value: '0'};
        }else if(right.type === 'number' && right.value.toString() === '0'){
            return {type: 'number', value: '0'};
        }
        else{
            return {type: 'multiply', left:left, right:right};
        }
    }
    if(type==='divide'){
        let numerator = simplifyTree(node.left);
        let denominator = simplifyTree(node.right);
        if(numerator.type === 'number' && denominator.type === 'number'){
            return {type: 'divide',
                left: numerator,
                right: denominator
            };
        }
        else if(numerator.type === 'number' && numerator.value.toString() === '0'){
            return {type: 'number', value: '0'};
        }else if(denominator.type === 'number' && denominator.value.toString() === '0'){
            return {type: 'number', value: 'Er'};
        }
        else{
            return {type: 'divide',
                left: numerator,
                right: denominator
            };
        }
    }

    return copyTree(node);

}