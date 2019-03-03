const util = require("./util");

/**
 * @param {{name: string, value: string}[][]} instructions
 */
module.exports = exports = (instructions) => {
	let scope = {
		variables: {},
	}

	instructions.forEach((tokens) => {
		switch (tokens[0].name) {
			case "keyword": {
				switch (tokens[0].value) {
					case "let": {
						switch (tokens[2].value) {
							case "=": {
								scope.variables[tokens[1].value] = tokens[3];
							} break;

							default: {
								// throw "invalid operation"
							}
						}
					} break;

					case "log": {
						tokens.shift();

						let strings = [];

						tokens.forEach((token) => {
							strings.push(util.stringify(token, scope));
						});

						console.log(strings.join(""));
					} break;

					default: {
						// check for function
							// if defined, run with args
						// else
							// if not defined, throw "undefined function"
					}
				}
			} break;

			default: {
				// throw "unexpected token"
			}
		}
	});
}
