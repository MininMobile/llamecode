const tokenize = require("./src/tokenizer");
const lex = require("./src/lexer");
const eval = require("./src/evaluator")

let src = `
let x = 5;
let y = 10;

log(x);
log(y);
log(x + y)
`;

console.log("\nINPUT");
console.log(src);

let tokens = tokenize(src);
console.log("\nTOKENS");
console.log(tokens);

let instructions = lex(tokens);
console.log("\nINSTRUCTIONS");
console.log(instructions);

console.log("\nOUTPUT");
eval(instructions);
