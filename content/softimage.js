//app.content.innerHTML = '<h1 style:"margin:auto";font-size:4em;color=white;text-align:center>ZOBI NIK VRAIMENT TOUT</h1>';

var row = document.createElement('div');
row.className = 'row';

var form = document.createElement('form');
form.classList.add('payment-form');
form.classList.add('col-lg-5');
form.classList.add('collapse');
form.id = 'payment-form';
form.action = '/payment.html';
form.method = 'post';

var amount = document.createElement('input');
amount.type = 'hidden';
amount.name = 'amount';
amount.value = '4200';

var currency = document.createElement('input');
currency.type = 'hidden';
currency.name = 'currency';
currency.value = 'EUR';

var description = document.createElement('input');
description.type = 'hidden';
description.name = 'description';
description.value = 'Easy Payments Guide!!!';

var card = document.createElement('div')
card.id = 'credit-card-fields'

var btn = document.createElement('button');
btn.classList.add('form-control');
btn.classList.add('btn')
btn.classList.add('btn-success') 
btn.classList.add('submit-button')
btn.type = 'submit'
btn.textContent = 'Get your "Easy Payments Guide" now for 42â‚¬'

form.appendChild(amount);
form.appendChild(currency);
form.appendChild(description);
row.appendChild(form);
app.content.elem.appendChild(row);