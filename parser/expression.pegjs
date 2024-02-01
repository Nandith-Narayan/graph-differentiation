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
    = add

add
    = left:subtract "+" right:add { return binaryOp("add", left, right); }
    / subtract

subtract
    = left:multiply "-" right:subtract { return binaryOp("sub", left, right); }
    / multiply

multiply
    = left:divide "*" right:multiply { return binaryOp("multiply", left, right); }
    / divide

divide
    = left:power "/" right:divide { return binaryOp("divide", left, right); }
    / power

power
    = left:primary "^" right:power { return binaryOp("power", left, right); }
    / primary


primary
    = number
    / constant
    / "(" expression:expression ")" { return expression; }

number
    = integer

integer "simple number"
    = digits:[0-9]+ { return {type: "number", value:parseInt(digits.join(""), 10)}; }

constant
    = letter:[a-z] { return {type: "letter", value:letter}; }