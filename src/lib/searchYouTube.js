var searchYouTube = (options, callback) => {
  $.ajax({
    type: 'GET',
    url: `https://www.googleapis.com/youtube/v3/search?key=${options.key}&type=video&part=snippet&q=${options.query}&maxResults=${options.max}`,
    success: function(data) {
      data = data.items;
      return callback(data);
    }
  });
};

window.searchYouTube = searchYouTube;
