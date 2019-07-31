const fs = require("fs");

let files = process.argv.slice(2);

for (let i = 0; i < files.length; i++) {
	let file = files[i];

	fs.readFile(file, "utf-8", (e, data) => {
		if (e)
			return error(e);

		let prepped = preprocess(data);
		let tokens = tokenize(prepped);

		console.log(tokens);
	});
}

function preprocess(data) {
	let lines = data.split("\n");

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];

		if (line.trim()[0] == "#") {
			let statement = line.split(" ");

			switch (statement[0]) {
				case "#using": {
					let used = fs.readFileSync(statement[1], "utf-8");

					lines[i] = used;
				} break;

				default: {
					warn(`unknown preproccessor statement: '${statement[0]}'`);
				}
			}
		}
	}

	return lines.join("\n");
}

function tokenize(data) {
	let tokens = [];

	let temp = "";
	let mode = {
		string: false,
		escape: false,
	}

	for (let i = 0; i < data.length; i++) {
		let char = data[i];

		if (mode.string) {
			if (mode.escape) {
				let add = "\\" + char;

				switch (char) {
					case "n": add = "\n"; break;
					case "t": add = "\t"; break;
					case "\\": add = "\\"; break;
					case "\"": add = "\""; break;
				}

				temp += add;

				mode.escape = false;
			} else {
				if (char == "\"") {
					temp += char;
					mode.string = false;
				} else if (char == "\\") {
					mode.escape = true;
				} else {
					temp += char;
				}

			}
		} else if (/[a-zA-Z_]/.test(char)) {
			temp += char;
		} else if (/[{}\[\]\(\);]/.test(char)) {
			if (temp != "") {
				tokens.push(temp);
				temp = "";
			}

			tokens.push(char);
		} else if (char == "\"") {
			temp += char;
			mode.string = true;
		} else if (temp != "") {
			tokens.push(temp);
			temp = "";
		}
	}

	return tokens;
}

function warn(text) {
	console.warn("\x1b[33m[warn] \x1b[0m" + text);
}

function error(text) {
	console.error("\x1b[31m[err] \x1b[0m" + text);
}
