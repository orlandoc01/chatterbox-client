// YOUR CODE HERE:
var exampleMessage = {
  username: 'orlandoc',
  text: 'Test Message',
  roomname: 'lobby'
};

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  data: {},
  messages: [],
  updatedMessages: [],
  rooms: {},
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
  	$('#send').on('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();
      app.handleSubmit();
      $('#message').val("");
    });
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
  },

  // update: function() {
  //   console.log("Update called");
  //   $.ajax({
  //     url: 'https://api.parse.com/1/classes/chatterbox',
  //     type: 'PUT',
  //     data: '{"results":{"__op":"AddUnique", "objects":'
  //       + JSON.stringify(data.results) + '}}',
  //     contentType: 'application/JSON',
  //     sucess: function(data) {
  //       console.log("Messages were updatd");
  //       app.updatedMessages = data.results;

  //     },
  //     error: function(data) {
  //       console.error("Failure: messages weren't updated");
  //     }
  //   });
  // },


  fetch: function() {
  	//console.log("Fetch has been called to " + context.server);
  	$.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: "GET",
      data: {order: "-createdAt"},
      success: function(data) {
        app.data = data;
      	app.messages = data.results;
        data.results.forEach( function(messageObj) {
          app.addMessage(messageObj);
          var roomname = app.escape(messageObj.roomname);
          if(roomname) {
            app.rooms[roomname] = roomname;
          }
        });

        _.each(app.rooms, function(key, value) {
          app.addRoom(key);
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
  	var username = 'Orlando';
  	var room = $('#roomSelect').val();

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

 