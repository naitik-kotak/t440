const checkPaypal = document.querySelector('#paypal');
const checkCredit = document.querySelector('#credit');
const payNow = document.querySelector('#pay-now-btn');
let generalTickets = document.querySelector('#general');
let seniorTickets = document.querySelector('#senior-students');
const showMessage = document.querySelector('#validate-message');
let showingPaypal = 0;
let paypalEmail = document.querySelector('#paypal-email');
let paypalPassword = document.querySelector('#paypal-password');
let ccNumber = document.querySelector('#cc-number');
let cvv = document.querySelector('#cvv');
const paypalErrorMsg = document.querySelector('#paypal-error-message');
const creditErrorMsg = document.querySelector('#credit-error-message');
let numberOfGeneral = document.querySelector('#general-admit');
let numberOfSenior = document.querySelector('#senior-admit');
const generalTicketsTotal = document.querySelector('#general-ticket-total');
const seniorTicketsTotal = document.querySelector('#senior-ticket-total');
const subtotal = document.querySelector('#subtotal');
const tax = document.querySelector('#tax');
const total = document.querySelector('#total');
let allGenTickets;
let allSeniorTickets;

console.log(numberOfGeneral.innerText);

// show and hide paypal input fields
const showPaypal = () => {
  console.log('pppp');
  document.querySelector('#show-paypal-fields').style.display = 'block';
  document.querySelector('#show-credit-fields').style.display = 'none';
  showingPaypal = 1;
};

// show and hide credit input fields
const showCredit = () => {
  console.log('ccc');
  document.querySelector('#show-credit-fields').style.display = 'block';
  document.querySelector('#show-paypal-fields').style.display = 'none';
  showingPaypal = 0;
};

const validatefields = () => {
  showMessage.innerHTML = '';
  let passTicket = false;
  let passPayment = false;
  // check for number of tickets === 0
  if (
    parseInt(generalTickets.value) === 0 &&
    parseInt(seniorTickets.value) === 0
  ) {
    console.log('in');
    showMessage.innerHTML = 'Tickets quantites cannot be 0. Please add tickets';
  } else {
    passTicket = true;
  }

  // validating paypal fields and credit card fields

  if (showingPaypal === 1) {
    if (paypalEmail.value === '' && paypalPassword.value === '') {
      console.log('empty paypal');
      paypalErrorMsg.innerHTML = 'Paypal email or password cannot be empty';
    } else {
      console.log('paypal pass');
      passPayment = true;
    }
  } else {
    // showingPaypal = 0;
    if (ccNumber.value === '' && cvv.value === '') {
      console.log('empty credit');
      creditErrorMsg.innerHTML = 'Credit Card Number or cvv cannot be empty';
    } else if (
      typeof ccNumber.value === 'string' &&
      typeof cvv.value === 'string'
    ) {
      const changedNum = parseInt(ccNumber.value);
      const changedCvv = parseInt(cvv.value);

      if (isNaN(changedNum)) {
        creditErrorMsg.innerHTML = '';
        creditErrorMsg.innerHTML = 'Invalid input for credit card number.';
        console.log('nan');
      } else if (isNaN(changedCvv)) {
        creditErrorMsg.innerHTML = '';
        creditErrorMsg.innerHTML = 'Invalid input for cvv.';
      } else {
        console.log('im where you want');
        // creditErrorMsg.innerHTML = '';
        // console.log(changedNum);
        if (ccNumber.value.length != 16 || cvv.value.length != 3) {
          creditErrorMsg.innerHTML = '';
          creditErrorMsg.innerHTML =
            'Credit Card Number should be 16 digits and cvv should be 3 digits';
        }
        if (ccNumber.value.length === 16 && cvv.value.length === 3) {
          console.log('perfect 16');
          creditErrorMsg.innerHTML = '';
          passPayment = true;
        }
      }
    }
    // else if (ccNumber.value.length != 16 && cvv.value.number != 3) {
    //   creditErrorMsg.innerHTML = '';
    //   creditErrorMsg.innerHTML =
    //     'Credit Card Number should be 16 digits and cvv should be 3 digits';
    // } else if (ccNumber.value.length === 16) {
    //   creditErrorMsg.innerHTML = '';
    //   console.log('perfect 16');
    // }
  }

  console.log(passPayment);
  console.log(passTicket);

  if (passPayment === true && passTicket === true) {
    console.log('b4');
    alert('Sucessfully booked tickets');
    console.log('after');
    generalTickets.value = 0;
    seniorTickets.value = 0;
    paypalEmail.value = '';
    paypalPassword.value = '';
    ccNumber.value = '';
    cvv.value = '';
    calculateOrderSummary();
  }
};

const numberOfGeneralSelected = (e) => {
  console.log(e.target.value);
  allGenTickets = e.target.value;
  numberOfGeneral.innerText = allGenTickets;
  calculateOrderSummary();
};

const numberOfSeniorSelected = (e) => {
  console.log(e.target.value);
  allSeniorTickets = e.target.value;
  numberOfSenior.innerText = allSeniorTickets;
  calculateOrderSummary();
};

const calculateOrderSummary = () => {
  if (allGenTickets === undefined ) {
    allGenTickets = '0';
  }
  if (allSeniorTickets === undefined) {
    allSeniorTickets = '0';
  }

  const generalTicketsPrice = parseInt(allGenTickets) * 5;
  const seniorTicketsPrice = parseInt(allSeniorTickets) * 3;
  generalTicketsTotal.innerText = generalTicketsPrice.toString();
  seniorTicketsTotal.innerText = seniorTicketsPrice.toString();

  const subtotalValue = generalTicketsPrice + seniorTicketsPrice;
  console.log(subtotalValue);
  subtotal.innerText = subtotalValue.toString();

  const taxValue = subtotalValue * 0.13;
  tax.innerText = taxValue.toString();

  const totalAmount = subtotalValue + taxValue;
  total.innerText = totalAmount.toString();
};

generalTickets.addEventListener('click', numberOfGeneralSelected);
seniorTickets.addEventListener('click', numberOfSeniorSelected);

checkPaypal.addEventListener('click', showPaypal);
checkCredit.addEventListener('click', showCredit);
payNow.addEventListener('click', validatefields);
