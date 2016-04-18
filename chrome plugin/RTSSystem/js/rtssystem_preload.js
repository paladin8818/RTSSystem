/*
 * Скрипт отрабатывает на странице заполнения данных.
 * Назначение: поместить объект в localstorage с идентификатором сессии,
 * записать в созданный объект номер телефона 
 */

//Получить элемент для ввода телефона
var phoneField = document.getElementById('Phone');

//Создаем localstorage элемент к ключем, являющимся id сессии 
var store = storage().init(getCurrentSessionIndex());

//Обработка события потери фокуса на поле для ввода телефона
//Каждый раз, когда происходит событие,
//получаем значение поля и сохраняем в элемент localstorage с id сессии
phoneField.onblur = function () {
    store.insert({phone: phoneField.value});
};