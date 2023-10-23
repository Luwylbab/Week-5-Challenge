// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Get the current date using Day.js
var currentDate = dayjs().format("dddd, MMMM D, YYYY");

document.getElementById("currentDay").textContent = currentDate;


// Get the current hour using Day.js
var currentHour = dayjs().hour();


//Makes the hours only between 9AM-5PM appear, and applies the color coding to each box.
for (var hour = 9; hour <= 17; hour++) {

  //If statement that applies the class to each time box
  var timeBlock = $('<div>').attr('id','hour-' + hour).addClass('row time-block');
    if (hour < currentHour) {
      timeBlock.addClass("past")
    }
      else if (hour === currentHour) {
        timeBlock.addClass("present")
      }
      else {
        timeBlock.addClass('future')
      }
  
  //If statement that displays the times for each time box
  var displayHour;
      if (hour > 12) {
        displayHour = hour - 12 + "PM";
      }
      else {
       displayHour = hour + "AM";
      }

  //creates the duv for the time display
  var hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(displayHour);

  //creates the textbox
  var textarea = $('<textarea>').addClass("col-8 col-md-10 description").attr('rows', 3);

  //creates the save button
  var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>').attr('id', hour).on('click', function(e){
    saveText(this.getAttribute('id'))
  })

  //Puts the hourDiv, textarea, saveButton within the timeBlock div
  timeBlock.append(hourDiv);
  timeBlock.append(textarea);
  timeBlock.append(saveButton);

  $(".container-lg").append(timeBlock);
}

// Function to save the text input into local storage
function saveText(hour) {
  var textarea = document.getElementById("hour-" + hour).querySelector("textarea");
  var text = textarea.value.trim();

  // If statement that checks if the text is not empty
  if (text !== "") {
    localStorage.setItem("hour-" + hour, text);
  }
}

// Function to load the saved text from local storage and display it on the page
function loadSavedText() {
  for (var hour = 9; hour <= 17; hour++) {
    var text = localStorage.getItem("hour-" + hour);
    var textarea = document.getElementById("hour-" + hour).querySelector("textarea");

    if (text) {
      textarea.value = text;
    }
  }
}

// Call the function to load the saved text when the page loads
loadSavedText();
});