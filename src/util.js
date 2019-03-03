/**
 * @param {{name: string, value: string}} token
 * @param {{variables: {}}} scope
 */
function stringify(token, scope) {
	switch (token.name) {
		case "string": return token.value; break;
		
		case "expression": return eval(token.value).toString(); break;

		case "keyword": {
			if (scope.variables[token.value]) {
				return stringify(scope.variables[token.value]);
			}
		}

		// fallback
		default: return token.value.toString(); break;
	}
}

module.exports = exports = {
	stringify: stringify,
}
