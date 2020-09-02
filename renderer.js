let omni = document.getElementById('url'),
    view = document.getElementById('view'),
    forward = document.getElementById('forward'),
    reload = document.getElementById('refresh');

function updateURLProtocol (event) {
  if (event.keyCode === 13) {
    omni.blur();
    let val = omni.value;
    let protocol = /^(http|https):\/\/[^ "]+$/;
    if (protocol.test(val)) {
      view.loadURL(val);
    } else {
      view.loadURL('https://' + val);
    }
  }
}

function goBackView () {
  view.goBack();
  omni.innerHTML  = view.getURL();
}

function goForwardView () {
  view.goForward();
}

function reloadView () {
  view.reload();
}

omni.addEventListener('keydown', updateURLProtocol);
back.addEventListener('click', goBackView);
forward.addEventListener('click', goForwardView);
reload.addEventListener('click', reloadView);
