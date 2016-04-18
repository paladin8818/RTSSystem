var isUndefined = function (obj) {
    if(obj === "undefined" || obj === undefined) {
        return true;
    }
    return false;
};

var isNotUndefinedAndNull = function (obj) {
    if(obj === null) {
        return false;
    }
    if(isUndefined(obj)) {
        return false;
    }
    return true;
};

var isDOMElement = function (obj) {
    if(!isNotUndefinedAndNull(obj)) {
        return false;
    }
    return obj instanceof HTMLElement;
};

var getCurrentSessionIndex = function () {
    var fullpath = document.location.pathname;
    return  fullpath.split('/').pop();
};

var remoteRequest = function (url, params, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('post', url, true);
    xmlHttp.setRequestHeader("Content-Type",  "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            try {
                if(typeof callback === 'function') {                   
                    callback(JSON.parse(xmlHttp.responseText));
                    return ;
                }
                alert("Клиент получил ответ от сервера, однако не предоставлено ни одной функции-обработчика");
            }
            catch (e) { 
                alert("Ответ сервера не корректен.\n" + xmlHttp.responseText);
            }
        }
        if(xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
            alert("Сервер не доступен");
        }
    };
    xmlHttp.send(params);
};

var prepareToSend = function (prefix, parameters) {
    return prefix + "=" + encodeURIComponent(JSON.stringify(parameters));
};