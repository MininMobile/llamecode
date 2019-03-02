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

		switch (tid) {
			case "": {
				switch (char) {
					case "\"": {
						pid = tid;
						tid = "string";
						tmp = "";
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

			case "arglist": {
				switch (char) {
					case "\"": {
						pid = tid;
						tid = "string";
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
