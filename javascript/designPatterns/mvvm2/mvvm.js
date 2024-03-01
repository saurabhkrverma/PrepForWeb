class Model {
    constructor(name) {
        this.name = name;
    }

    updateName(newName){
        this.name = newName
    }
}

class ViewModel {
    constructor(model) {
        this.model = model;

        // get refs of your view
        this.nameLabel = document.getElementById("nameLabel");
        this.nameInput = document.getElementById("nameInput");
        this.nameSubmit = document.getElementById("nameSubmit");


        //bindings
        this.nameInputValue = ""

        // renderView
        // this.renderView();
        this.initiateBindings();

    }
    updateName(newName="") {
        this.model.updateName(newName.trim());
        this.nameInputValue="";
        this.updateBindings();
    }

    initiateBindings(){
        const bindElems = document.querySelectorAll("[data-bind]");
        bindElems.forEach((elem)=>{
            const binding = elem.getAttribute("data-bind");
            const [key, value] = binding.split(": ");
            switch(key){
                case "value":{
                    elem.innerHTML = this.model[value];
                    break;
                }
                case "input":{
                    elem.addEventListener("input",(e)=>{
                        this[value] = e.target.value;
                    });
                    elem.value = this[value];
                    break;
                }
                case "click": {
                    elem.addEventListener("click", (e)=>{
                        this[value](this.nameInputValue);
                    })
                    break;
                }
            }
        })
    }

    updateBindings(){
        const bindElems = document.querySelectorAll("[data-bind]");
        bindElems.forEach((elem)=>{
            const binding = elem.getAttribute("data-bind");
            const [key, value] = binding.split(": ");
            switch(key){
                case "value":{
                    elem.innerHTML = this.model[value];
                    break;
                }
                case "input":{
                    elem.value = this[value];
                    break;
                }
            }
        })
    }
}

const model = new Model("saurabh");
const viewModel = new ViewModel(model);