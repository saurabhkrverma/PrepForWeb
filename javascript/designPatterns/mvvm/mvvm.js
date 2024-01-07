class Model {
    #id=0
    constructor() {
        let _id = 0
        this.todos= []
    }

    generateId() {
        return ++this.#id;
    }
    addTodo(text = "") {
        if(text !== ""){
            const todo = {
                id: this.generateId(), // use Date.now()
                text: text
            }
            this.todos.push(todo);
        }
    }
}


class ViewModel {
    constructor(model) {
        // get hold of model
        this.model = model;
        // get hold of view
        this.app = document.getElementById("app");
        this.todoInput = document.getElementById("todoInput");
        this.todoButton = document.getElementById("todoSubmit");
        this.todoList = document.getElementById("todoList");

        // attach events to do DOM manipulation
        this.todoButton.addEventListener("click", this.addTodo.bind(this));
    }
    renderView() {
        // clear the list
        this.todoList.innerHTML = "";
        this.model?.todos?.forEach((todo)=>{
            const listItem = document.createElement("li");
            const text = document.createElement("span")
            text.innerHTML = todo.text;
            listItem.appendChild(text);
            this.todoList.appendChild(listItem);
        })
    }

    addTodo(e) {
        e.preventDefault()
        const value = this.todoInput.value?.trim();
        this.model.addTodo(value);
        this.todoInput.value = "";
        this.renderView()
    }

}

// const viewModel = new ViewModel(new Model());

// let try data bindings
class ViewModel2 {
    constructor(model) {
        // add model
        this.model = model;
        // get hold of view
        this.app = document.getElementById("app");
        this.todoInput = document.getElementById("todoInput");
        this.todoButton = document.getElementById("todoSubmit");
        this.todoList = document.getElementById("todoList");

        // initiateBindings
        this.todoInputValue = "";
        this.initiateBindings();

    }



    addTodo() {
        this.model.addTodo(this.todoInputValue);
        this.todoInputValue = "";
        this.updateBindings()
    }

    initiateBindings(){
        // find elements with bindings
        let bindedElems = document.querySelectorAll("[data-bind]");
        bindedElems.forEach((elem)=>{
            const binding = elem.getAttribute("data-bind");
            const [key, value] = binding.split(": ");
            switch(key){
                case "value": {
                    elem.addEventListener("input", (e)=>{
                        this[value] = e.target.value;
                    })
                    elem.value = this[value];
                    break;
                }
                case "click": {
                    elem.addEventListener(key, (e)=>{
                        e.preventDefault();
                        this[value]();
                    })
                    break;
                }
                case "forEach": {
                    elem.innerHTML = "";
                    this?.model[value].forEach((todo)=>{
                        let listElem = document.createElement("li");
                        let text = document.createElement("span")
                        text.innerHTML = todo.text;
                        listElem.appendChild(text);
                        elem.appendChild(listElem);
                    })
                }
            }
        })
    }

    updateBindings(){
        // find elements with bindings
        let bindedElems = document.querySelectorAll("[data-bind]");
        bindedElems.forEach((elem)=>{
            const binding = elem.getAttribute("data-bind");
            const [key, value] = binding.split(": ");
            switch(key){
                case "value": {
                    elem.value = this[value];
                    break;
                }
                case "forEach": {
                    elem.innerHTML = "";
                    this?.model[value].forEach((todo)=>{
                        let listElem = document.createElement("li");
                        let text = document.createElement("span")
                        text.innerHTML = todo.text;
                        listElem.appendChild(text);
                        elem.appendChild(listElem);
                    })
                    break;
                }
            }
        })
    }
}

const viewModel = new ViewModel2(new Model());