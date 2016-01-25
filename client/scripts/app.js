// YOUR CODE HERE:

var app = {};

app.init = function() {

}

app.send = function(message) {
	$.ajax({
		 url: 'https://api.parse.com/1/classes/chatterbox',
		 type: 'POST',
		 data: JSON.stringify(message),
		 contentType: 'application/JSON',
		 sucess: function(data) {
		 	console.log("Message sent to chatterbox")
		 },
		 error: function(data) {
		 	console.error("Failure: Message not sent.")
		 }
	});

}