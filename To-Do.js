const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const popupElement = document.querySelector(".popup-wrapper");

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  if (taskInput.value === "") {
    // alert("Please enter the Task");
    popupElement.classList.add("warning");
    taskInput.blur();
    popupElement.querySelector("button").addEventListener("click", () => {
      if (popupElement.classList.contains("warning")) {
        popupElement.classList.remove("warning");
        taskInput.focus();
      }
    });
    return;
  }

  const listItems = document.createElement("li");

  const taskText = document.createElement("p");
  taskText.classList.add("task");
  taskText.innerText = taskInput.value;
  taskText.contentEditable = false;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "task-button";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = `
  <svg height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
       viewBox="0 0 512 512" xml:space="preserve">
      <circle style="fill:#fff;" cx="256" cy="256" r="256"/>
      <path style="fill:#fff;" d="M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z"/>
      <polygon style="fill:#272727;" points="365.904,184.885 327.115,146.096 256,217.211 184.885,146.096 146.096,184.885 217.211,256 
          146.096,327.115 184.885,365.904 256,294.789 327.115,365.904 365.904,327.115 294.789,256 "/>
      <polygon style="fill:#272727;" points="365.904,184.885 327.115,146.096 256,217.211 256,294.789 327.115,365.904 365.904,327.115 
          294.789,256 "/>
  </svg>`;
  deleteButton.onclick = function () {
    taskList.removeChild(listItems);
  };

  const completeButton = document.createElement("input");
  completeButton.type = "checkbox";
  completeButton.onclick = function () {
    taskText.classList.toggle("complete");
  };

  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerText = "Edit";
  editButton.onclick = function () {
    if (editButton.innerText === "Edit") {
      taskText.contentEditable = true;
      taskText.focus();

      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(taskText);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);

      editButton.innerText = "Save";
    } else {
      taskText.contentEditable = false;
      editButton.innerText = "Edit";
    }
  };

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  listItems.appendChild(completeButton);
  listItems.appendChild(taskText);
  listItems.appendChild(buttonContainer);
  taskList.appendChild(listItems);

  taskInput.value = "";
}
