const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

const myEmitter = new EventEmitter()

myEmitter.on('event', (arg) => {
  console.log(`Event: ${arg}`);
});

myEmitter.emit('event', 'Hello');
