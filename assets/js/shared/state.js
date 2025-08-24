// localStorage (cart, checkout, lastOrder)
// lire/écrire cart, checkoutDraft, lastOrder dans localStorage

export function getCart (){
let data = localStorage.getItem("cart");
return data ? JSON.parse(data) : []
}
