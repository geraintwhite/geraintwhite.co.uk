function addAfter(elem, add) {
    if (elem.nextSibling) {
        elem.parentNode.insertBefore(add, elem.nextSibling)
    } else {
        elem.parentNode.appendChild(add)
    }
}

function makeRequest(url, cb) {
    var httpRequest
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest()
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP")
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP")
            }
            catch (e) {}
        }
    }
    if (!httpRequest) {
        console.log('Giving up :( Cannot create an XMLHTTP instance')
        return false
    }
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                cb(httpRequest.responseText)
            } else {
                console.log('There was a problem with the request.')
            }
        }
    }
    httpRequest.open('GET', url)
    httpRequest.send()
}