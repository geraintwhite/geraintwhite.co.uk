function twitter_req (api, cb) {
  makeRequest(
    'https://node.dvbris.com/twitter?api_url=' +
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
