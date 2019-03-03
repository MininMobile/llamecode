/**
 * @param {string} source
 */
module.exports = exports = (source) => {
	let src = source.replace(/\n/g, "");

	let tmp = "";
	let pid = "";
	let tid = "";

	let tokens = [];
	for (let i = 0; i < src.length; i++) {
		let char = src[i];
		let nchar = src[i + 1];

		switch (tid) {
			case "": {
				switch (char) {
					case "\"": {
						pid = tid;
						tid = "string";
						tmp = "";
					} break;

					case "0": case "1": case "2":
					case "3": case "4": case "5":
					case "6": case "7": case "8":
					case "9": case "-": case "+":
					case "/": case "*": {
						pid = tid;
						tid = "expression";
						tmp = char;
					} break;

					case " ": {
						if (tmp.length) tokens.push({
							name: "keyword",
							value: tmp,
						});

						tmp = "";
					} break;

					case "(": {
						if (tmp.length) tokens.push({
							name: "keyword",
							value: tmp,
						});

						tokens.push({
							name: "arglistbegin",
							value: "(",
						});

						pid = tid;
						tid = "arglist";
						tmp = "";
					} break;

					case ";": {
						if (tmp.length) tokens.push({
							name: "keyword",
							value: tmp,
						});

						tokens.push({
							name: "endline",
							value: ";",
						});

						tmp = "";
					} break;

					default: {
						tmp += char;
					}
				}
			} break;

			case "string": {
				switch (char) {
					case "\"": {
						tokens.push({
							name: "string",
							value: tmp,
						});

						tid = pid;
						tmp = "";
					} break;

					default: {
						tmp += char;
					}
				}
			} break;

			case "expression": {
				let valid = [
					"0", "1", "2",
					"3", "4", "5",
					"6", "7", "8",
					"9", "-", "+",
					"/", "*", ".",
					" "
				];

				switch (char) {
					case "0": case "1": case "2":
					case "3": case "4": case "5":
					case "6": case "7": case "8":
					case "9": case "-": case "+":
					case "/": case "*": case ".":
					case " ": {
						if (valid.includes(nchar)) {
							tmp += char;
							break;
						}
					}

					default: {
						if (valid.includes(char)) tmp += char;

						if (tmp.length) tokens.push({
							name: "expression",
							value: tmp,
						});

						tid = pid;
						pid = "expression";
						tmp = "";
					}
				}
			} break;

			case "arglist": {
				switch (char) {
					case "\"": {
						pid = tid;
						tid = "string";
						tmp = "";
					} break;

					case "0": case "1": case "2":
					case "3": case "4": case "5":
					case "6": case "7": case "8":
					case "9": case "-": case "+":
					case "/": case "*": {
						pid = tid;
						tid = "expression";
						tmp = char;
					} break;

					case " ": {
						if (tmp.length) tokens.push({
							name: "keyword",
							value: tmp,
						});

						tmp = "";
					} break;

					case ",": {
						if (tmp.length) tokens.push({
							name: "keyword",
							value: tmp,
						});

						tmp = "";
					} break;

					case ")": {
						if (tmp.length) tokens.push({
							name: "keyword",
							value: tmp,
						});

						tokens.push({
							name: "arglistend",
							value: ")",
						});

						pid = tid;
						tid = "";
						tmp = "";
					} break;

					default: {
						tmp += char;
					}
				}
			}
		}
	}

	return tokens
}
