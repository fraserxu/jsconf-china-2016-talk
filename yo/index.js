var yo = require('yo-yo')

var interval
var winner_number = null
var el = machine(winner_number, update)

function machine (winner_number, update) {
  function onclick () {
    update()
    interval = setInterval(update, 100)
    setTimeout(function() {
      clearInterval(interval)
    }, 2000)
  }
  return yo`
    <div>
      Suprise goes to ${winner_number}
      <br />
      <button onclick=${onclick}>Go!</button>
    </div>
  `
}

function update () {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  winner_number = getRandomInt(0, 700)
  var newEl = machine(winner_number, update)
  yo.update(el, newEl)
}




document.body.appendChild(el)
