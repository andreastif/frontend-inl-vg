export let cartObject = {
  id: null,
  amount: null,
};

//Hämtar cartArray från localStorage (READ/CREATE)
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

//Tar bort ett cartObject från cartArray (DELETE)
export function removeObjectFromCartArray(cartObject) {
  const cartArray = getCartArrayFromLocalStorage();
  if (cartArray.find((cartobj) => cartobj.id === cartObject.id) != undefined) {
    if (cartArray.find((cartobj) => cartobj.id === cartObject.id).amount > 1) {
      cartArray.find((cartobj) => cartobj.id === cartObject.id).amount -= 1;
      saveCartArrayToLocalStorage(cartArray);
      displayCartContents();
    } else {
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
    saveCartArrayToLocalStorage(cartArray);
    displayCartContents();
  }
}

//Sparar cartObject i cartArray (UPDATE ARRAY) och returnerar arrayen
export function saveCartObjectInCartArray(cartObject) {
  const cartArray = getCartArrayFromLocalStorage();
  if (cartArray.find((cartobj) => cartobj.id === cartObject.id) != undefined) {
    console.log("You should add the object with amount +1");
    cartArray.find((cartobj) => cartobj.id === cartObject.id).amount += 1;
    saveCartArrayToLocalStorage(cartArray);
    displayCartContents();
  } else {
    console.log("You should add the object with amount 1");
    cartObject.amount = 1;
    cartArray.push(cartObject);
    saveCartArrayToLocalStorage(cartArray);
    displayCartContents();
  }
}

export function displayCartContents() {
  const cartArray = getCartArrayFromLocalStorage();
  let sum = 0;
  for (let i = 0; i < cartArray.length; i++) {
    sum += cartArray[i].amount;
  }
  document.getElementById("lblCartCount").innerText = sum;
}
