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
  twitter_req(
    'statuses/user_timeline.json?screen_name=' + escape(user),
    function (data) {
      var twitter_list = document.createElement('ul');

      data = data.slice(0, 10);
      data.forEach(function (item) {

        var text = item.text;

        // For each entity type..
        var parts = [];
        twitter_entities.forEach(function (entity_type) {
          if (item.entities[entity_type[0]]) {
            // ...find all entities.
            item.entities[entity_type[0]].forEach(function (entity) {
              var i = entity.indices;
              parts.push({
                start: i[0],
                end: i[1],
                str: entity_type[1](entity, text.slice(i[0], i[1]))
              });
            });

          }
        });

        // Assemble parts into tweet.
        parts = sortByKey(parts, 'start');
        var final_str = '';
        var pos = 0;
        parts.forEach(function (part) {
          final_str += text.slice(pos, part.start);
          final_str += part.str;
          pos = part.end;
        });
        final_str += text.slice(pos);

        // Add data to HTML
        var li = document.createElement('li');
        twitter_list.appendChild(li);

        li.innerHTML = '<a href="http://twitter.com/'+item.user.screen_name+'/status/'+item.id_str+'" class="link" target="_blank"></a>' + final_str;
        li.setAttribute('data-type', item.type);

      });
      element.appendChild(twitter_list);
      var more = document.createElement('a');
      more.href = 'http://twitter.com/grit96';
      more.innerText = 'More...'
      more.target = '_blank';
      element.appendChild(more);
    });
}