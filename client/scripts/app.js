// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() { 
  },
  send: function(message) {
    $.ajax({
      url: this.server,
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
  },
  fetch: function() {
  	$.ajax(this.server, {
      sucess: function(data) {
      	console.log("Message received was " + data);
      	return data;
      },
      error: function(data) {
      	console.error("Failure: message not received");
      }	
    });
  }
};

 