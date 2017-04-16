import { cookies } from './vendors/cookies.js';
import { menu } from './vendors/mobile-menu.js';
import 'parsleyjs';
import 'magnific-popup';

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

	cookies.init();
	menu.init();

})();