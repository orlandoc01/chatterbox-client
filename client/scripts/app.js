// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() { 
  	var $friends = $('<div class="friends></div>');
  	$friends.html('Friend List');
  	$('.main').append($friends);
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
  },
  clearMessages: function() {
  	$('#chats').empty();
  },
  addMessage: function(message) {
  	var $message = $('<div class="message"></div>');
  	var $username = $('<span class="username"></span>');
  	$username.html(message.username);
  	$username.on('click', function() {
  		app.addFriend($(this));
  	});
  	var $messageContent = $('<span class="content"></span>');
  	$messageContent.html(message.text);
  	$message.append($username).append($messageContent);

  	$('#chats').prepend($message);
  },
  addRoom: function(room) {
  	var $room = $('<div class="room"</div>');
  	$room.html(room)
  	$('#roomSelect').prepend($room);
  },

  addFriend: function($username) {
  	console.log($username);
  	var $friendList = $('.friends');
  	var $newFriend = $('<div class="friend"></div>');

  }
};

 