const fs = require("fs");

let files = process.argv.slice(2);

for (let i = 0; i < files.length; i++) {
	let file = files[i];

	fs.readFile(file, "utf-8", (e, data) => {
		if (e)
			return error(e);

		let prepped = preprocess(data);
		let tokens = tokenize(prepped);
		let operations = scan(tokens);

		console.log(operations);
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
		} else if (/[a-zA-Z0-9_]/.test(char)) {
			temp += char;
		} else if (/[{}\[\]\(\);,.]/.test(char)) {
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

function scan(tokens) {
	let operations = [];

	// loop through tokens
		// detect keywords
		// flip switches in temp operation object
		// if not recognized set as name
		// if not recognized and name is set, throw

	let op = {
		name: undefined,   // name of operation
		type: undefined,   // (return) type of variable or function
		arguments: [],     // arguments passable to the function
		actions: [],       // calls inside of the function
		methods: [],       // methods inside a class or stuct
		fields: [],        // fields inside a class or struct
		visibility: 1,     // 0: private, 1: public
		function: false,   // is operation a function
		class: false,      // is operation a class
		struct: false,     // is operation a struct
		variable: false,   // is operation a variable
		expression: false, // is operation an expression
	}

	for (let i = 0; i < tokens.length; i++) {
		let token = tokens[i];

		switch (token) {
			case "int": op.type = "int"; break;

			default: {
				if (op.name) {
					error(`unknown token: '${token}'`);
				} else {
					op.name = token;
				}
			}
		}
	}

	return operations;
}

function warn(text) {
	console.warn("\x1b[33m[warn] \x1b[0m" + text);
}

function error(text) {
	console.error("\x1b[31m[err] \x1b[0m" + text);
	console.log("aborting process with non-zero exit code");
	process.exit(1);
}
