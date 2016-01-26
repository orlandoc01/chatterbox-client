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
  	$('#send').on('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();
      app.handleSubmit();
      $('#message').val("");
    });
    $('.refresh').on('click', app.fetch);

    $('.newRoom').hide();
    $('#roomSelect').change(function() {
      if($(this).val() === "Create New Room...") {
        $('.newRoom').slideDown();
      }
      else {
        $('.newRoom').hide();
      }
    });

    $('.newRoom > button').on('click', function() {
      var newRoom = $('.newRoom > input').val();
      app.addRoom(newRoom);
      $('.newRoom').slideUp();
      $('#roomSelect').val(newRoom);

    });

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

  fetch: function() {
  	//console.log("Fetch has been called to " + context.server);
    app.clearMessages();
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
    if(str === null) return "null";
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

 