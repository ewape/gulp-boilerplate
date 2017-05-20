(() => {

	"use strict";

	const app = {};

	app.colorModule = (() => {

		const generateColor = () => {
			const color = `#${ Math.random().toString(16).slice(2, 8) }`;
			console.log(`%c ${color}`, 'color: ' + color);
			return color;
		};

		const updateColorVar = () => document.body.style.setProperty('--color-var', generateColor());
		const init = () => updateColorVar();

		return {
			init
		};

	})();

	app.colorModule.init();

})();
