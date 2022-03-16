const errorElement = document.getElementById("error");
const successElement = document.getElementById("success");

// show error message for 3 seconds
export function onError(message) {
  errorElement.innerText = message;
  errorElement.style.visibility = "visible";
  setTimeout(() => (errorElement.style.visibility = "hidden"), 3000);
}

// show success message for 3 seconds
export function onSuccess(message) {
  successElement.innerText = message;
  successElement.style.visibility = "visible";
  setTimeout(() => (successElement.style.visibility = "hidden"), 3000);
}
