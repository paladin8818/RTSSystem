var routeParseArray = {
    tr_num: "t_tr_num",
    depart_place: "t_depart_place",
    wagon_class: "t_wagon_class",
    depart_date: "t_depart_date",
    depart_time: "t_depart_time",
    arrival_date: "t_arrival_date",
    arrival_time: "t_arrival_time",
    wagon_num: "t_wagon_num",
    wagon_type: "t_wagon_type",
    arrival_place: "t_arrival_place"
};

var passengerParseNames = [
    "id",
    "doc_type",
    "fio",
    "sex",
    "date_birth",
    "place",
    "tier",
    "rate",
    "amount"
];

var totalAmountNode = document.getElementsByClassName('t_amount')[0];
var commissionField = document.getElementById('ClientFee');

var passengerTable = document.getElementsByClassName('t_pass_info')[0];
var passengerRows = passengerTable.getElementsByTagName('tr');

var logic = RTSSystemInit();
var topmargin = document.createElement('div');
topmargin.setAttribute('id', 'rtssystem-topmargin');
document.body.insertBefore(topmargin, document.body.firstChild);

var layout = document.createElement('div');
document.body.insertBefore(layout, document.body.firstChild);
logic.init(layout);

var sellButton = document.createElement('div');
sellButton.setAttribute('class', 'item');
sellButton.textContent = "Купить";
logic.addMenuItem(sellButton);
var store = storage().init(getCurrentSessionIndex());


var testButton = document.createElement('div');
testButton.setAttribute('class', 'item');
testButton.textContent = "Тест парсинга страницы";
testButton.onclick = function () {
    var route = routeParser(routeParseArray);
    var passenger = passengerParser(passengerRows, passengerParseNames);
    var totalAmount = totalAmountParser(totalAmountNode);

    var result = {
        route: route,
        passengers: passenger
    };
    
    var commission = calculateCommission(totalAmount);
    commissionField.value = Math.round(commission);
    var event = document.createEvent('KeyboardEvents');
    event.initKeyboardEvent(
        'keyup', //type
        true, //bubbles
        false, //cancelable
        window, //view
        '', //keyIdentifier
        0, //keyLocation
        false, //ctrlKey
        false, //altKey
        false, //shiftKey
        false, //metaKey
        false //altGraphKey
    );
    commissionField.dispatchEvent(event);
    
    
    result['key'] = getCurrentSessionIndex();
    result['phone'] = store.getAt("phone");
    result['full_amount'] = (parseFloat(totalAmount) + parseInt(commission));
    //alert(JSON.stringify(result));
    console.log(result);
    
    remoteRequest('https://localhost:4443', prepareToSend('sell_query', result), function (data) {
        alert(JSON.stringify(data));
    });
    
};
logic.addMenuItem(testButton);
