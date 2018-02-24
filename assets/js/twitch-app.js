var twitchStreams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function() {

  for (i = 0; i < twitchStreams.length; i++) {
    getChannelInfo(twitchStreams[i]);
  };

});

function getChannelInfo(channel) {
  var apiString = 'https://wind-bow.gomix.me/twitch-api/channels/';
  var callback = '?callback=?';

  $.ajax({
    method: "GET",
    dataType: "jsonp",
    url: apiString + channel + callback
  })
  .done(function(response) {
    updateChannel(response, null);
  });

  getStreamStatus(channel);

  setInterval(function() {
    getStreamStatus(channel);
  }, 30000);
}

function getStreamStatus(channel) {
  var apiString = 'https://wind-bow.gomix.me/twitch-api/streams/';
  var callback = '?callback=?';

  $.ajax({
    method: "GET",
    dataType: "jsonp",
    url: apiString + channel + callback
  })
  .done(function(response) {
    if (response.stream) {
      updateChannel(response.stream.channel, response.stream);
    }
  });
}

function updateChannel(channel, streamInfo) {
  // console.log(channel);
  // console.log(streamInfo);
  if (channel && document.getElementById(channel.name) == null) {
    $('#twitch-container').append([
      '<div id="' + channel.name + '" class="twitch-channel">',
      '<a id="' + channel.name +'-link" class="channel-link" href="' + channel.url + '" style="display: hidden;" target="_blank"></a>',
      '<div class="stream-indicator">',
      '<img src="' + channel.logo + '" class="twitch-logo" />',
      '</div>',
      '<div class="channel-info">',
      '<h1 class="channel-name">' + channel.display_name + '</h1>',
      '<h3 class="stream-status">offline</h3>',
      '</div>',
      '</div>'
    ].join(''))
  }

  if (streamInfo) {
    // $('#' + channel.name).css({'order': '1'});
    $('#' + channel.name + ' .stream-indicator')
      .addClass('online')
      .removeClass('offline');
    $('#' + channel.name + ' .stream-status')
      .text(channel.status)
      .css({'font-style': 'normal'});
  } else {
    // $('#' + channel.name).css({'order': '2'});
    $('#' + channel.name + ' .stream-indicator')
      .addClass('offline')
      .removeClass('online');
    $('#' + channel.name + ' .stream-status')
      .text('offline')
      .css({'font-style': 'italic'});
  }
}
