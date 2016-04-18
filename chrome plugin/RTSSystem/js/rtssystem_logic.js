var amountPercent = 15;

var RTSSystemInit = function () {
    return (function () {
        return RTSSystemLogic();
    })();
};

var RTSSystemLogic = function () {
    var self = this;
    this.baseLayout = document.body;
    this.menu = null;
    
    var init = function (parent_container) {
        if(isNotUndefinedAndNull(parent_container)) {
            self.baseLayout = parent_container;
        }
        self.baseLayout.setAttribute('id', 'rtssystem-basecontainer');
        initMenu();
    };
    
    var initMenu = function () {
        self.menu = document.createElement('div');
        this.baseLayout.appendChild(self.menu);
        self.menu.setAttribute('class', 'menu');
    };
    
    var addMenuItem = function (item) {
        if(isDOMElement(item)) {
            self.menu.appendChild(item);
        }
    };
    
    return {
        init: init,
        addMenuItem: addMenuItem
    };
};

var routeParser = function (dict) {
    var result = {};
    for(var k in dict) {
        var item = document.getElementsByClassName(dict[k])[0];
        result[k] = item.textContent;
    }
    return result;
};

var passengerParser = function (rows, rules) {
    var result = [];
    for(var i = 1, k = rows.length; i < k; i++) {
        var columsn = rows[i].getElementsByTagName('td');
        var currentPassenger = {};
        for(var j = 0, l = columsn.length; j < l; j++) {
            currentPassenger[rules[j]] = getText(columsn[j]);
        }
        currentPassenger['amount'] = parseFloat(currentPassenger['amount']);
        result.push(currentPassenger);
    }
    return result;
};

var totalAmountParser = function (node) {
    var total_amount = node.textContent.match(/\d+,\d+/g)[0];
    return parseFloat(total_amount.replace(',', '.'));
};

var getText = function (node) {
    var basetext = node.textContent;
    return  basetext.replace(/(^\s*)|(\s*)$/g, '');
};

var calculateCommission = function (amount) {
    return Math.round((parseFloat(amount)/100)*amountPercent);
};