let omni = document.getElementById('url'),
    view = document.getElementById('view'),
    forward = document.getElementById('forward'),
    reload = document.getElementById('refresh'),
    historyPane = document.getElementById('history');

let historyList = []

function updateOmniboxAndHistory () {
  omni.value = view.getURL();
  historyList.push(view.getURL());
  historyPane.innerHTML += view.getURL() + "<br>";
}

function updateURL (event) {
  if (event.keyCode === 13) {
    omni.blur();
    let val = omni.value;
    // checking for protocol
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

omni.addEventListener('keydown', updateURL);
back.addEventListener('click', goBackView);
forward.addEventListener('click', goForwardView);
reload.addEventListener('click', reloadView);
view.addEventListener('did-finish-load', updateOmniboxAndHistory);
