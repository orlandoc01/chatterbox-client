// YOUR CODE HERE:
var exampleMessage = {
  username: 'orlandoc',
  text: 'Test Message',
  roomname: 'lobby'
};

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  messages: [],
  init: function() { 
  	console.log("init called");
  	// var $main = $('#main');

  	// var $spinnerDiv = $('<div class="spinner"></div>');
  	// // var $spinnerImg = $('<img src="client/images/spiffygif_46x46.gif">');
  	// // $spinnerDiv.append($spinnerImg);
  	// $main.append($spinnerDiv);

  	// var $roomDiv = $('<div id="rooms"></div>');
  	// $roomDiv.html("Room: ");
  	// var $roomSelect = $('<select id="roomSelect"></select>');
  	// $roomDiv.append($roomSelect);
  	// $main.append($roomDiv);

  	// var $friends = $('<div class="friends></div>');
  	// $friends.html('Friend List');
  	// $main.append($friends);

  	// var $form = $('<form action="#" id="send" method="post"></form>');
  	// var $formMessage = $('<input type="text" name="message" id="message" />');
  	// var $formSubmit = $('<input type="submit" name="submit" class="submit" />');
  	// $form.append($formMessage).append($formSubmit);
  	// $main.append($form);

  	// var $chats = $('<div id="chats"></div>');
  	// $main.append($chats);
    app.addRoom("4Chan");
  	$('#send .submit').on('submit', app.handleSubmit);
    $('.refresh').on('click', app.fetch);
  },
  send: function(message) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/JSON',
      success: function(data) {
        console.log("Message sent to chatterbox");
      },
      error: function(data) {
        console.error("Failure: Message not sent.");
      }
    });

    //app.fetch();

   
  },


  fetch: function() {
  	var context = this;
  	//console.log("Fetch has been called to " + context.server);
  	
  	$.ajax('https://api.parse.com/1/classes/chatterbox', {
      success: function(data) {
      	context.messages = data.results;
        console.log(context.messages);
        data.results.forEach( function(messageObj) {
          if(messageObj['username'] === 'orlandoc') {
            console.log(messageObj);
          }
        });
        data.results.forEach( function(messageObj) {
          app.addMessage(messageObj);
        });
      },
      error: function(data) {
      	console.error("Failure: message not received");
      }
    });
  	//console.log(result1);
    //context.messages = result1.responseJSON.results;
    //console.log(context.messages);
  },


  clearMessages: function() {
  	$('#chats').empty();
  },
  addMessage: function(message) {
  	var $message = $('<p class="message"></p>');
  	var $username = $('<a class="username"></a>');
  	$username.html("Created by " + app.escape(message.username)
                  + " in " + app.escape(message.roomname) + ": ");
  	$username.on('click', function() {
  		app.addFriend($(this));
  	});
  	var $messageContent = $('<span class="content"></span>');
  	$messageContent.html(app.escape(message.text));
  	$message.append($username).append($messageContent);

    // var $roomName = $('<p class="roomMessage"></p>');
    // $roomName.html(app.escape(message.roomname));
    // $messageContent.append($roomName);

  	$('#chats').prepend($message);
  },
  addRoom: function(room) {
  	var $room = $('<option class="room"></option>');
  	$room.html(room);
  	$('#roomSelect').append($room);
  },

  addFriend: function($username) {
  	var $friendList = $('.friends');
  	var $newFriend = $('<div class="friend"></div>');

  },

  handleSubmit: function() {
  	var message = $('#message').val();
  	var username = 'orlandoc';
  	var room = 'test1';

  	var messageObj = {
  		username: username,
  		text: message,
  		roomname: room
  	};
  	app.send(messageObj);

  },
  escape: function(str) {
    if(str === undefined) return "undefined";
    str = str.split("");
    var finalStr = str.map( function(char1) {
      if( char1 === "&") return "&amp";
      else if(char1 === "<") return "&lt";
      else if(char1 === ">") return "&gt";
      else if(char1 === '"') return "&quot";
      else if(char1 === "'") return "&#x27";
      else if(char1 === "/") return "&$x2F";
      else return char1;
    });
    return finalStr.join("");
  }
};

 