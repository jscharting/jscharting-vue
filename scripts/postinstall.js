/* eslint-disable no-console */
console.log('POST INSTALL');
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..', 'src/components');

function loadModule(name) {
	try {
		return require(name);
	} catch (e) {
		return undefined;
	}
}

const Vue = loadModule('vue');

if (!Vue || typeof Vue.version !== 'string') {
	console.warn(
		'[jscharting-vue] Vue is not found. Please run "npm install vue" to install.'
	);
} else if (Vue.version.startsWith('3.')) {
	// read files from component directory
	const files = fs.readdirSync(dir);
	files.forEach(file => {
		const readFile = fs.readFileSync(path.join(dir, file), 'utf8');

		// replace beforeDestroy lifecycle hook with beforeUnmount
		const newFile = readFile.replace(/beforeDestroy/g, 'beforeUnmount');
		fs.writeFileSync(path.join(dir, file), newFile, 'utf8');
	});
} else if (!Vue.version.startsWith('2.')) {
	console.warn(
		`[jscharting-vue] Vue version v${Vue.version} is not suppported.`
	);
}
