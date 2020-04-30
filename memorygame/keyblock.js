window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);

document.onkeydown = function (e) {
  if (e.ctrlKey &&
    (e.keyCode === 65 ||
      e.keyCode === 67 ||
      e.keyCode === 85)) {
    return false;
  } else if (e.keyCode === 123 || e.keyCode === 93) {
    return false;
  } else if (e.ctrlKey && e.shiftKey &&
    (e.keyCode === 73 ||
      e.keyCode === 67 ||
      e.keyCode === 75 ||
      e.keyCode === 90 ||
      e.keyCode === 69 ||
      e.keyCode === 74 ||
      e.keyCode === 77)) {
    return false;
  } else if (e.shiftKey === 123 &&
    (e.keyCode === 116 ||
      e.keyCode === 118 ||
      e.keyCode === 120 ||
      e.keyCode === 123)) {
    return false;
  } else {
    return true;
  }
};