const tokenize = require("./src/tokenizer");
const lex = require("./src/lexer");

let src = `
log("Yee haw!");
log("Hot Diggity!");
`;

let tokens = tokenize(src);
console.log("\nTOKENS");
console.log(tokens);

let instructions = lex(tokens);
console.log("\nINSTRUCTIONS");
console.log(instructions);

console.log("\nOUTPUT");
