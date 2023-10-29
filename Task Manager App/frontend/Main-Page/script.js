const textEle = document.getElementById('input-text');
const addTaskBtn = document.getElementById('addTask');
const taskContainer = document.getElementById('tasks');
const taskList = [];

async function getTasks(){
    const {data} = await axios.get('/api/tasks')
    return data.data;
}

async function postData(data){
    const res = await axios.post(`/api/tasks?name=${data.name}`)
    console.log(`Posted ${data.name}: ${res.data.success}`);
}

async function deleteData(data){
    const res = await axios.delete(`/api/tasks?name=${data.name}`);
    console.log(res.data.msg);
}

function appendTasks(tasks){
    for (let i = 0; i < tasks.length; i++){
        const name = tasks[i].name;
        const html = `
        <div class="task-container" id="${name}">
            <div class="left-part">
                <div class="name">${name}</div>
            </div>
            <div class="right-part">
                <span id="deleteBtn" title="${name}" class="material-symbols-outlined">
                    delete
                </span>
                <span id="editBtn" title="${name}" class="material-symbols-outlined">
                    edit
                </span>
            </div>
        </div>`
        taskList.push(tasks[i]);
        taskContainer.innerHTML += html;
    }


}

function addEventListeners(){
    const widgets = document.querySelectorAll('span');
    for (let i = 0 ; i < widgets.length; i++){
        widgets[i].addEventListener('click', () => {
            if (widgets[i].innerHTML.includes("delete")){
                deleteData({name:widgets[i].getAttribute('title')});
                taskContainer.innerHTML = "";
                main();
            }else {
                console.log('edit');
            }
        })
        
    }
}

async function main(){
    const tasks = await getTasks();
    appendTasks(tasks);
    addEventListeners();
}

main();

addTaskBtn.addEventListener('click', async () => {
    if (textEle.value){
        postData({name: textEle.value});
        appendTasks([{name:textEle.value}]);
        addEventListeners();
    }
    
    
});


