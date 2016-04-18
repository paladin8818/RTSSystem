var storage = function () {
    var self = this;
    self.localStorage = localStorage;
    self.storage = {};

    if(!isNotUndefinedAndNull(self.localStorage.getItem('RTSSystem'))) {
        self.localStorage.setItem('RTSSystem', JSON.stringify(self.storage));
    }
    else {
        self.storage = JSON.parse(self.localStorage.getItem('RTSSystem'));
    }
    var init = function (id) {
        if(!isNotUndefinedAndNull(id)) {
            throw new Error("Ключ не обявлен.");
        }
        if(!isNotUndefinedAndNull(self.storage[id])) {
            self.storage[id] = {};
        }
        return {
            insert: function (obj) {
                if(!isNotUndefinedAndNull(obj)) {
                    throw new Error("Объект не обявлен.");
                }
                for(var k in obj) {
                    self.storage[id][k] = obj[k];
                }
                save();
            },
            getAt: function (key) {
                if(!isNotUndefinedAndNull(key)) {
                    throw new Error("Ключ не обявлен.");
                }
                if(!isNotUndefinedAndNull(self.storage[id][key])) {
                    throw new Error("Сессия не обявлена.");
                }
                return self.storage[id][key];
            },
            removeAt: function (key) {
                if(!isNotUndefinedAndNull(key)) {
                    throw new Error("Ключ не обявлен.");
                }
                removeIn(key, self.storage[this.__id]);
                save();
            }
        };
    };

    var save = function () {
        self.localStorage.setItem('RTSSystem', JSON.stringify(self.storage));
    };
    
    var removeAt = function (key) {
        if(!isNotUndefinedAndNull(key)) {
            throw new Error("Ключ не обявлен.");
        }
        removeIn(key, self.storage);
        save();
    };
    
    var removeIn = function (key, obj) {
        if(!isNotUndefinedAndNull(obj[key])) {
            throw new Error("Ключа не существует.");
        }
        delete obj[key];        
    };
    
    return {
        init: init,
        removeAt: removeAt
    };
    
};