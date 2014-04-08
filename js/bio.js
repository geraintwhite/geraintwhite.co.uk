var p = document.createElement('p')
var h1 = document.getElementsByTagName('h1')[0]
makeRequest(
    'http://node.dvbris.com/twitter?api_url=' +
        encodeURIComponent('https://api.twitter.com/1.1/users/show.json?screen_name=grit96'),
    function (data) {
        var description = JSON.parse(data).description
        p.innerText = description
    }
)
addAfter(h1, p)
