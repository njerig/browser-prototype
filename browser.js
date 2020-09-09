let omni = document.getElementById('url'),
    view = document.getElementById('view'),
    forward = document.getElementById('forward'),
    reload = document.getElementById('refresh'),
    historyPane = document.getElementById('history');

class HistoryNode {
  constructor(url) {
    this.url = url;
    this.next = null;
    this.prev = null;
    this.timestamp = new Date();
  }
  toString() {
    return this.url;
  }
}

class History {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    const newNode = new HistoryNode(val);
    // if there's no history, make newNode the head and tail
    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // append newNode to tail
      this.tail.next = newNode;
      newNode.prev = this.tail;
      // now make newNode current tail
      this.tail = newNode;
    }
    this.length += 1;

    return newNode;
  }

  pop() {
    /*
      - if history is empty, return null
      - if history has 1 node
        - save current tail
        - set head and tail to null
        - decrease length by 1
        - return old tail
      - else
        - save current tail
        - set node before current tail as new tail
        - remove connection from new tail to old tail
        - remove connection from old tail to new tail
        - decrease length by 1
        - return old tail
    */
    if (!this.length) {
      return null;
    } else {
      let nodeToRemove = this.tail;
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
        nodeToRemove.prev = null;
      }
      this.length -= 1;
      return nodeToRemove;
    }
  }

  get(index) {
    // if list is empty, if index is less than 0, or if index is greater than or equal to the list length, return null
    if (!this.length || index < 0 || index >= this.length) {
      return null;
    } else {
      let currentNode;

      // if the desired node is in the bottom half of the list
      if (index < this.length / 2) {
        // add counter, starting from 0 and counting upwards in the loop
        let counter = 0;

        // start from the head
        currentNode = this.head;

        // go to the next node until we found our desired node
        while (counter < index) {
          currentNode = currentNode.next;
          counter += 1;
        }
      } else {
        // add counter, starting from the top and counting downwards in the loop
        let counter = this.length - 1;

        // start from the tail
        currentNode = this.tail;

        // go to the previous node until we found our desired node
        while (counter > index) {
          currentNode = currentNode.prev;
          counter -= 1;
        }
      }

      // return node
      return currentNode;
    }
  }
}

let browserHistory = new History;

function updateOmniboxAndHistory () {
  omni.value = view.getURL();
  browserHistory.push(view.getURL());
  //historyPane.innerHTML += view.getURL() + "<br>";
  /*
    - add url to history array
    - if the last URL is the same as the one before it,
      pop it from the array
    - 
  */
  if (browserHistory.length > 1) {
    if (browserHistory.tail.url === browserHistory.tail.prev.url) {
      browserHistory.pop();
      console.log('reload URL deleted');
      console.log(browserHistory.tail);
      console.log(browserHistory.tail.prev);
    } else {
      historyPane.innerHTML += browserHistory.get(browserHistory.length - 1) + "<br>";
    }
  }
  
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

function showHistory() {
      document.getElementById("history").style.display = "block";
      document.getElementById("history").style.width = "260px";
      document.getElementById('openHistory').style.display = "none";
      document.getElementById('main').style.marginLeft= "280px";
}

function hideHistory() {
  document.getElementById("history").style.display = "none";
  document.getElementById('openHistory').style.display = "block";
  document.getElementById('main').style.marginLeft= "0";
}

omni.addEventListener('keydown', updateURL);
back.addEventListener('click', goBackView);
forward.addEventListener('click', goForwardView);
reload.addEventListener('click', reloadView);
view.addEventListener('did-finish-load', updateOmniboxAndHistory);
