"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////
//      xml request              //
///////////////////////////////////

// const getCountryData = (country) => {
//   const request = new XMLHttpRequest();
//   request.open(
//     "GET",
//     `https://restcountries.eu/rest/v2/name/${country.toLowerCase()}`
//   );
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const HTML = `
//   <article class="country">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${+data.population / 1000000}</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
//   </div>
// </article>`;
//     countriesContainer.insertAdjacentHTML("beforeend", HTML);
//     countriesContainer.style.opacity = 1;
//   });
// };

///////////////////////////////////
///////////////////////////////////
//      xml requests             //
///////////////////////////////////

const renderCountry = (data, className = "") => {
  const HTML = `    
      <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${+data.population / 1000000}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML("beforeend", HTML);
  countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = (country) => {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://restcountries.eu/rest/v2/name/${country.toLowerCase()}`
  );
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    const neighbour = data.borders;

    if (!neighbour) return;

    neighbour.forEach((n) => {
      let req = new XMLHttpRequest();
      req.open("GET", `https://restcountries.eu/rest/v2/alpha/${n}`);
      req.send();
      req.addEventListener("load", function () {
        renderCountry(JSON.parse(this.responseText), "neighbour");
      });
    });

    // const request2 = new XMLHttpRequest();
    // request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    // request2.send();
    // request2.addEventListener("load", function () {
    //   renderCountry(JSON.parse(this.responseText), "neighbour");
    // });
  });
};
*/

//////////////////////////////////////////////
//                  fetch                   //
//////////////////////////////////////////////

// let country = "belgium";
const renderError = (err) => {
  countriesContainer.insertAdjacentHTML(
    "beforeend",
    `Somethink went wrong 🔥⚡ ${err}. <br> Check Your internet connection or Try again later!`
  );
  countriesContainer.style.opacity = 1;
};
/*
const getJson = function (url, errMsg = "Sth went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  getJson(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country can't found`
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbours = data[0].borders;

      if (!neighbours) throw new Error("This country dont have neighbours");
      return neighbours;
    })
    .then((neighbours) =>
      neighbours.forEach((n) =>
        getJson(
          `https://restcountries.eu/rest/v2/alpha/${n}`,
          `Country can't found`
        ).then((data) => {
          renderCountry(data, "neighbour");
        })
      )
    )
    .catch((err) => renderError(err))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", function () {
  countriesContainer.innerHTML = "";
  getCountryData(country);
});

*/

//////////////////////////////////////
//              PROMISE             //
//////////////////////////////////////

// const lottery = new Promise(function (resolve, rejected) {
//   console.log("LOTTERY IS STARTING");
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve("You win!");
//     } else {
//       rejected(new Error("You loooseee loseer"));
//     }
//   }, 2000);
// });

// lottery.then((res) => console.log(res)).catch((err) => console.error(err));

//////////////////////////////////////
//          ASYNC / AWAIT           //
//////////////////////////////////////
/*const getPosition = function () {
  return new Promise(function (resolved, rejected) {
    navigator.geolocation.getCurrentPosition(resolved, rejected);
  });
};

const whereAmI = async function () {
  try {
    //handling positions
    const pos = await getPosition();
    // init lat and lng
    const { latitude: lat, longitude: lng } = pos.coords;

    const geoRes = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!geoRes.ok)
      throw new Error("Problem with getting country from localization");

    const res = await geoRes.json();

    const data = await fetch(
      `https://restcountries.eu/rest/v2/name/${res.country}`
    );
    if (!data.ok) throw new Error("Problem with fetch correct country");

    const [result] = await data.json();
    renderCountry(result); //rendering

    return `You are in ${res.city}, ${res.country}`;
  } catch (err) {
    renderError(err.message);
    throw err;
  }
};
console.log(`1: starting`);
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log(`3: finishing`);
})();
*/

///////////////////////////////
//        PARALELS           //
///////////////////////////////
/*

const getJson = function (url, errMsg = "Sth went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // let [data1] = await getJson(`https://restcountries.eu/rest/v2/name/${c1}`);
    // let [data2] = await getJson(`https://restcountries.eu/rest/v2/name/${c2}`);
    // let [data3] = await getJson(`https://restcountries.eu/rest/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);
    const result = await Promise.all([
      getJson(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJson(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJson(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    result.forEach(([country]) => console.log(country.capital));
  } catch (err) {
    console.error(err.message);
  }
};
*/

/////////////////////////////////
//        others               //
/////////////////////////////////

const getJson = function (url, errMsg = "Sth went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }
    return response.json();
  });
};
(async function () {
  const response = await Promise.race([
    getJson(`https://restcountries.eu/rest/v2/name/italy`),
    getJson(`https://restcountries.eu/rest/v2/name/portugal`),
    getJson(`https://restcountries.eu/rest/v2/name/poland`),
  ]);
  console.log(response[0]);
})();
