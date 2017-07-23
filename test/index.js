const Listener = require("../index.js");
const listener = new Listener();

const su = function(val) {
	console.log("test3", val)
}

const test1Unsubscribe = listener.subscribe("test", su);

const test2Unsubscribe = listener.subscribe("test", su);

listener.subscribe("changed", val => {
	console.log("changed", val);
});

listener.emit("test", "frist one");
listener.emit("test", "before");

test1Unsubscribe();

listener.emit("test", "after");
listener.emit("changed", "after");

listener.unsubscribe("test");
listener.unsubscribe("changed");
