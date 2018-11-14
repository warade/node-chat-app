var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {
	it('Should reject non-string values', () => {
		var str = 123;
		expect(isRealString(str)).toBe(false);
	});
	it('Should reject string with only spaces.', () => {
		var str = '    ';
		expect(isRealString(str)).toBe(false);
	});
	it('Should allow string with non-spaces characters.', () => {
		var str = 'abc';
		expect(isRealString(str)).toBe(true);
	});
});