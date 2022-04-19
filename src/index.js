import "./styles.css";
const input = document.querySelector(".container input");
const form = document.querySelector("form");
const ul = document.querySelector(".container ul");

const todos = [];

// history.state

// loadingthe history.state
history.state.forEach((todo) => {
   todos.push(todo);
});

// saving the history
setInterval(() => {
   history.pushState(todos, "");
   console.log(history.state);
}, 3000);

const displaytodo = () => {
   const todoNode = todos.map((todo, index) => {
      if (todo.editMode == false) {
         return createTodoElement(todo, index);
      } else {
         return editTodoElement(todo, index);
      }
   });
   ul.innerHTML = "";
   ul.append(...todoNode);
};

const editTodoElement = (todo, index) => {
   const li = document.createElement("li");

   // input

   const input = document.createElement("input");
   input.setAttribute("maxlength", "50");
   input.value = todo.text;

   // save
   const saveButton = document.createElement("button");
   saveButton.textContent = "Sauvegarder";
   saveButton.addEventListener("click", (event) => {
      saveModification(index, input.value);
   });

   // cancel
   const cancelButton = document.createElement("button");
   cancelButton.textContent = "Annuler";
   cancelButton.addEventListener("click", (event) => {
      cancelModification(index);
   });

   //li content

   li.appendChild(input);
   li.appendChild(saveButton);
   li.appendChild(cancelButton);

   return li;
};

const createTodoElement = (todo, index) => {
   const li = document.createElement("li");

   // button DELETE
   const buttonDelete = document.createElement("button");
   buttonDelete.textContent = "Supprimer";
   buttonDelete.addEventListener("click", (event) => {
      // deleteTodo(index);
      todos.splice(index, 1);
      displaytodo();
      event.stopPropagation();
   });

   // button modifier
   const buttonModify = document.createElement("button");
   buttonModify.textContent = "Modifier";
   buttonModify.addEventListener("click", (event) => {
      switchToEditMode(index);
      event.stopPropagation();
   });

   // paragraphe

   const p = document.createElement("p");
   p.textContent = todo.text;

   // li Content
   li.innerHTML = `<span class="todo ${todo.done ? "done" : ""}"></span>`;
   li.appendChild(p);
   li.appendChild(buttonModify);
   li.appendChild(buttonDelete);
   li.addEventListener("click", (event) => {
      toggleTodo(index);
   });
   return li;
};

form.addEventListener("submit", (event) => {
   addTodo(input.value);
   displaytodo();
   input.value = "";
   event.preventDefault();
});

const addTodo = (text) => {
   todos.push({
      text: text,
      done: false,
      editMode: false,
   });
   displaytodo();
};

// const deleteTodo = (index) => {
//    todos.splice(index, 1);
//    displaytodo();
// };

const toggleTodo = (index) => {
   todos[index].done = todos[index].done ? false : true;
   displaytodo();
};

const switchToEditMode = (index) => {
   todos[index].editMode = !todos[index].editMode;
   displaytodo();
};

const saveModification = (index, inputValue) => {
   todos[index].text = inputValue;
   todos[index].editMode = false;
   displaytodo();
};

const cancelModification = (index) => {
   todos[index].editMode = false;
   displaytodo();
};

displaytodo();
