// helpers communs (DOM, formatage, URL id)
// sélection DOM, format prix, lecture id d'URL
export const clearInputValue = (input) => (input.value = "");

export const getIdFromUrl = () => window.location.href.split("=")[1];
