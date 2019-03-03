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
					case "keyword": case "string": case "expression": {
						tmp.push(token);
					} break;

					case "arglistbegin": {
						tid = "arglist";
					} break;

					case "endline": {
						if (tmp.length > 0) instructions.push(tmp);

						tmp = [];
					} break;
				}
			} break;

			case "arglist": {
				switch (token.name) {
					case "arglistend": {
						instructions.push(tmp);

						tid = "";
						tmp = [];
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
