// pay form description
inputs = {
	'card': {
    label: 'Credit or Debit card',
    type: 'div',
    id: 'card-element',
		required: true
	},
	'error': {
    label: 'Card Error',
    type: 'div',
    id: 'card-errors',
    role: 'alert',
    required: true
	},
};

// Submit the form with the token ID.
function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
  
}

function OnCheckout(){
  alert('CHECKOUT DONE!!!');
}
function StartCheckout(){
  alert('SUBMIT CHECKOUT TOKENS');
  event.preventDefault();
  var params = 'session='+app.user.sessionID+'&tokens='+JSON.stringify(app.user.tokens);
  MAKE_REQUEST('post', 'command', params, null, OnCheckout);
}

function OnLogIn(){

}

if(app.user){
  var title = 'Contenu de votre panier';
  var inputs = {};
  for(var t in app.user.tokens){
    var id = app.user.tokens[t];
    if(id in inputs){
      inputs[id]['num'] += 1;
    }
    else{
      inputs[id] = new Object();
      inputs[id]['num'] = 1;
      var date = GetDataByKeyValue('spectacledate', 'id', id)
      var show = GetDataByKeyValue('spectacle', 'id', date['show_id'])
      inputs[id]['name'] = show['name'];
      inputs[id]['date'] = date['date'];
      inputs[id]['time'] = date['time'];
    }
   }

  alert(JSON.stringify(inputs));
  var panier = new Modal_t(title, JSON.stringify(inputs));
  panier.SetCallback(StartCheckout)
}
else{
  app.Message("NOT CONNECTED!");
}

/*
// Create a Stripe client.
var stripe = Stripe('pk_test_9mBt0DEzPCEuQpJTi2gusQGD002Ppma6Dd');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount(pay.inputs['card']);

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});
*/