const path = require('path');
const express = require('express');
publicPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

// app.get('/', (req, res) => {
// 	res.render('index.html');
// });

app.listen(port, () => {
	console.log(`running on port ${port}`);
});