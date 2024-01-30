chrome.alarms.create("PromodoroTimer", {
  periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "PromodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1
        let isRunning = true
        if (timer === 60 * res.timeOption) {
          this.registration.showNotification("Promodoro Timer", {
            body: `${res.timeOption} minutes has passed`,
            icon: "icon.png",
          })

          timer = 0
          isRunning = false
        }

        chrome.storage.local.set({
          timer: timer,
          isRunning: isRunning,
        })
      }
    })
  }
})

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timeOption: "timeOption" in res ? res.timeOption : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  })
})
