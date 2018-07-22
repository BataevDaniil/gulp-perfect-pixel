function insert(beginString, index, string) {
	if (index > 0)
		return beginString.substring(0, index) + string + beginString.substring(index, beginString.length);
	else
		return string + beginString;
};

function getStyleUser(style) {

	return `
		${style.positionRelative !== 'body' ? `left: ${style.left || 0}` : ''};
		top: ${style.top || 0};
		opacity: ${style.opacity || 1};
	`;
}
function generateId() {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return `_${Math.random().toString(36).substr(2, 9)}`;
};

module.exports = {
	insert,
	getStyleUser,
	generateId,
};
