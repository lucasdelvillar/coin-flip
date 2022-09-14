//TODO: fix so that on a previous tails turn it, img doesn't switch

const coin = document.querySelector(".coin")
const flipBtn = document.querySelector("#flip-button")
const resetBtn = document.querySelector("#reset-button")

// Can't modify JSON without put request, counters need to be client side for now
// why? because client-side JS runs in browser and can only access things in the browser. My server is on my laptop. client-side JS can't access my laptop as a security measure
let heads = 0
let tails = 0

flipBtn.addEventListener('click', makeReq)

async function makeReq(){

  const res = await fetch(`/api`)
  const data = await res.json()

  // console.log(data);
  flipAndTrackCoin(data)
  updateStats(3000)
  disableButton()
}
// animates and tracks coin - 1 represents heads, 0 represents tails
function flipAndTrackCoin(data) {
  // reset animation
    coin.style.animation = 'none'

  if (data.coin){
    setTimeout(() => {
      coin.style.animation = 'spin-heads 3s forwards'
      heads++
    }, 100)
  } else {
    setTimeout(() => {
      coin.style.animation = 'spin-tails 3s forwards'
      tails++
    }, 100)
  }
}
// updates counters with a specified delay
function updateStats(delay){
    setTimeout(() => {
      document.querySelector("#heads-count").textContent = `Heads: ${heads}`
      document.querySelector("#tails-count").textContent = `Tails: ${tails}`
    },delay)

}
// prevents double clicking "flip" button
function disableButton(){
    flipBtn.disabled = true;
    setTimeout(function(){
        flipBtn.disabled = false;
    },3000)
}
// resets coin flip
resetBtn.addEventListener('click',() => {
    coin.style.animation = 'none'
    heads = 0
    tails = 0
    updateStats(0)
});
