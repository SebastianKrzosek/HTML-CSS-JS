"use-strict";

const imgContainer = document.querySelector(".images");

const wait = function (sec) {
  return new Promise(function (resolved) {
    setTimeout(resolved, sec * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolved, rejectd) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolved(img);
    });
    img.addEventListener("error", function () {
      rejectd(new Error("Image not found"));
    });
  });
};
let currImg;
createImage("./img/img-1.jpg")
  .then((img) => {
    currImg = img;
    return wait(3);
  })
  .then(() => {
    currImg.style.display = "none";
    return createImage("./img/img-2.jpg");
  })
  .then((img) => {
    currImg = img;
    return wait(3);
  })
  .then(() => {
    currImg.style.display = "none";
    return createImage("./img/img-3.jpg");
  })
  .then((img) => (img.style.display = "none"))
  .catch((err) => console.error(err));
