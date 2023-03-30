//template för cartObject som skall populera cartArray
export let cartObject = {
  id: null,
  amount: null,
};

//Hämtar cartArray från localStorage (READ)
export function getCartArrayFromLocalStorage() {
  if (localStorage.getItem("cartArray") != null) {
    return JSON.parse(localStorage.getItem("cartArray"));
  } else {
    const cartArray = [];
    return cartArray;
  }
}

//Sparar cartArray till localStorage (UPDATE)
function saveCartArrayToLocalStorage(cartArray) {
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
}

//Minskar och/eller bort ett cartObject från cartArray (DELETE)
export function removeObjectFromCartArray(cartObject) {
  const cartArray = getCartArrayFromLocalStorage();
  if (cartArray.find((cartobj) => cartobj.id === cartObject.id) != undefined) {
    //Om produkten finns i cartarray
    if (cartArray.find((cartobj) => cartobj.id === cartObject.id).amount > 1) {
      // Om det finns mer än 1 produkt
      cartArray.find((cartobj) => cartobj.id === cartObject.id).amount -= 1; //Minska med 1
      saveCartArrayToLocalStorage(cartArray);
      displayCartContents();
    } else {
      //annars ta bort produkten
      const index = cartArray.findIndex((ele) => ele.id === cartObject.id);
      if (index === 0) {
        cartArray.shift();
      } else {
        cartArray.splice(index, index);
      }
      saveCartArrayToLocalStorage(cartArray);
      displayCartContents();
    }
  } else {
    //om produkten inte finns i cartarray
    saveCartArrayToLocalStorage(cartArray);
    displayCartContents();
  }
}

//Tar bort alla objekt från cartArray (DELETE)
export function removeAllObjectsFromCartArray() {
  const cartArray = getCartArrayFromLocalStorage();
  cartArray.length = 0;
  saveCartArrayToLocalStorage(cartArray);
  displayCartContents();
}

//Sparar cartObject i cartArray (CREATE/UPDATE ARRAY) och returnerar arrayen
export function saveCartObjectInCartArray(cartObject) {
  const cartArray = getCartArrayFromLocalStorage();

  //UPDATE
  if (cartArray.find((cartobj) => cartobj.id === cartObject.id) != undefined) {
    cartArray.find((cartobj) => cartobj.id === cartObject.id).amount += 1;
    saveCartArrayToLocalStorage(cartArray);
    displayCartContents();
  }
  //CREATE
  else {
    cartObject.amount = 1;
    cartArray.push(cartObject);
    saveCartArrayToLocalStorage(cartArray);
    displayCartContents();
  }
}

//Skall anropas på varje HTML sida där cart-ikonen syns så att alla totala produkter i varukorgen kan ses
export function displayCartContents() {
  const cartArray = getCartArrayFromLocalStorage();
  let sum = 0;
  for (let i = 0; i < cartArray.length; i++) {
    sum += cartArray[i].amount;
  }
  document.getElementById("lblCartCount").innerText = sum;
}

//Hjälpfunktion för att hämta de totala produkterna i local storage
export function getTotalItemsInCart() {
  const cartArray = getCartArrayFromLocalStorage();
  let sum = 0;
  for (let i = 0; i < cartArray.length; i++) {
    sum += cartArray[i].amount;
  }
  return sum;
}
