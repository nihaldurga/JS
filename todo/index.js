const Validation = document.getElementById("validation-modal");
const EmpytState = document.getElementById("empty-state");
const ErrorMessage = document.getElementById("error-message");
const SearchInput = document.getElementById("search-input");
const TaskInput = document.getElementById("task-input");
const DateInput = document.getElementById("task-date");
const TimeInput = document.getElementById("task-time");
const ValidationButtonOk = document.querySelector("#validation-modal .ok-btn");
const ValidationButton = document.querySelector("#validation-modal .modal-close");
const ErrorMessageButton = document.querySelector(".error-message button");
const submitForm = document.getElementById("add-task-btn");
const DueTask = document.getElementById("due-tasks");
const TaskForm1 = document.getElementById("todo-form1");
const EditTaskInput = document.getElementById("edit-task-input");
const EditDateInput = document.getElementById("edit-task-date");
const EditTimeInput = document.getElementById("edit-task-time");
const UpdateTaskButton = document.getElementById("update-task");
UpdateTaskButton.classList.add('update-task-btn');
let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];    
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function showValidation() {
    ErrorMessage.hidden = false;
    Validation.hidden=false;
}
function closeValidation() {
    Validation.hidden=true;
}
function closeErrorMessage(){
    ErrorMessage.hidden=true;
}
let editingIndex = null;
const createTaskElement=(Date,Time,Task,index)=>{
    closeErrorMessage();
    const ParentDiv=document.createElement("div");
    const ButtonDelete=document.createElement('button');
    ButtonDelete.classList.add('delete-btn');
    const ButtonEdit=document.createElement("button");
    ButtonEdit.classList.add('edit-btn');
    ParentDiv.dataset.form=index;
    const DateH1=document.createElement('h1');
    DateH1.textContent=Date;
    const TaskTime=document.createElement('div');
    TaskTime.innerHTML=`<h2>${Task} <span>${Time}</span></h2>`;
    ButtonDelete.textContent="Delete";
    ButtonEdit.textContent="Edit";
    ParentDiv.append(DateH1,TaskTime,ButtonDelete,ButtonEdit);
    DueTask.appendChild(ParentDiv);
    ButtonDelete.addEventListener("click",()=>{
        const idx = Number(ParentDiv.dataset.form);
        tasks.splice(idx, 1);
        saveTasks();
        DueTask.innerHTML = "";
        render(tasks);
    })
    ButtonEdit.addEventListener("click",()=>{
    editingIndex = Number(ParentDiv.dataset.form);
    const task = tasks[editingIndex];
    EditTaskInput.value = task.task;
    EditDateInput.value = task.date;
    EditTimeInput.value = task.time;
    TaskForm1.hidden = false;
    });
}
TaskForm1.addEventListener("submit", (event) => {
    event.preventDefault();
    const updatedTask = {
        task: EditTaskInput.value,
        date: EditDateInput.value,
        time: EditTimeInput.value
    };
    if (updatedTask.task === "" ||updatedTask.date === "" ||updatedTask.time === "") {
        showValidation();
        return;
    }
    tasks[editingIndex] = updatedTask;
    saveTasks();
    DueTask.innerHTML = "";
    render(tasks);
    TaskForm1.hidden = true;
    editingIndex = null;
});
submitForm.addEventListener("click",(event)=>{
    event.preventDefault();
    const Task=TaskInput.value;
    const Date=DateInput.value;
    const Time=TimeInput.value;
    if(Task===''||Date===''||Time===''){
        showValidation();
        ValidationButton.addEventListener("click",closeValidation);
        ValidationButtonOk.addEventListener("click",closeValidation);
        return;
    }
    const task={
        date:Date,
        time:Time,
        task:Task
    }
    tasks.push(task);
    saveTasks();
    createTaskElement(Date,Time,Task,tasks.length - 1);

    TaskInput.value = "";
    DateInput.value = "";
    TimeInput.value = "";
});
const render = (task) => {
    task.forEach((t, index) => {
        createTaskElement(t.date, t.time, t.task, index);
    });
};
render(tasks);
SearchInput.addEventListener("input", () => {
    const searchValue = SearchInput.value.toLowerCase().trim();

    const filteredTasks = tasks.filter((t) =>
        t.task.toLowerCase().includes(searchValue)
    );

    DueTask.innerHTML = "";
    filteredTasks.forEach((t) => {
        const index = tasks.indexOf(t);
        createTaskElement(t.date, t.time, t.task, index);
    });
});