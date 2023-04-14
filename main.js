const signaturePad = document.querySelector(".signature-pad");
const form = document.querySelector("form");

let writingMode = false;

const signaturePadContext = signaturePad.getContext("2d");
signaturePadContext.lineWidth = 1;
signaturePadContext.lineJoin = signaturePadContext.lineCap = "round";

const clearSignaturePadBtn = document.querySelector("#clear-signature-pad-btn");
const submitSignatureBtn = document.querySelector("#submit-signature-btn");

const clearSignaturePad = () =>
  signaturePadContext.clearRect(0, 0, signaturePad.width, signaturePad.height);

const submitSignatureBtnClickHandler = (e) => {
  e.preventDefault();
  console.log(signaturePad.toDataURL());
  clearSignaturePad();
};
const clearSignaturePadBtnClickHandler = (e) => clearSignaturePad();
submitSignatureBtn.addEventListener("click", submitSignatureBtnClickHandler);
clearSignaturePadBtn.addEventListener(
  "click",
  clearSignaturePadBtnClickHandler
);

const getPointerPosition = (e) => {
  const boundingClientRect = e.target.getBoundingClientRect();
  return [e.clientX - boundingClientRect.x, e.clientY - boundingClientRect.y];
};

const signaturePadPointerDownHandler = (e) => {
  writingMode = true;
  signaturePadContext.beginPath();
  const [px, py] = getPointerPosition(e);
  signaturePadContext.moveTo(px, py);
};

const signaturePadPointerUpHandler = () => (writingMode = false);
const signaturePadPointerMoveHandler = (e) => {
  if (!writingMode) return;
  const [px, py] = getPointerPosition(e);
  signaturePadContext.lineTo(px, py);
  signaturePadContext.stroke();
};

signaturePad.addEventListener("pointerdown", signaturePadPointerDownHandler, {
  passive: true,
});
signaturePad.addEventListener("pointerup", signaturePadPointerUpHandler, {
  passive: true,
});
signaturePad.addEventListener("pointermove", signaturePadPointerMoveHandler, {
  passive: true,
});
