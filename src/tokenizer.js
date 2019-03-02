/**
 * @param {string} source
 */
module.exports = exports = (source) => {
	let src = source.replace(/\n/g, "");

	let tmp = "";
	let tid = "";

	let tokens = [];
	for (let i = 0; i < src.length; i++) {
		let char = src[i];

		switch (tid) {
			case "": {
				switch (char) {
					case "\"": {
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

						tid = "";
						tmp = "";
					} break;

					default: {
						tmp += char;
					}
				}
			} break;
		}
	}

	return tokens
}
