var moment = require('moment');

// Jan 1st 1970 00:00:00 am
// In javascript timestamps are stored in ms.

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

var date = new moment();
date.add(100, 'years').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));
var date = new moment();
console.log(date.format('h:mm a'));

var setTimestamp = moment().valueOf();
console.log(setTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));