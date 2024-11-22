function addTask(){
  var taskInput =  document.getElementById("new-task")
  var taskList = document.getElementById("taskList")

  if(taskInput.value===""){
    alert("Please enter the Task")
    return
  }

  var listItems = document.createElement('li')
  
  var taskText = document.createElement("span");
  taskText.innerText = taskInput.value;
  taskText.contentEditable = false; 

  var buttonContainer = document.createElement('div')
  buttonContainer.className = 'task-button'

  var deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  deleteButton.onclick = function(){
    taskList.removeChild(listItems)
  }

  var completeButton = document.createElement('button')
  completeButton.innerText = 'Complete'
  completeButton.onclick = function(){
    taskText.classList.toggle('Complete')
  }

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.onclick = function () {
    if (editButton.innerText === "Edit") {
      taskText.contentEditable = true
      taskText.focus()

      var range = document.createRange();
      var sel = window.getSelection();
      range.selectNodeContents(taskText);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      
      editButton.innerText = "Save"
    } else {
      taskText.contentEditable = false
      editButton.innerText = "Edit"
    }
  }

  buttonContainer.appendChild(deleteButton)
  buttonContainer.appendChild(completeButton)
  buttonContainer.appendChild(editButton)

  listItems.appendChild(taskText)
  listItems.appendChild(buttonContainer)
  taskList.appendChild(listItems)

taskInput.value=''
}