var h4 = document.createElement('h4')
var h1 = name.bio.getElementsByTagName('h1')[0]
makeRequest(
    'http://node.dvbris.com/twitter?api_url=' +
        encodeURIComponent('https://api.twitter.com/1.1/users/show.json?screen_name=grit96'),
    function (data) {
        var description = JSON.parse(data).description
        h1.innerText = description
    }
)
addAfter(h4, h1)
