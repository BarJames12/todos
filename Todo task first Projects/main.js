load();
function onAddNote() {
  let note = document.getElementById("note").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  try {
    isValidInput(note, date);
    saveLocalNote();
    load();
    resetInput();
  } catch (e) {
    console.log(e.message);
  }
}
// Delete All note button from storage   ------------------------
function onDeleteAllNote() {
  let msg = confirm("Delete all notes?");
  if (msg == true) {
    let removeNotes = document.getElementById("notesContainer");
    removeNotes.parentNode.removeChild(removeNotes);
    localStorage.removeItem("notesKey");
    localStorage.removeItem("notesCounter");
    location.reload();
  } else {
    return;
  }
}
// Clear note button  -------------------------
function onClearNote() {
  resetFields();
  note = document.getElementById("note").value = "";
  date = document.getElementById("date").value = "";
}
// Inputs Validation -------------------------
function isValidInput(note, date) {
  resetFields();
  isValid = true;

  if (isEmptyField(note)) {
    showError("note", "");
    isValid = false;
  }
  if (isEmptyField(date)) {
    showError("date", "");
    isValid = false;
  }
  if (!isValid) {
    throw new Error("Validation error");
  }
}
// Is input empty validation -------------------------
function isEmptyField(field) {
  if (field == "" || field == null) {
    return true;
  }
  return false;
}
// create new divs for text ,date ,time
function creatNewDivs() {
  textDiv = document.createElement("div");
  dateDiv = document.createElement("div");
  timeDiv = document.createElement("div");
}
// notes div append the text, date time divs -----------------
function appendTheDives(newDiv) {
  newDiv.append(textDiv);
  newDiv.append(timeDiv);
  newDiv.append(dateDiv);
}
//  Set Attribute to the dives -----------------------------
function setAttToDivs(newDiv, noteArray, index) {
  newDiv.setAttribute("id", noteArray[index].id);
  newDiv.setAttribute("class", "note-card");
  textDiv.setAttribute("class", "text-div");
  dateDiv.setAttribute("class", "date-div");
  timeDiv.setAttribute("class", "time-div");
}
// Create delete button inside the note   ------------------
function createDeleteBtn(newDiv, noteArray) {
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "fas fa-trash-alt");
  newDiv.append(deleteBtn);
  deleteBtn.addEventListener("click", function (e) {
    let removeCardDiv = e.target.parentElement;
    notesContainer.removeChild(removeCardDiv);

    removeNotesFromStr(noteArray, newDiv.id);
  });
}
// Put the info from the Local Storage into the notes  -------------
function giveNotesInfoFromStr(noteArray, index) {
  textDiv.innerHTML = "-" + noteArray[index].note;
  dateDiv.innerHTML = noteArray[index].date;
  timeDiv.innerHTML = noteArray[index].time;
}
// Create red error to the inputs   -----------------------------
function showError(id, message) {
  let node = document.getElementById(id);
  node.style.border = "3px solid red";
  let errorsNode = document.getElementById(id + "-error");
  errorsNode.innerHTML = message;
}
// clear inputs function  --------------------------------------
function resetInput() {
  note = document.getElementById("note").value = "";
  date = document.getElementById("date").value = "";
  time = document.getElementById("time").value = "";
}
// clean red error from input functions  ---------------------------
function resetFields() {
  cleanErrorFromElement("note");
  cleanErrorFromElement("date");
  cleanErrorFromElement("time");
}
function cleanErrorFromElement(id) {
  let node = document.getElementById(id);
  node.style.border = "";
}

// ---------------- Save to Local Storage  ----------------//
function saveLocalNote() {
  let strNotesCounter = localStorage.getItem("notesCounter");
  note = document.getElementById("note");
  date = document.getElementById("date");
  time = document.getElementById("time");
  let notesCounter;
  if (!strNotesCounter) {
    notesCounter = 0;
  } else {
    notesCounter = JSON.parse(strNotesCounter);
  }

  let allNote = {
    note: note.value,
    date: date.value,
    time: time.value,
    id: notesCounter++,
  };

  localStorage.setItem("notesCounter", JSON.stringify(notesCounter));

  let strNotes = localStorage.getItem("notesKey");
  let noteArray;
  if (!strNotes) {
    noteArray = [];
  } else {
    noteArray = JSON.parse(strNotes);
  }
  noteArray.push(allNote);
  localStorage.setItem("notesKey", JSON.stringify(noteArray));
}
// ----------------   Load from Loacl Storage ----------------//
function load() {
  let strNotes = localStorage.getItem("notesKey");
  if (!strNotes) {
    return;
  }
  let noteArray = JSON.parse(strNotes);
  let container = document.getElementById("notesContainer");
  container.innerHTML = "";

  for (let index = 0; index < noteArray.length; index++) {
    let newDiv = document.createElement("div");
    creatNewDivs();
    createDeleteBtn(newDiv, noteArray);
    appendTheDives(newDiv);
    setAttToDivs(newDiv, noteArray, index);
    giveNotesInfoFromStr(noteArray, index);

    notesContainer.append(newDiv);
  }
}
// ---------- Remove note from Local storage ----------//
function removeNotesFromStr(noteArray, allNoteId) {
  for (let index = 0; index < noteArray.length; index++) {
    if (noteArray[index].id == allNoteId) {
      noteArray.splice(index, 1);
    }
  }
  localStorage.setItem("notesKey", JSON.stringify(noteArray));
}
