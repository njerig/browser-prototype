let omni = document.getElementById('url'),
    view = document.getElementById('view');

function updateURL (event) {
  if (event.keyCode === 13) {
    omni.blur();
    let val = omni.value;
    let protocol = /^(http|https):\/\/[^ "]+$/;
    if (protocol.test(val)) {
      view.loadURL(val);
    } else {
      view.loadURL('http://' + val);
    }
  }
}

omni.addEventListener('keydown', updateURL);