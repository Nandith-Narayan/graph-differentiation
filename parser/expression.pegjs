{{
    function binaryOp(op, left, right){
        return {
            type: op,
            left: left,
            right: right
        };
    }
}}

start
  = expression

expression
    = additive

additive
    = left:multiplicative "+" right:additive { return binaryOp("add", left, right); }
    / multiplicative

multiplicative
    = left:primary "*" right:multiplicative { return binaryOp("multiply", left, right); }
    / primary

primary
    = integer
    / "(" additive:additive ")" { return additive; }

integer "simple number"
    = digits:[0-9]+ { return parseInt(digits.join(""), 10); }