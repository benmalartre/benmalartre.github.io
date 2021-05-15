
var donateButton = document.createElement('button');
donateButton.textContent = 'DONATE';
donateButton.style.width = '512px';
donateButton.style.height = '64px';
donateButton.style.margin = 'auto';
donateButton.style.backgroundColor = 'yellow';
app.content.elem.innerHTML = '';
app.content.elem.appendChild(donateButton);
var methodData = [{
  supportedMethods: ['basic-card', 'visa', 'mastercard', 'amex'],
  data: {
    supportedNetworks: ['visa', 'mastercard', 'amex']
  }
}];

var details = {total: {label: 'Test payment', amount: {currency: 'GBP', value: '1.00'}}};


function processPaymentDetails(uiResult) {
  return new Promise(function (resolve) {
    setTimeout(function() {
      resolve(uiResult);
    }, 2000);
  });
}

function showSuccess() {
  alert("PAY SUCCESS");
}

function showError() {
  alert("PAY ERROR")
}

function onDonateButtonClick() {
    /*
  // Initialise the PaymentRequest with our configuration
  // We could also pass in additional options as a 3rd parameter here, such as:
  // {requestShipping: true, requestPayerEmail: true, requestPayerPhone: true};
  var paymentRequest = new PaymentRequest(methodData, details);

  // Show the native UI
  paymentRequest.show()
    .then(function(uiResult) {
      processPaymentDetails(uiResult)
        .then(function(uiResult) {
          uiResult.complete('success');
          showSuccess();
        });
    })
    .catch(function(error) {
      console.warn('Unable to complete purchase', error);
      // D'oh. Inform the user the purchase could not be completed...
      showError();
    });
    */
}

donateButton.addEventListener('click', onDonateButtonClick);