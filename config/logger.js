const logger = (level) => {
	// eslint-disable-next-line no-console
	return console[level];
};

module.exports = {
	info: logger('info'),
	error: logger('error'),
	warn: logger('warn'),
};
