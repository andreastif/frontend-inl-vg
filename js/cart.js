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
export function saveCartArrayToLocalStorage(cartArray) {
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
}

//Tar bort ett cartObject från cartArray (DELETE)
export function removeObjectFromCartArray(cartObject, cartArray) {
  if (cartArray.find((cartobj) => cartobj.id === cartObject.id) != undefined) {
    if (cartArray.find((cartobj) => cartobj.id === cartObject.id).amount > 0) {
      cartArray.find((cartobj) => cartobj.id === cartObject.id).amount -= 1;
      return cartArray;
    } else {
      const index = cartArray.findIndex((ele) => ele.id === cartObject.id);
      if (index === 0) {
        cartArray.shift();
      } else {
        cartArray.splice(index, index);
      }
      return cartArray;
    }
  } else {
    return cartArray;
  }
}

//Sparar cartObject i cartArray (UPDATE ARRAY) och returnerar arrayen
export function saveCartObjectInCartArray(cartObject, cartArray) {
  if (cartArray.find((cartobj) => cartobj.id === cartObject.id) != undefined) {
    console.log("You should add the object with amount +1");
    cartArray.find((cartobj) => cartobj.id === cartObject.id).amount += 1;
    return cartArray;
  } else {
    console.log("You should add the object with amount 1");
    cartObject.amount = 1;
    cartArray.push(cartObject);
    return cartArray;
  }
}
