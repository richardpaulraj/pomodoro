const timeOption = document.getElementById("time-option")
timeOption.addEventListener("change", (e) => {
  const value = e.target.value
  if (value < 1 || value > 60) {
    timeOption.value = 25
  }
})

const saveBtn = document.getElementById("save-btn")

saveBtn.addEventListener("click", (e) => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
    timeOption: timeOption.value,
  })
})

chrome.storage.local.get(["timeOption"], (res) => {
  timeOption.value = res.timeOption
})
