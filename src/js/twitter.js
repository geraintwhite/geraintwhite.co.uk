function twitter_req (api, cb) {
  makeRequest(
    'http://node.dvbris.com/twitter?api_url=' +
      encodeURIComponent('https://api.twitter.com/1.1/' + api),
    function (text) {
      var data = JSON.parse(text);
      cb(data);
    });
}

function twitter_tagline (user, element) {
  twitter_req(
    'users/show.json?screen_name=' + escape(user),
    function (data) {
      var p = document.createElement('p');
      p.innerText = data.description;
      element.appendChild(p);
    });
}

var twitter_entities = [
  ['media', function (entity, text) {
    return '<div class="img-container"><div><a href="'+entity.expanded_url+'" target="_blank"><img src="'+entity.media_url+':medium" title="'+entity.display_url+'"></a></div></div>';
  }],
  ['urls', function (entity, text) {
    return '<a href="'+entity.expanded_url+'" title="'+entity.display_url+'" target="_blank">'+entity.display_url+'</a>';
  }],
  ['user_mentions', function (entity, text) {
    return '<a href="http://twitter.com/'+entity.screen_name+'" title="'+entity.name+'" target="_blank">'+text+'</a>';
  }],
  ['hashtags', function (entity, text) {
    return '<a href="http://twitter.com/search?src=hash&q='+escape(entity.text)+'" title="#'+entity.text+'" target="_blank">'+text+'</a>';
  }]
]

function twitter_widget (user, element) {
  twitterFetcher.fetch(
    '465424040786546688', // ID
    '',                   // DOM element
    10,                   // Number of tweets
    true,                 // Hyperlink URLs
    true,                 // User photo/name
    true,                 // Timestamp
    '',                   // Custom timestamp
    true,                 // Retweets
    function (tweets) {
      var twitter_list = document.createElement('ul');
      for (i in tweets) {
        var li = document.createElement('li');
        li.innerHTML = tweets[i];
        twitter_list.appendChild(li);
      }
      element.appendChild(twitter_list)
      var more = document.createElement('a');
      more.href = 'http://twitter.com/'+user;
      more.innerText = 'More...'
      more.target = '_blank';
      element.appendChild(more);
    },                    // Callback
    true                  // Action links
  );
}
