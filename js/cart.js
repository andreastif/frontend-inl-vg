"use strict";
import { getProducts, getAllProducts, getProductById } from "./api.js";
import {
  saveCartObjectInCartArray,
  removeObjectFromCartArray,
  displayCartContents,
  getCartArrayFromLocalStorage,
  cartObject,
} from "./localStorage.js";
displayCartContents();

// Fetch Item From LocalStorage
const cartArray = getCartArrayFromLocalStorage();

//async await med getProductId() import.
async function renderProduct(cartArray) {
  // Ändra InnerHTML efter products värden
  //   const specificProductDiv = document.querySelector("#cart-product");
  const specificProductDiv = document.querySelector("#cart-main");
  let sum = 0;

  for (let i = 0; i < cartArray.length; i++) {
    const cartObject = cartArray[i];
    const fakeStoreProduct = await getProductById(cartObject.id);
    sum += fakeStoreProduct.price * cartObject.amount;

    const cartObjectDiv = document.createElement("div");

    console.log(fakeStoreProduct);

    console.log(sum);
    cartObjectDiv.innerHTML = `
    <div class="container">
      <div class="row"> 
        <p class="col-2"> # ${cartObject.amount}</p>
        <p class="col-2"> ${fakeStoreProduct.price * cartObject.amount} $</p>
        <h6 class="col-2"> Product ${fakeStoreProduct.title}</h6>
        <a class="col-3 btn" id="plusBtn" onClick="addObject();" style="font-size: 1.4rem;"> + </a>
        <a class="col-3 btn" id="minusBtn" onClick="removeObject();" style="font-size: 1.4rem;"> - </a>
      </div>
    </div>
    `;

    specificProductDiv.appendChild(cartObjectDiv);
  }

  const sumObjDiv = document.createElement("div");
  sumObjDiv.innerHTML = `
  <div class="container mt-5">
    <div class="row">
      <h5 class="col"> Total price tag: ${Math.trunc(sum)} $ </h5>
    </div>
  </div>
  `;
  specificProductDiv.appendChild(sumObjDiv);
}

renderProduct(cartArray);

// const addBtn = document.getElementById("plusBtn");
// addBtn.addEventListener("click",

function addObject(cartObject) {
  //Vi populerar med den produkts id nyckel, som vi vill köpa

  //Vi anropar vår hjälpmetod som kontrollerar ifall det finns ett objekt eller inte i vår cart
  saveCartObjectInCartArray(cartObject);
}

// const removeBtn = document.getElementById("minusBtn");
// removeBtn.addEventListener("click");

function removeObject(cartObject) {
  //Vi populerar med den produkts id nyckel, som vi vill köpa

  //Vi anropar vår hjälpmetod som kontrollerar ifall det finns ett objekt eller inte i vår cart
  removeObjectFromCartArray(cartObject);
}
