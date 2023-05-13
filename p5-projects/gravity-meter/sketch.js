// https://editor.p5js.org/jht9629-nyu/sketches/bpsB_xmSH
// gravity-meter

let my = { width: 400, height: 400, rotX: 1, rotY: 0, rotZ: 0 };

function setup() {
  createCanvas(my.width, my.height, WEBGL);
  normalMaterial();
  create_ui();
}

function draw() {
  background(200);
  if (my.rotZ) rotateZ(radians(rotationZ));
  if (my.rotX) rotateX(radians(rotationX));
  if (my.rotY) rotateY(radians(rotationY));
  box(200, 200, 200);
  update_checkBox('chkX', 'rotationX', 'rotX');
  update_checkBox('chkY', 'rotationY', 'rotY');
  update_checkBox('chkZ', 'rotationZ', 'rotZ');
}

function create_ui() {
  my.permBtn = createButton('permission');
  my.permBtn.mousePressed(permissionAction);
  my.chkX = create_checkBox('rotX');
  my.chkY = create_checkBox('rotY');
  my.chkZ = create_checkBox('rotZ');
  // createElement('br');
  geoCreate_ui();
}

function create_checkBox(prop) {
  let chk = createCheckbox(prop, my[prop]);
  chk.changed(function () {
    my[prop] = this.checked();
  });
  return chk;
}

function update_checkBox(chkProp, valProp, label) {
  let ref = my[chkProp];
  let val = window[valProp];
  let isChecked = ref.checked();
  let str = label;
  if (isChecked) str += ' ' + val.toFixed(3);
  ref.elt.firstChild.lastChild.innerHTML = str;
}

// <div>
//   <label>
//     <input type="checkbox">
//     <span>rotY</span>
//   </label>
// </div>

function geoCreate_ui() {
  createButton('Get Location').mousePressed(geoFindAction);
  createElement('br');
  // my.status = createP();
  // my.mapLink = createA('https://www.google.com/', 'test link', '_blank');
  my.mapLink = createA('', '', '_blank');
}

function geoFindAction() {
  console.log('geoFindAction');
  let mapLink = my.mapLink.elt;
  // let status = my.status.elt;
  mapLink.href = '';
  // mapLink.textContent = '';
  function success(position) {
    const latitude = position.coords.latitude.toFixed(6);
    const longitude = position.coords.longitude.toFixed(6);
    // let accuracy = position.coords.accuracy;
    // status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.innerHTML = `La: ${latitude} °<br/> Lo: ${longitude} °`;
    // mapLink.innerHTML = `${latitude} ${longitude} ${accuracy}<br/>` + mapLink.innerHTML;
    mapLink.innerHTML = `${latitude} ${longitude}<br/>` + mapLink.innerHTML;
  }
  function error(err) {
    // status.textContent = 'Unable to retrieve your location';
    alert('geoFindAction err' + err);
  }
  if (!navigator.geolocation) {
    // status.textContent = 'Geolocation is not supported by your browser';
    alert('Geolocation is not supported by your browser');
  } else {
    // status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// Need for iOS mobile device to get motion events
function permissionAction() {
  if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
    // (optional) Do something before API request prompt.
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        console.log('requestPermission response', response);
        // (optional) Do something after API prompt dismissed.
        if (response == 'granted') {
          window.addEventListener('devicemotion', (e) => {
            // console.log('devicemotion e', e)
            // console.log('devicemotion e.beta', e.beta)
          });
        }
      })
      .catch(console.error);
  } else {
    alert('DeviceMotionEvent is not defined');
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

// https://editor.p5js.org/jht9629-nyu/sketches/TXvXSJY6L
// rotationXYZ

// https://p5js.org/reference/#/p5/rotationX

// https://editor.p5js.org/jht9629-nyu/sketches/G6Zr5SBuq
// rotationX