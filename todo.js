let textInput = document.querySelector('.input_box');
let ul = document.querySelector('.lists');
let btn = document.querySelectorAll(".buttons");

let todoList = []

// Call this function on submit button click
function displayTodo(allTodo){
    ul.innerHTML = null;
    allTodo.forEach((obj,i ) => {

    const li = document.createElement('li');
    const check = document.createElement('input');
    check.type = "checkbox";
    check.setAttribute("data-id",obj.id)
    if(obj.check == true){
        check.setAttribute("checked",'');
    }
    check.addEventListener("click",handelCheckbox);

    const para = document.createElement('p'); //<p></p>
    para.classList.add("todo_prop");
    para.innerText = obj.value;
    const span = document.createElement('span');
    span.setAttribute("data-id",obj.id)

    span.innerText = "X";
    span.addEventListener("click",deleteTodo);

    // add text inside li (innerText) <li>Learn</li>
    li.appendChild(check);
    li.appendChild(para);
    li.appendChild(span);
    // append it to ul
    ul.appendChild(li);
    })
    document.querySelector(".item_left").innerText = `${todoList.filter(e=>e.check === false).length} Items left`
}

function handelCheckbox(e){
    let clear_btn = document.querySelector(".bottem_btn")
    console.log(e.target.dataset.id);
    let id = e.target.dataset.id;
    let index;
    todoList.forEach((obj,i)=>{
        if(obj.id == id) {
            index = i;
        }
    }) 
    todoList[index].check = !todoList[index].check;
    function handle_clear_comp(){
        // clr_comp.innerText = "";
        // clr_comp.innerText = " Clear Completed";
        // if (todoList[index].check){
        //     // console.log('checking');
        //     clr_comp.addEventListener("click",deleteTodo);
        let allDone = todoList.filter(todo => todo.check === true)
        if(allDone.length > 0){
            const clear = document.querySelector("#clrComplete");
            clear.innerText = "Clear Completed";
            clear.addEventListener('click', () => {
                 todoList = todoList.filter(todo => todo.check !== true);
                displayTodo(todoList);
                document.querySelector("#clrComplete").innerText = "";
            })
        } else {
            document.querySelector("#clrComplete").innerText = "";
        }
        }
        handle_clear_comp();
    }
    // create a li elm <li></li>
    // Empty the input text
    
function addToDo(){
    let obj = {};
    obj.value = textInput.value;
    obj.check = false;

    obj.id = Date.now();

    todoList.push(obj);
    textInput.value = "";
    displayTodo(todoList);
}

function deleteTodo(e){
    console.log(e.target.dataset.id);
    let id = e.target.dataset.id;
    let index;
    todoList.forEach((obj,i)=>{
        if(obj.id == id) {
            index = i;
        }
    }) 
    todoList.splice(index,1);
    displayTodo(todoList);
}
function handel_button(e){
    if(e.target.innerText === "All"){
        displayTodo(todoList)
    } else if(e.target.innerText === "Active"){
        let active = todoList.filter(todo => todo.check === false);
        displayTodo(active);
    } else if(e.target.innerText === "Completed"){
        let complet = todoList.filter(todo => todo.check === true);
        displayTodo(complet);
    }

}
[...btn].forEach((v) => {
    v.addEventListener("click", handel_button);
});

textInput.addEventListener("keydown", function(e){
    if(e.keyCode === 13){
        addToDo();
    }
});
