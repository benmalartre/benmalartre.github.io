var content = app.content;
app.content.elem.innerHTML = '';
var elem = document.createElement('div');

elem.className = 'calendar';
elem.name = 'calendar';
elem.id = 'calendar';
elem.style.position = 'relative';
elem.style.width = '100%';
elem.style.height = '100%';

app.content.Mount(elem);

var calendar = new Calendar_t(elem);
var startDay = new Date("2019-10-05");
var endDay = new Date("2019-10-13");

var startHour = new Date();
startHour.setHours(10,00,00,00);
var endHour = new Date();
endHour.setHours(22,00,00,00);
calendar.load(startDay, endDay, startHour, endHour);


