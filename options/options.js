//Promodoro Time
const datePickerEnableBtn = document.getElementById('datePicker-enable-btn')
let datePickerFlag = false

const timeOption = document.getElementById('time-option')
timeOption.addEventListener('change', (e) => {
  const value = e.target.value
  if (value < 1 || value > 60) {
    timeOption.value = 25
  }
})

const promodoroSaveBtn = document.getElementById('promodoro-save-btn')

promodoroSaveBtn.addEventListener('click', (e) => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
    timeOption: timeOption.value,
  })
})

chrome.storage.local.get(['timeOption'], (res) => {
  timeOption.value = res.timeOption
})

//Date Picker

const datePicker = document.getElementById('datePicker')

let today = new Date()
let dd = String(today.getDate()).padStart(2, '0')
let mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
let yyyy = today.getFullYear()

today = yyyy + '-' + mm + '-' + dd

datePicker.setAttribute('min', today)
// datePicker.addEventListener('change', (e) => {
//   console.log(datePicker.value)
// })

//get saved date
chrome.storage.local.get('selectedDate', (e) => {
  if (e.selectedDate) {
    datePicker.value = e.selectedDate
    setDateOnBadgeText(e.selectedDate)
  }
})

const datePickerSaveBtn = document.getElementById('datePicker-save-btn')
datePickerSaveBtn.addEventListener('click', () => {
  let selectedDatevalue = datePicker.value
  console.log(selectedDatevalue)
  chrome.storage.local.set({
    selectedDate: selectedDatevalue,
  })
  setDateOnBadgeText(selectedDatevalue)
})

//adding the functionality

function setDateOnBadgeText(finalDate) {
  let targetDate = new Date(finalDate)
  let currentDate = new Date()

  // Set both dates to the beginning of the day to avoid time discrepancies.
  targetDate.setHours(0, 0, 0, 0)
  currentDate.setHours(0, 0, 0, 0)

  let difference = targetDate.getTime() - currentDate.getTime()
  // 1000 milliseonds is 1 seconds
  //.getTime gives in milliseconds
  let daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24))

  chrome.storage.local.set({
    daysLeft: daysLeft,
  })

  //Displaying
  chrome.action.setBadgeText({
    text: daysLeft.toString(),
  })

  console.log(`Days left : ${daysLeft} days`)
}

datePickerEnableBtn.addEventListener('click', (e) => {
  datePickerFlag = !datePickerFlag

  if (!datePickerFlag) {
    chrome.storage.local.get(['daysLeft'], (e) => {
      datePickerEnableBtn.textContent = 'Enabled'
      chrome.action.setBadgeText({
        text: e.daysLeft.toString(),
      })
    })
  } else {
    datePickerEnableBtn.textContent = 'Disabled'
    chrome.action.setBadgeText({ text: '' })
  }
})
