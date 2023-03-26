"use strict";
import { getProductById } from "./api.js";
import {
  saveCartObjectInCartArray,
  removeObjectFromCartArray,
  displayCartContents,
  getCartArrayFromLocalStorage,
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

  const myProducts = [];

  for (let myProduct of cartArray) {
    const product = await getProductById(myProduct.id);
    myProducts.push({
      ...product,
      amount: myProduct.amount,
    });
  }

  myProducts.forEach((fakeStoreProduct) => {
    sum += fakeStoreProduct.price * fakeStoreProduct.amount;

    let cartObjectDivIdElement = document.querySelector(
      `#cartObjectDivId-${fakeStoreProduct.id}`
    );
    if (!cartObjectDivIdElement) {
      cartObjectDivIdElement = document.createElement("div");
      cartObjectDivIdElement.setAttribute(
        "id",
        `cartObjectDivId-${fakeStoreProduct.id}`
      );
    }

    cartObjectDivIdElement.innerHTML = `
    <div class="container">
      <div class="row"> 
      <h6 class="col-2"> ${fakeStoreProduct.title}</h6>
      <p class="col-2"> ${fakeStoreProduct.price}$</p>
        <p class="col-2"> # ${fakeStoreProduct.amount}</p>
        <p class="col-2"> ${Math.trunc(
          fakeStoreProduct.price * fakeStoreProduct.amount
        )}$</p>
        
      
        <button class="col-2 btn" id="plusBtn" style="font-size: 1.4rem;"> + </button>
        <button class="col-2 btn" id="minusBtn" style="font-size: 1.4rem;"> - </button>
      </div>
    </div>
    `;

    const plusBtnElement = cartObjectDivIdElement.querySelector("#plusBtn");
    plusBtnElement.addEventListener("click", () =>
      addObject({
        id: fakeStoreProduct.id,
        amount: fakeStoreProduct.amount,
      })
    );

    const minusBtnElement = cartObjectDivIdElement.querySelector("#minusBtn");
    minusBtnElement.addEventListener("click", () =>
      removeObject({
        id: fakeStoreProduct.id,
        amount: fakeStoreProduct.amount,
      })
    );

    specificProductDiv.appendChild(cartObjectDivIdElement);
  });

  let sumObjDivIdElement = document.querySelector("#sumObjDivId");
  if (!sumObjDivIdElement) {
    sumObjDivIdElement = document.createElement("div");
    sumObjDivIdElement.setAttribute("id", "sumObjDivId");
  }

  sumObjDivIdElement.innerHTML = `
  <div class="container mt-5">
    <div class="row">
      <h5 class="col"> Total price tag: ${Math.trunc(sum)} $ </h5>
    </div>
  </div>
  `;
  specificProductDiv.appendChild(sumObjDivIdElement);
}

renderProduct(cartArray);

function addObject(cartObject) {
  //Vi anropar vår hjälpmetod som kontrollerar ifall det finns ett objekt eller inte i vår cart
  saveCartObjectInCartArray(cartObject);
  const cartArray = getCartArrayFromLocalStorage();
  renderProduct(cartArray);
}

function removeObject(cartObject) {
  //Vi anropar vår hjälpmetod som kontrollerar ifall det finns ett objekt eller inte i vår cart
  removeObjectFromCartArray(cartObject);
  const cartArray = getCartArrayFromLocalStorage();
  if (!cartArray.find((cartItem) => cartItem.id === cartObject.id)) {
    const asd = document.getElementById(`cartObjectDivId-${cartObject.id}`);
    asd.remove();
  }
  renderProduct(cartArray);
}
