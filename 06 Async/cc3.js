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
// createImage("./img/img-1.jpg")
//   .then((img) => {
//     currImg = img;
//     return wait(3);
//   })
//   .then(() => {
//     currImg.style.display = "none";
//     return createImage("./img/img-2.jpg");
//   })
//   .then((img) => {
//     currImg = img;
//     return wait(3);
//   })
//   .then(() => {
//     currImg.style.display = "none";
//     return createImage("./img/img-3.jpg");
//   })
//   .then((img) => (img.style.display = "none"))
//   .catch((err) => console.error(err));

const loadNPause = async function () {
  try {
    let img = await createImage("./img/img-1.jpg");
    console.log(`First image was loaded`);
    await wait(2);
    img.style.display = "none";

    img = await createImage("./img/img-2.jpg");
    console.log(`Second image was loaded`);
    await wait(2);
    img.style.display = "none";

    img = await createImage("./img/img-3.jpg");
    console.log(`Third image was loaded`);
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error(err);
  }
};
loadAll(["./img/img-1.jpg", "./img/img-2.jpg", "./img/img-3.jpg"]);
