// YOUR CODE HERE:

var example = {
  username: "anonymous",
  text: "testing123 testing123",
  roomname: "lobby",
  likes: ['orlando']

};
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  messages: [],
  rooms: {},
  friends: {},
  processID: null,

  init: function() { 
    $('.spinner').hide();

  	$('#send').on('submit', function(event) {
      $('.spinner').fadeIn('fast');
      event.preventDefault();
      event.stopPropagation();
      app.handleSubmit();
      $('#message').val("");
    });

    $('.newRoom').hide();
    $('#roomSelect').change(function() {
      if($(this).val() === "Create New Room...") {
        $('.newRoom').slideDown();
      }
      else {
        $('.newRoom').hide();
        app.clearMessages();
      }
    });

    $('.newRoom > button').on('click', function() {
      var newRoom = $('.newRoom > input').val();
      app.addRoom(newRoom);
      $('.newRoom').slideUp();
      $('#roomSelect').val(newRoom);

    });

    app.fetch();

  },

  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/JSON',
      success: function(data) {
        console.log("Message sent to chatterbox");
        $('.spinner').fadeOut('fast');
      },
      error: function(data) {
        console.error("Failure: Message not sent.");
      }
    });   
  },

  fetch: function() {
    var roomOption = $('#roomSelect').val();
    var completeURL = app.server + "?order=-createdAt";
    if(roomOption !== "All" && roomOption !== "Create New Room...") completeURL = completeURL + "&where%5Broomname%5D=" + roomOption;
  	$.ajax({
      url: completeURL,
      type: "GET",
      contentType: 'application/JSON',
      success: function(data) {
        app.data = data;
      	app.messages = data.results;

        data.results.forEach( function(messageObj) {
          var roomname = app.escape(messageObj.roomname);
          if(roomname !== undefined && !(roomname in app.rooms)) {
            app.rooms[roomname] = roomname;
            app.addRoom(roomname);
          }
        });

        var messagesD3 = d3.select('#chats').selectAll('.message')
          .data(app.messages, function(d) {
            return d.objectId;
          });

          messagesD3.enter()
          .insert(function(message) {
            return app.createMessage(message);
          }, ":first-child")
          .attr("top", -60)
          .style("opacity", 1e-6)
          .transition('linear')
          .duration(1000)
          .attr("top", 0)
          .style("opacity", 1);

          messagesD3.exit()
          .transition('linear')
          .duration(1000)
          .style("opacity", 1e-6)
          .remove();

          setTimeout(app.fetch, 1000);
      },
      error: function(data) {
      	console.error("Failure: message not received");
      }
    });
  },

  clearMessages: function() {
  	$('#chats').empty();
  },

  createMessage: function(message) {
  	var $message = $('<div class="message"></div>');
  	var $username = $('<span class="username"></span>');
  	$username.html('Created by <a href="#" class="handle">' + app.escape(message.username)
      + "</a> in " + app.escape(message.roomname) + ": ");
  	$username.on('click', function() {
  		app.addFriend($(this));
  	});
  	var $messageContent = $('<span class="content"></span>');
  	$messageContent.html(app.escape(message.text));
  	$message.append($username).append($messageContent);
    return $message[0];
  },

  addRoom: function(room) {
  	var $room = $('<option class="room"></option>');
  	$room.html(room);
  	$('#roomSelect').append($room);
  },

  addFriend: function($username) {
    var initialString = $username.html();
    var regexHandle = new RegExp('<a href="#" class="handle">(.*)</a>');
    var searchString = initialString.match(regexHandle);
    if(!(searchString[1] in app.friends)) {

      var $friendList = $('.friends');
      var $newFriend = $('<div class="friend"></div>');
      $newFriend.html('<a href="#">' + searchString[1] + '</a>');
      app.friends[searchString[1]] = searchString[1];
      $newFriend.on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).toggleClass('selected');
        $('a.handle').each( function(index, element) {
          if($(element).html() == searchString[1]) {
            $(element).toggleClass('selected');
          }
        });

      });
      $newFriend.hide();
      $friendList.append($newFriend);
      $newFriend.slideDown(400, 'swing');
    }
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
      else if(char1 === "") return '""';
      else return char1;
    });
    return finalStr.join("");
  },


};

 