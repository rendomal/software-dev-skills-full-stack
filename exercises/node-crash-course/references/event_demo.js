const EventEmitter = require('events');

// Create class
class MyEmitter extends EventEmitter { }

// Init object
const myEmitter = new MyEmitter();

// Event listener
myEmitter.on('event123', () => console.log('Event fired'));

// Init event
myEmitter.emit('event123');
myEmitter.emit('event123');