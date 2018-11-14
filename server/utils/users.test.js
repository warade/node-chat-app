var expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: 1,
			name: 'Anshul',
			room: 'Node'
		}, {
			id: 2,
			name: 'Aarti',
			room: 'Node'
		}, {
			id: 3,
			name: 'Payal',
			room: 'PHP'
		}];
	});
	it('Should add a new user', () => {
		var users = new Users();
		var user = {
			id: 123,
			name: 'Anshul',
			room: 'Office'
		};
		var resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});
	it('Should return names for node course', () => {
		var userList = users.getUserList('Node');
		expect(userList).toEqual(['Anshul', 'Aarti']);
	});
	it('Should return names for PHP course', () => {
		var userList = users.getUserList('PHP');
		expect(userList).toEqual(['Payal']);
	});
	it('Should find a user of id 1', () => {
		var user = users.getUser(1);
		expect(user).toEqual({
			id: 1,
			name: 'Anshul',
			room: 'Node'
		});
	});
	it('Should not find a user with id 4', () => {
		var user = users.getUser(4);
		expect(user).toNotExist();
	});
	it('Should remove user with id 1', () => {
		var user = users.removeUser(1);
		expect(user).toExist();
		expect(users.users.length).toBe(2);
	});
	it('Should not remove user with id 4', () => {
		user = users.removeUser(4);
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});
});