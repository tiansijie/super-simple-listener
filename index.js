"use strict";
module.exports = class Listener {
	constructor() {
		this.subscriptions = {}
	}

	subscribe(name, func) {
		if (typeof func !== "function") {
			return new Error("Second args must be a function");
		}

		if (!this.subscriptions[name]) {
			this.subscriptions[name] = [];
		}

		const cloneFunc = function(val) {
			return func(val);
		};

		this.subscriptions[name].push(cloneFunc);

		return function unsubscribe() {
			const index = this.subscriptions[name].indexOf(cloneFunc);
			if (index !== -1) {
				this.subscriptions[name].splice(index, 1);
			}
		}.bind(this);
	}

	emit(name, value) {
		const functions = this.subscriptions[name];
		if (functions && functions.length) {
			functions.forEach(func => func(value));
		}
	}

	unsubscribe(name) {
		delete this.subscriptions[name];
	}
}
