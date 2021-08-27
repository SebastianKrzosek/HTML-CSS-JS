"use-strict";
const countriesContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");

const renderCountry = (data, className = "") => {
  const HTML = `    
        <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${
            +data.population / 1000000
          }</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML("beforeend", HTML);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolved, rejected) {
    navigator.geolocation.getCurrentPosition(resolved, rejected);
  });
};

const whereAmI = function () {
  getPosition().then((pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Problem with geocoding ${response.status}`);

        return response.json();
      })
      .then((data) => {
        console.log(`You are in ${data.city} : ${data.country}`);
        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
      })
      .then((response) => response.json())
      .then((data) => renderCountry(data[0]))
      .catch((err) => console.error(err.message));
  });
};
btn.addEventListener("click", whereAmI);

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
