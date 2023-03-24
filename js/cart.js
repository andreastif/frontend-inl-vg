"use strict";
import {
  saveCartObjectInCartArray,
  removeObjectFromCartArray,
  displayCartContents,
  getCartArrayFromLocalStorage,
} from "./localStorage.js";
displayCartContents();

// Fetch Item From LocalStorage
const productList = getCartArrayFromLocalStorage();

const renderProduct = (productList) => {
  // Ändra InnerHTML efter products värden
  //   const specificProductDiv = document.querySelector("#cart-product");
  const specificProductDiv = document.querySelector("#cart-main");

  for (let i = 0; i < productList.length; i++) {
    console.log("hello from cart.js");
    console.log(productList);

    const cartObject = productList[i];

    const cartObjectDiv = document.createElement("div");

    cartObjectDiv.textContent = `id: ${cartObject.id}, amount: ${cartObject.amount}`;

    specificProductDiv.appendChild(cartObjectDiv);
  }
};

renderProduct(productList);

// const addBtn = document.getElementById("addToCartBtn");
// addBtn.addEventListener("click", () => {
//   //Vi populerar med den produkts id nyckel, som vi vill köpa
//   cartObject.id = data.id;
//   //Vi anropar vår hjälpmetod som kontrollerar ifall det finns ett objekt eller inte i vår cart
//   saveCartObjectInCartArray(cartObject);
//   renderProduct(data);
// });

// const removeBtn = document.getElementById("removeFromCartBtn");
// removeBtn.addEventListener("click", () => {
//   //Vi populerar med den produkts id nyckel, som vi vill köpa
//   cartObject.id = data.id;
//   //Vi anropar vår hjälpmetod som kontrollerar ifall det finns ett objekt eller inte i vår cart
//   removeObjectFromCartArray(cartObject);
//   renderProduct(data);
// });
