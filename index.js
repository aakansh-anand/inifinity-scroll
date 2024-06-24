const imgContainer = document.querySelector("#img-container");
const waitingLoader = document.querySelector("#loader");

let load = false;
let imgLoaded = 0;
let totalImg = 0;
let photosArray = [];

// Unsplash API
let imgCounter = 5;
const apiKey = 'aIUcqXQ75xdAzW-7NmVpJxGgtggwVMJxnygyAE6gLY8';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imgCounter}`;

// Check if all the images are loaded ?
function imgLoader() {
  imgLoaded++;
  console.log("Image Loaded");
  if (imgLoaded === totalImg) {
    load = true;
    waitingLoader.hidden = true;
    imgCounter = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imgCounter}`;
  }
}

// Helper Functions
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display Images from API
function displayImages() {
  imgLoaded = 0;
  totalImg = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imgLoader);

    // Put <a> and <img> inside imageContainer
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayImages();
  } catch (error) {
    // Catch Error here
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && load) {
    getPhotos();
    load = false;
  }
})

// Loading
getPhotos();