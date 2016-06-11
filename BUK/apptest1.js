var myexpressCN = require('express');
var app = myexpressCN();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/content.txt');
});
app.use('/ios',myexpressCN.static(__dirname + '/mobile'));

serv.listen(2000);