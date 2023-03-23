"use strict";
import { getProductById } from "./api.js";
import {
  getCartArrayFromLocalStorage,
  saveCartArrayToLocalStorage,
  saveCartObjectInCartArray,
  removeObjectFromCartArray,
  cartObject,
} from "./cart.js";

// Fetch Item From LocalStorage
const productID = JSON.parse(localStorage.getItem("ID"));

const data = await getProductById(productID);

const renderProduct = (data) => {
  // Ändra InnerHTML efter products värden
  const specificProductDiv = document.querySelector(".jumbo-product");

  //A HREFEN SKA ÄNDRAS FRÅN CHECKOUT I VG-DELEN
  let htmlContent = `
        <img class=my-5" src="${data.image}" width=200px height=200px style="object-fit: fill">
        <h2 class="my-5"> ${data.title}</h2>
        <p class="my-5 lead fs-4"><strong>Category:</strong> ${data.category}</p>
        <p class="my-5 lead fs-4"><strong>Description:</strong> ${data.description}</p>
        <p class="my-5 lead fs-4"><strong>Price: </strong> ${data.price} $</p>
        <p class="my-5 lead fs-4"><strong>Rating:</strong> ${data.rating.rate}/5 (${data.rating.count} votes)</p>
        <div id="addToCartBtn" class="my-3 w-100 btn btn-lg btn-dark"> 
          Add to cart
        </div>
        <div id="removeFromCartBtn" class="my-3 w-100 btn btn-lg btn-dark"> 
        Remove From Cart
        </div>
        `;

  specificProductDiv.innerHTML = htmlContent;
};

renderProduct(data);

const addBtn = document.getElementById("addToCartBtn");
addBtn.addEventListener("click", (e) => {
  //Vi hämtar vår cartArray (skapar ny om ej finns eller hämtar från localStorage)
  const cartArray = getCartArrayFromLocalStorage();
  //Vi populerar med den produkts id nyckel, som vi vill köpa
  cartObject.id = data.id;
  //Vi anropar vår hjälpmetod som kontrollerar ifall det finns ett objekt eller inte i vår cart
  const cartArray2 = saveCartObjectInCartArray(cartObject, cartArray);
  //Vi sparar vår uppdaterade cart till localStorage
  saveCartArrayToLocalStorage(cartArray2);
});

const removeBtn = document.getElementById("removeFromCartBtn");
removeBtn.addEventListener("click", (e) => {
  //Vi hämtar vår cartArray (skapar ny om ej finns eller hämtar från localStorage)
  const cartArray = getCartArrayFromLocalStorage();
  //Vi populerar med den produkts id nyckel, som vi vill köpa
  cartObject.id = data.id;
  //Vi anropar vår hjälpmetod som kontrollerar ifall det finns ett objekt eller inte i vår cart
  const cartArray2 = removeObjectFromCartArray(cartObject, cartArray);
  //Vi sparar vår uppdaterade cart till localStorage
  saveCartArrayToLocalStorage(cartArray2);
});
