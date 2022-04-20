import "./styles.css";
const input = document.querySelector(".container input");
const form = document.querySelector("form");
const ul = document.querySelector(".container ul");

let todos = [];

// systeme de sauvegarde utilisant le localStorage:

const refreshStoredTodos = () => {
   localStorage.setItem("todos", JSON.stringify(todos));
};

// on initialise les todos sauvegardé dans le localstorage au lancement de la page
let savedTodos = JSON.parse(localStorage.getItem("todos"));

if (savedTodos) {
   savedTodos.forEach((todo) => {
      todos.push(todo);
      console.log(todo);
   });
}

const displaytodo = () => {
   const todoNode = todos.map((todo, index) => {
      if (todo.editMode == false) {
         refreshStoredTodos();
         return createTodoElement(todo, index);
      } else {
         refreshStoredTodos();
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
      todos.splice(index, 1);
      displaytodo();
      refreshStoredTodos();
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
