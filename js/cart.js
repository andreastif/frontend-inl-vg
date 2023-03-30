"use strict";
import { getProductById } from "./api.js"; //hjälpmetod för att hämta alla produkter från fakestoreproduct apin
import {
  saveCartObjectInCartArray,
  removeObjectFromCartArray,
  removeAllObjectsFromCartArray,
  displayCartContents,
  getCartArrayFromLocalStorage,
} from "./localStorage.js"; //importer av hjälpfunktioner från localStorage.js
displayCartContents(); //import av produkter så vi ser det på vår kundvagn i navbar

// Fetch Item From LocalStorage
const cartArray = getCartArrayFromLocalStorage();

//async await funktion som hämtar alla produkter från fakestoreapi och renderar dem på cart.html sidan.
async function renderProduct(cartArray) {
  //sum används senare i koden för att summera totalt kostnadsbelopp
  let sum = 0;
  //vi hämtar den div som skall populeras med produkterna
  const specificProductDiv = document.querySelector("#cart-main");
  //vi definierar den array som kommer innehålla alla produkter hämtade från fakestoreApi
  const myProducts = [];

  //denna loop hämtar alla produkter och skjuter in det i vår array med tillägget av hur många produkter vi har sagt att vi vill ha i vår localstorage
  //(t.ex. om vi vill ha 5 fjällräven väskor skall det följa med så vi kan redovisa det för slutkunden)
  //Anledningen till att vi hämtar alla produkter direkt är så att vi inte behöver rendera om sidan och hämta produkterna igen. Vi "förladdar" allting.
  for (let myProduct of cartArray) {
    const product = await getProductById(myProduct.id); //hämtar produkten från apit
    myProducts.push({
      //trycker in objektet i vår array, en efter en
      ...product,
      amount: myProduct.amount, //lägger till antalet för att hålla reda på hur många produkter slutkund har sagt att vi vill köpa
    });
  }

  //Denna loop itererar över alla produkter som nu är hämtade från fakestoreapi och renderar upp dem på vår cart.html sida.

  myProducts.forEach((fakeStoreProduct) => {
    //Här börjar vi räkna ut totalbeloppet av allt vi har i vår cart och vi adderar till vår sum variabel som är tidigare definierad
    sum += fakeStoreProduct.price * fakeStoreProduct.amount;

    //Denna sats och efterföljande if kontrollerar om vi har renderat upp vår produkt på sidan eller inte.
    //Om produkten som vi har hämtat INTE är renderad kommer vi att skapa en div som innehåller ett ID för den särskilda produkten i fråga
    let cartObjectDivIdElement = document.querySelector(
      `#cartObjectDivId-${fakeStoreProduct.id}` //hämtar produkt DIV
    );
    if (!cartObjectDivIdElement) {
      //om produkt DIV inte existerar, skapa då produkt DIV så vi kan påbörja att populera divven med produkten och produktinformation!
      cartObjectDivIdElement = document.createElement("div");
      cartObjectDivIdElement.setAttribute(
        "id",
        `cartObjectDivId-${fakeStoreProduct.id}`
      );
    }

    //Nu börjar vi skjuta in våra HTML och CSS/Bootstrap och visa produkterna. Använder sig av Cards.
    //Vi visar en bild, titel, antalet produkter och totalpriset för just den produkten.
    //Längst ner skapar vi även knappar som syftar till att kunna inkrementera eller dekrementera antalet produkter i realtid.
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

    //här hämtar knapparna som är för den specifika produkten och kopplar ihop så vi kan öka eller minska antalet produkter dynamiskt på sidan.
    //knapp +
    const plusBtnElement = cartObjectDivIdElement.querySelector("#plusBtn");
    plusBtnElement.addEventListener("click", () =>
      addObject({
        id: fakeStoreProduct.id,
        amount: fakeStoreProduct.amount,
      })
    );

    //knapp -
    const minusBtnElement = cartObjectDivIdElement.querySelector("#minusBtn");
    minusBtnElement.addEventListener("click", () =>
      removeObject({
        id: fakeStoreProduct.id,
        amount: fakeStoreProduct.amount,
      })
    );

    //här skjuter vi in produkten på sidan!
    specificProductDiv.appendChild(cartObjectDivIdElement);
  });

  //Denna sats och efterföljande 'if' kontrollerar om vi har renderat upp vår summering på sidan eller inte.
  //Om vår summering som vi har hämtat INTE är renderad kommer vi att skapa en div som innehåller totalbeloppet för alla produkter samt tillhörande knappar,
  //men bara om vi faktiskt har något köpebelopp!
  let sumObjDivIdElement = document.querySelector("#sumObjDivId");
  if (!sumObjDivIdElement) {
    sumObjDivIdElement = document.createElement("div");
    sumObjDivIdElement.setAttribute("id", "sumObjDivId");
  }

  //Om vi inte har handlat något, ska vi visa att vår kundvagn är tom
  if (sum < 1) {
    sumObjDivIdElement.innerHTML = `
  <div class="container mt-5">
    <div class="center center-gap my-5">
      <h6>  Your cart seems to be empty!</h6>
    </div>
  </div>
  `;
    //Annars visar vi totalbeloppet för alla produkter samt tillägg av knapp "Proceed to checkout" (går vidare med köpet) och "Remove All" (tar bort alla produkter)
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
  //här lägger vi till totalsumman och renderar på sidan
  specificProductDiv.appendChild(sumObjDivIdElement);

  //Här hämtar knappen som tar bort alla produkter
  //knapp removeAll
  const removeAllBtn = sumObjDivIdElement.querySelector("#removeAll");
  removeAllBtn.addEventListener("click", () => removeAll());
}

//Anrop av renderProduct som visar en eller flera produkter
renderProduct(cartArray);

//Hjälpmetod för vår knapp som inkrementerar/adderar objekt
function addObject(cartObject) {
  saveCartObjectInCartArray(cartObject);
  const cartArray = getCartArrayFromLocalStorage();
  renderProduct(cartArray);
}

//Hjälpmetod för vår knapp som dekrementerar/tar bort objekt
function removeObject(cartObject) {
  removeObjectFromCartArray(cartObject); //tar bort ur array (uppdaterar även arrayen)
  const cartArray = getCartArrayFromLocalStorage(); // hämtar en färsk array från LocalStorage som inte innehåller den borttagna produkten
  if (!cartArray.find((cartItem) => cartItem.id === cartObject.id)) {
    //tar bort en produkt-div från sidan
    const containerCartObj = document.getElementById(
      `cartObjectDivId-${cartObject.id}`
    );
    containerCartObj.remove();
  }
  renderProduct(cartArray); //renderar om sidan
}

//Hjälpmetod för vår knapp som tar bort alla objekt
function removeAll() {
  const cartArray = getCartArrayFromLocalStorage(); //hämtar senast aktuella array från localstorage

  cartArray.forEach((cartObject) => {
    const containerCartObj = document.getElementById(
      `cartObjectDivId-${cartObject.id}`
    );
    containerCartObj.remove(); //tar bort div-produkter från sidan
  });
  removeAllObjectsFromCartArray(); //tar bort alla produkter ur localstorage
  renderProduct(getCartArrayFromLocalStorage()); //renderar om sidan
}
