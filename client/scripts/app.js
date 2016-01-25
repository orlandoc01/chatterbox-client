// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() { 
  	console.log("init called");
  	var $main = $('.main');

  	var $spinnerDiv = $('<div class="spinner"></div>');
  	// var $spinnerImg = $('<img src="client/images/spiffygif_46x46.gif">');
  	// $spinnerDiv.append($spinnerImg);
  	$main.append($spinnerDiv);

  	var $roomDiv = $('<div id="rooms"></div>');
  	$roomDiv.html("Room: ");
  	var $roomSelect = $('<select id="roomSelect"></select>');
  	$roomDiv.append($roomSelect);
  	$main.append($roomDiv);

  	var $friends = $('<div class="friends></div>');
  	$friends.html('Friend List');
  	$main.append($friends);

  	var $form = $('<form action="#" id="send" method="post"></form>');
  	var $formMessage = $('<input type="text" name="message" id="message" />');
  	var $formSubmit = $('<input type="submit" name="submit" class="submit" />');
  	$form.append($formMessage).append($formSubmit);
  	$main.append($form);

  	var $chats = $('<div id="chats"></div>');
  	$main.append($chats);

  	$('#send .submit').on('submit', app.handleSubmit);
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
  	var $friendList = $('.friends');
  	var $newFriend = $('<div class="friend"></div>');

  },

  handleSubmit: function() {
  	var message = $('#message').val();
  	var username = 'orlandoc'
  	var room = 'test1'

  	var messageObj = {
  		username: username,
  		text: message,
  		roomname: room
  	};
  	app.send(messageObj);

  }
};

 