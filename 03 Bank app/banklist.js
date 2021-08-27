"use-strict";

///////////////////////////////////////////////////
//Data
const account1 = {
  owner: "Jon White",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-07-19T17:01:17.194Z",
    "2021-07-19T23:36:17.929Z",
    "2021-07-21T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pl-PL", // de-DE
};
const account2 = {
  owner: "Duncan High",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  owner: "Mr Egg",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};
const account4 = {
  owner: "Arthur Dayen",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
///////////////////////////////////////////////////
const accounts = [account1, account2, account3, account4];

///////////////      ELEMENTS
// LABELS
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
//  BUTTONS
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnSort = document.querySelector(".btn--sort");
const btnClose = document.querySelector(".form__btn--close");
// INPUTS
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

let currentAccount;
let timer;
let sorted = false;

const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getUTCFullYear();
const hour = `${now.getUTCHours()}`.padStart(2, 0);
const minutes = `${now.getUTCMinutes()}`.padStart(2, 0);
labelDate.textContent = `${day}/${
  now.getMonth() + 1
}/${now.getFullYear()} ${now.getHours()}:${now.getSeconds()}`;

const formatMovementsDate = (date, locale = `en-US`) => {
  const calcDayPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const dayPassed = calcDayPassed(new Date(), date);
  if (dayPassed === 0) {
    return `Today`;
  } else if (dayPassed === 1) {
    return `Yesterday`;
  } else if (dayPassed === 2) {
    return `Two day ago`;
  } else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const createUsername = (accs) => {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((value) => value[0])
      .join("");
  });
};
createUsername(accounts);

const displayMovements = (account, sort = false) => {
  containerMovements.innerHTML = "";
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (value, key) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const date = new Date(account.movementsDates[key]);
    const displayDate = formatMovementsDate(date, account.locale);
    const formattedMovs = formatCur(value, account.locale, account.currency);
    let html = `      
    <div class="movements__row">
      <div class="movements__type  movements__type--${type}"> ${
      key + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMovs}</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = (account) => {
  account.balance = account.movements.reduce((acc, value) => {
    return acc + value;
  }, 0);
  // labelBalance.textContent = `${account.balance.toFixed(2)} €`;
  labelBalance.textContent = formatCur(
    account.balance,
    account.locale,
    account.currency
  );
};

const calcDisplaySummary = (movements) => {
  const income = movements
    .filter((value) => value > 0)
    .reduce((acc, value) => acc + value, 0);
  // labelSumIn.textContent = `${income.toFixed(2)} €`;
  labelSumIn.textContent = formatCur(
    income,
    currentAccount.locale,
    currentAccount.currency
  );
  const outcome = movements
    .filter((value) => value < 0)
    .reduce((acc, value) => acc + value, 0);
  // labelSumOut.textContent = `${Math.abs(outcome).toFixed(2)} €`;
  labelSumOut.textContent = formatCur(
    outcome,
    currentAccount.locale,
    currentAccount.currency
  );

  const interest = movements
    .filter((value) => value > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((value, key, arr) => {
      return value >= 1;
    })
    .reduce((acc, value) => acc + value, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)} €`;
  labelSumInterest.textContent = formatCur(
    interest,
    currentAccount.locale,
    currentAccount.currency
  );
};

const startLogoutTimer = () => {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
      clearInterval(interval);
    }
    time--;
  };

  let time = 120;
  tick();
  const interval = setInterval(tick, 1000);
  return interval;
};

const updateUI = (account) => {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account.movements);
  if (timer) clearInterval(timer);
  timer = startLogoutTimer();
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin == inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
    updateUI(currentAccount);
  } else {
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
    containerApp.style.opacity = 0;
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const recieverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = "";
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  } else {
    alert("wrong data");
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amountLoan = Math.floor(+inputLoanAmount.value);
  if (
    amountLoan > 0 &&
    currentAccount.movements.some((mov) => mov >= amountLoan * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movementsDates.push(new Date().toISOString());
      currentAccount.movements.push(amountLoan);
      updateUI(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    inputClosePin.value == currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    // console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = "";
});

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount, sorted);
});
