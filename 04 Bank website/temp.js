//////////////////////////////////////////////
//      Selecting elements

// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);
// console.log(document.querySelector(".header"));
// const allSection = document.querySelectorAll(".section");
// console.log(allSection);
// console.log(document.getElementById("section--1"));
// document;
// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);
// console.log(document.getElementsByClassName("btn"));

////////////////////////////////////////////////
//    Creating and inserting elements

// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.textContent = "We use cookiens to improved functionality and analytics";
// message.innerHTML = `We use cookiens to improved functionality and analytics <button class = 'btn btn--close-cookie'>Got it!</button>`;

// const header = document.querySelector(".header");
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);
// ////////////////////////////////////////////////
// //    Deleting
// document.querySelector(".btn--close-cookie").addEventListener(
//   "click",
//   () => message.remove()
//   // message.parentElement.removeChild(message)
// );

// ////////////////////////////////////////////////
// //    Styles
// message.style.backgroundColor = `#37383d`;
// message.style.width = `130%`;
// message.style.padding = "7px";
// console.log(getComputedStyle(message).height);

// // document.documentElement.style.setProperty("--color-primary", "orangered");

// //    Atributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);

// //Non-standard atributes
// console.log(logo.getAttribute("designer"));
// logo.setAttribute("company", "UMK");
// console.log(logo.getAttribute("company"));

// console.log(logo.src);
// console.log(logo.getAttribute("src"));

// const link = document.querySelector(".twitter-link");
// console.log(link.href);
// console.log(link.getAttribute("href"));

// console.log(logo.dataset.versionNumber);

// /////////////////////////////////////////////
// //      CLASSES

// logo.classList.add("c", "j");
// logo.classList.remove("c", "j");
// logo.classList.toggle("c");
// console.log(logo.classList.contains("c")); //not includes

// //dont use
// // logo.className = "SK";
// //

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// const h1 = document.querySelector("h1");
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = randomColor();
// h1.lastElementChild.style.color = randomColor();
//////////////////////////////////////////////////////
// parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.backgroundColor = randomColor();
