const Listener = require("./index.js");
const listener = new Listener();

const test1Unsubscribe = listener.subscribe("test", val => {
	console.log("test1", val);
});

listener.subscribe("test", val => {
	console.log("test2", val);
});

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
