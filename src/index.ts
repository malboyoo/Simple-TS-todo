import { Todo } from "./interface";
import "./style/styles.css";

const input: HTMLInputElement = document.querySelector(".container input")!;
const form: HTMLFormElement = document.querySelector("form")!;
const ul: HTMLUListElement = document.querySelector(".container ul")!;

let todos: Array<Todo> = [];

// systeme de sauvegarde utilisant le localStorage:

const refreshStoredTodos = () => {
   localStorage.setItem("todos", JSON.stringify(todos));
};

// on initialise les todos sauvegardé dans le localstorage au lancement de la page
let savedTodos = JSON.parse(localStorage.getItem("todos")!);

if (savedTodos) {
   savedTodos.forEach((todo: Todo) => {
      todos.push(todo);
      console.log(todo);
   });
}

const displaytodo = () => {
   const todoNode: HTMLLIElement[] = todos.map((todo: Todo, index: number) => {
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

const editTodoElement = (todo: Todo, index: number): HTMLLIElement => {
   const li = document.createElement("li");

   // input

   const input = document.createElement("input");
   input.setAttribute("maxlength", "50");
   input.value = todo.text;

   // save
   const saveButton: HTMLButtonElement = document.createElement("button");
   saveButton.textContent = "Sauvegarder";
   saveButton.addEventListener("click", () => {
      saveModification(index, input.value);
   });

   // cancel
   const cancelButton: HTMLButtonElement = document.createElement("button");
   cancelButton.textContent = "Annuler";
   cancelButton.addEventListener("click", () => {
      cancelModification(index);
   });

   //li content

   li.appendChild(input);
   li.appendChild(saveButton);
   li.appendChild(cancelButton);

   return li;
};

const createTodoElement = (todo: Todo, index: number): HTMLLIElement => {
   const li: HTMLLIElement = document.createElement("li");

   // button DELETE
   const buttonDelete: HTMLButtonElement = document.createElement("button");
   buttonDelete.textContent = "Supprimer";
   buttonDelete.addEventListener("click", (event: MouseEvent) => {
      todos.splice(index, 1);
      displaytodo();
      refreshStoredTodos();
      event.stopPropagation();
   });

   // button modifier
   const buttonModify = document.createElement("button");
   buttonModify.textContent = "Modifier";
   buttonModify.addEventListener("click", (event: MouseEvent) => {
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
   li.addEventListener("click", () => {
      toggleTodo(index);
   });
   return li;
};

form.addEventListener("submit", (event: Event) => {
   addTodo(input.value);
   displaytodo();
   input.value = "";
   event.preventDefault();
});

const addTodo = (text: string) => {
   todos.push({
      text: text,
      done: false,
      editMode: false,
   });
   displaytodo();
};

const toggleTodo = (index: number) => {
   todos[index].done = todos[index].done ? false : true;
   displaytodo();
};

const switchToEditMode = (index: number) => {
   todos[index].editMode = !todos[index].editMode;
   displaytodo();
};

const saveModification = (index: number, inputValue: string) => {
   todos[index].text = inputValue;
   todos[index].editMode = false;
   displaytodo();
};

const cancelModification = (index: number) => {
   todos[index].editMode = false;
   displaytodo();
};

displaytodo();
