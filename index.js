const tokenize = require("./src/tokenizer");
const eval = require("./src/evaluator");

let src = `
log "Yee haw!"
log "Hot Diggity!"
`;

let tokens = tokenize(src);
console.log(tokens);

eval(tokens);
