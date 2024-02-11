chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    title: 'hacking',
    id: 'contextMenu1',
    contexts: ['selection'],
  })
  chrome.contextMenus.onClicked.addListener((event) => {
    console.log(event.selectionText)
  })
  chrome.contextMenus.create({
    title: 'text conetext menu 1',
    id: 'contextMenu2',
    parentId: 'contextMenu1',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    title: 'text conetext menu 2',
    id: 'contextMenu3',
    parentId: 'contextMenu1',
    contexts: ['selection'],
  })
})

chrome.alarms.create('PromodoroTimer', {
  periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'PromodoroTimer') {
    chrome.storage.local.get(['timer', 'isRunning', 'timeOption'], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1
        let isRunning = true
        if (timer === 60 * res.timeOption) {
          this.registration.showNotification('Promodoro Timer', {
            body: `${res.timeOption} minutes has passed`,
            icon: 'icon.png',
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

chrome.storage.local.get(['timer', 'isRunning', 'timeOption'], (res) => {
  chrome.storage.local.set({
    timer: 'timer' in res ? res.timer : 0,
    timeOption: 'timeOption' in res ? res.timeOption : 25,
    isRunning: 'isRunning' in res ? res.isRunning : false,
  })
})

chrome.storage.local.get(['daysLeft'], (res) => {
  chrome.action.setBadgeText({
    text: res.daysLeft.toString(),
  })
  chrome.action.setBadgeBackgroundColor({
    color: '#DFFF00',
  })
  chrome.action.setTitle({
    title: 'Days Left for Something Special',
  })
})
