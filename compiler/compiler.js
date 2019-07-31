const fs = require("fs");

let files = process.argv.splice(0, 2);

for (let i = 0; i < files.length; i++) {
	let file = files[i];

	fs.readFile(file, "utf-8", (e, data) => {
		if (e)
			return console.error(e);
	});
}
