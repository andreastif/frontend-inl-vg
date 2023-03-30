"use strict";
import { getProductById } from "./api.js";
import {
  saveCartObjectInCartArray,
  removeObjectFromCartArray,
  removeAllObjectsFromCartArray,
  displayCartContents,
  getTotalItemsInCart,
  getCartArrayFromLocalStorage,
} from "./localStorage.js";
displayCartContents();

// Fetch Item From LocalStorage
const cartArray = getCartArrayFromLocalStorage();

async function renderSucessMessage(cartArray) {
  //div where content should be displayed
  const confirmationDiv = document.querySelector(".confirmation");
  confirmationDiv.classList.add("row");

  //get all products from API
  const myProducts = [];
  for (let myProduct of cartArray) {
    const product = await getProductById(myProduct.id);
    myProducts.push({
      ...product,
      amount: myProduct.amount,
    });
  }

  if (myProducts.length < 1) {
    confirmationDiv.innerHTML = `<h1 class="my-5"> Nothing to see here </h1>`;
  } else {
    let html = `<h2 style="margin-bottom: 2rem;">Thank you for buying the following products</h2>`;

    myProducts.forEach((fakeStoreProduct) => {
      let htmlSegment = `
      <div class="col center my-2">
        <div class="card" style="width: 18rem;">
          <div class="my-3"> 
            <img src="${
              fakeStoreProduct.image
            }" class="card-img-top w-50 h-50" alt="productImg" style="width: 100%; height: 100%;">
            </div>
              <h5 class="card-header">${fakeStoreProduct.title}</h5>
              <div class="card-body">
              <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Summary</strong></li>
              <li class="list-group-item"># of products: <strong>${
                fakeStoreProduct.amount
              }</strong></li>
              <li class="list-group-item">$ per product <strong>${
                fakeStoreProduct.price
              }</strong></li>
              <li class="list-group-item"> Total price: <strong>${(
                fakeStoreProduct.price * fakeStoreProduct.amount
              ).toFixed(2)}$</strong></li>
              
            </ul>
          </div>
        </div>
      </div>
          `;
      html += htmlSegment;
    });

    confirmationDiv.innerHTML = html;
  }

  // Reset localStorage
  // localStorage.clear();
}

renderSucessMessage(cartArray);
