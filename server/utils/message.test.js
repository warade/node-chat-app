var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate the correct message object.', () => {
		var from = 'Aarti';
		var text = 'Hello there';
		var message = generateMessage(from, text); 
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, text});
	});
});

describe('generateLocationMessage', () => {
	it('Should give correct coordinates', () => {
		var from = 'Admin';
		var latitude = 22.9734229;
		var longitude = 78.6568942;
		var message = generateLocationMessage(from, latitude, longitude);
		expect(message.createdAt).toBeA('number');
		expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
	});
});