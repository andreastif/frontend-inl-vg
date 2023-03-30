"use strict";
import { getProductById } from "./api.js";
import {
  saveCartObjectInCartArray,
  removeObjectFromCartArray,
  removeAllObjectsFromCartArray,
  displayCartContents,
  getCartArrayFromLocalStorage,
} from "./localStorage.js";
displayCartContents();

// Fetch Item From LocalStorage
const cartArray = getCartArrayFromLocalStorage();

//async await med getProductId() import.
async function renderProduct(cartArray) {
  // Ändra InnerHTML efter products värden
  let sum = 0;
  const specificProductDiv = document.querySelector("#cart-main");
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
      <div class="row mt-2 center"> 
        <div class="card" style="width: 18rem;">
          <div class="my-3" id="cartObjImgContainer"> 
            <img src="${
              fakeStoreProduct.image
            }" class="card-img-top w-50" alt="productImg" style="width: 100%; height: 100%;">
            </div>
              <h5 class="card-header">${fakeStoreProduct.title}</h5>
              <div class="card-body">
              <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Product Order Summary</strong></li>
              <li class="list-group-item"># of products: <strong>${
                fakeStoreProduct.amount
              }</strong></li>
              <li class="list-group-item"> Total price: <strong>${(
                fakeStoreProduct.price * fakeStoreProduct.amount
              ).toFixed(2)}$</strong></li>
              <li class="list-group-item"></li>
            </ul>
          <div class="cartObjButtons">
            <button class="btn btn-success w-25" id="plusBtn"> + </button>
            <button class="btn btn-warning w-25" id="minusBtn"> - </button>
          </div>
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

  if (sum < 1) {
    sumObjDivIdElement.innerHTML = `
  <div class="container mt-5">
    <div class="center center-gap my-5">
      <h6>  Your cart seems to be empty!</h6>
    </div>
  </div>
  `;
  } else {
    sumObjDivIdElement.innerHTML = `
  <div class="container mt-5">
    <div class="center center-gap my-5">
      <h6> Total: ${sum.toFixed(2)} $ </h6>
      <a class="btn btn-success" href="checkout.html">Proceed to Checkout</a>
      <a class="btn btn-danger" id="removeAll">Remove All</a>
    </div>
  </div>
  `;
  }
  specificProductDiv.appendChild(sumObjDivIdElement);

  const removeAllBtn = sumObjDivIdElement.querySelector("#removeAll");
  removeAllBtn.addEventListener("click", () => removeAll());
}

renderProduct(cartArray);

function addObject(cartObject) {
  saveCartObjectInCartArray(cartObject);
  const cartArray = getCartArrayFromLocalStorage();
  renderProduct(cartArray);
}

function removeObject(cartObject) {
  removeObjectFromCartArray(cartObject);
  const cartArray = getCartArrayFromLocalStorage();
  if (!cartArray.find((cartItem) => cartItem.id === cartObject.id)) {
    const containerCartObj = document.getElementById(
      `cartObjectDivId-${cartObject.id}`
    );
    containerCartObj.remove();
  }
  renderProduct(cartArray);
}

function removeAll() {
  const cartArray = getCartArrayFromLocalStorage();

  cartArray.forEach((cartObject) => {
    const containerCartObj = document.getElementById(
      `cartObjectDivId-${cartObject.id}`
    );
    containerCartObj.remove();
  });

  removeAllObjectsFromCartArray();
  renderProduct(getCartArrayFromLocalStorage());
}
