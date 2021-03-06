'use strict';
const ansiEscapes = require('ansi-escapes');
const cliCursor = require('cli-cursor');

const main = stream => {
	let prevLineCount = 0;

	const render = function () {
		cliCursor.hide();
		const out = [].join.call(arguments, ' ') + '\n';
		stream.write(ansiEscapes.eraseLines(prevLineCount) + out);
		prevLineCount = out.split('\n').length;
	};

	render.clear = () => {
		stream.write(ansiEscapes.eraseLines(prevLineCount));
		prevLineCount = 0;
	};

	render.done = () => {
		prevLineCount = 0;
		cliCursor.show();
	};

	return render;
};

module.exports = main(process.stdout);
module.exports.stderr = main(process.stderr);
module.exports.create = main;
