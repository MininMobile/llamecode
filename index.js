const tokenize = require("./src/tokenizer");
const lex = require("./src/lexer");
const eval = require("./src/evaluator")

let src = `
log("Yee haw!");
log("Hello, ", "World!");
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
