/**
 * @param {{name: string, value: string}} token
 */
function stringify(token) {
	switch (token.name) {
		case "string": return token.value; break;
		// fallback
		default: return token.value.toString(); break;
	}
}

module.exports = exports = {
	stringify: stringify,
}
