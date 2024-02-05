//Promodoro Time

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
  }
})

const datePickerSaveBtn = document.getElementById('datePicker-save-btn')
datePickerSaveBtn.addEventListener('click', () => {
  let selectedDatevalue = datePicker.value
  console.log(selectedDatevalue)
  chrome.storage.local.set({
    selectedDate: selectedDatevalue,
  })
})

//adding the functionality
let targetDate = new Date('')
