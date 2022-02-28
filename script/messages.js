const errorElement = document.querySelector(".error");
const successElement = document.querySelector(".success");

// show error message for 3 seconds
export function onError(message) {
  document.querySelector(".error").innerText = message;
  document.querySelector(".error").style.visibility = "visible";
  setTimeout(
    () => (document.querySelector(".error").style.visibility = "hidden"),
    3000
  );
}

// show success message for 3 seconds
export function onSuccess(message) {
  document.querySelector(".success").innerText = message;
  document.querySelector(".success").style.visibility = "visible";
  setTimeout(
    () => (document.querySelector(".success").style.visibility = "hidden"),
    3000
  );
}
