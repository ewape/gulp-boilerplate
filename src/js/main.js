(function() {

	var module = (function() {

		function init() {
			console.info('Module initialized.');
		}

		return {
			init: init
		};

	})();

	module.init();

})();