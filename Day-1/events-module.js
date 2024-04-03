const EventEmitter = require("events");

const event = new EventEmitter();

const handlerFunction = () => {
  console.log("hello");
};

const byeEventhandlerFunction = () => {
  console.log("bye");
};

// create event
event.on("HelloEvent", handlerFunction);

// another event created
event.on("ByeEvent", byeEventhandlerFunction);

// emit (call) event
event.emit("HelloEvent");

// emitting second event

event.emit("ByeEvent")
