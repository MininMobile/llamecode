/**
 * @param {{name: string, value: string}[]} tokens
 */
module.exports = exports = (tokens) => {
	let tmp = [];
	let tid = "";

	let instructions = [];
	tokens.forEach((token) => {
		switch (tid) {
			case "": {
				switch (token.name) {
					case "keyword": {
						tmp.push(token);
					} break;

					case "arglistbegin": {
						tid = "arglist";
					} break;

					case "endline": {
						tmp = [];
					} break;
				}
			} break;

			case "arglist": {
				switch (token.name) {
					case "arglistend": {
						instructions.push(tmp);
						tid = "";
					} break;

					default: {
						tmp.push(token);
					}
				}
			} break;
		}
	});

	return instructions;
}
