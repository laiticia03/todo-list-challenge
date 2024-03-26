
const newTaskForm = document.getElementById("new-task-form");
const newTaskInput = document.getElementById("new-task-input");
const todoList = document.getElementById("todo-list");

// Handle form submission
newTaskForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const newTaskText = newTaskInput.value;
  if (newTaskText.trim() === "") return;

  const newTaskItem = document.createElement("li");
  newTaskItem.classList.add("todo-item");
  newTaskItem.innerHTML = `
    <span class="item-text">${newTaskText}</span>
    <button class="edit-button">Edit</button>
    <button class="complete-button">Complete</button>
    <button class="delete-button">Delete</button>
  `;

  todoList.appendChild(newTaskItem);
  newTaskInput.value = "";

  // Save the new task to local storage
  saveTasksToLocalStorage();
});

// Handle task completion
todoList.addEventListener("click", function(event) {
  if (event.target.matches(".complete-button")) {
    const taskItem = event.target.closest(".todo-item");
    taskItem.classList.toggle("completed");

    // Update the text decoration of the task text
    const taskText = taskItem.querySelector(".item-text");
    if (taskItem.classList.contains("completed")) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }

    // Save the updated task to local storage
    saveTasksToLocalStorage();
  }
});

// Handle task editing
todoList.addEventListener("click", function(event) {
  if (event.target.matches(".edit-button")) {
    const taskItem = event.target.closest(".todo-item");
    const taskText = taskItem.querySelector(".item-text");

    // Create an input field and replace the task text with it
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText.textContent;
    taskItem.replaceChild(editInput, taskText);

    // Focus the input field
    editInput.focus();

    // Handle input field submission
    editInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();

        // Create a new task text element and replace the input field with it
        const newTaskText = document.createElement("span");
        newTaskText.classList.add("item-text");
        newTaskText.textContent = editInput.value.trim();
        taskItem.replaceChild(newTaskText, editInput);

        // Save the updated task to local storage
        saveTasksToLocalStorage();
      }
    });

    // Handle input field blur
    editInput.addEventListener("blur", function() {
      if (editInput.value.trim() === "") {
        // Remove the task item if the input field is empty
        taskItem.remove();
      } else {
        // Create a new task text element and replace the input field with it
        const newTaskText = document.createElement("span");
        newTaskText.classList.add("item-text");
        newTaskText.textContent = editInput.value.trim();
        taskItem.replaceChild(newTaskText, editInput);

        // Save the updated task to local storage
        saveTasksToLocalStorage();
      }
    });
  }
});

// Handle task deletion
todoList.addEventListener("click", function(event) {
  if (event.target.matches(".delete-button")) {
    const taskItem = event.target.closest(".todo-item");
    todoList.removeChild(taskItem);

    // Save the updated task list to local storage
    saveTasksToLocalStorage();
  }
});


