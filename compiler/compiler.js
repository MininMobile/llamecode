const fs = require("fs");

let files = process.argv.slice(2);

for (let i = 0; i < files.length; i++) {
	let file = files[i];

	fs.readFile(file, "utf-8", (e, data) => {
		if (e)
			return error(e);

		let prepped = preprocess(data);

		console.log(prepped);
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

function warn(text) {
	console.warn("\x1b[33m[warn] \x1b[0m" + text);
}

function error(text) {
	console.error("\x1b[31m[err] \x1b[0m" + text);
}
