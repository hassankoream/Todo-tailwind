/// <reference types="../@types/jquery"/>


localStorage.setItem('uKey', '66a6649060a208ee1fdc66ce')
let x = localStorage.getItem('uKey');

$('#addButton').on('click', function(e) {
//   console.log(  $('#userInput').val());
  let task = 
  {
    "title":$('#userInput').val(),
    "apiKey": x
}
$('#addButton').html('<span class="loaderBTN"></span>')

addTodo(task)

  
});

async function addTodo(task){
    let response = await fetch('https://todos.routemisr.com/api/v1/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    let result = await response.json();
    if(result.message === 'success'){
        getTodo()
    }
   else{
    $('#addButton').html('Add task')
        console.log('Error');
   }
}
async function deleteTodo(id){
    let response = await fetch('https://todos.routemisr.com/api/v1/todos', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todoId: id
        })
    })
    let result = await response.json();
    if(result.message === 'success'){
        getTodo()
    }
   else{
        console.log('Error');
   }
}
async function markCompleted(id){
    let response = await fetch('https://todos.routemisr.com/api/v1/todos', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todoId: id
        })
    })
    let result = await response.json();
    if(result.message === 'success'){
        getTodo()
    }
   else{
        console.log('Error');
   }
}

async function getTodo(){
    let response = await fetch('https://todos.routemisr.com/api/v1/todos/66a6649060a208ee1fdc66ce', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      
    })
    let result = await response.json();
    // console.log(result.todos);
    if (result.todos.length ==0){
$('#headText').text('No Tasks')
    }
    else{
        $('#headText').text('All Tasks')
        
    }
    displayTasks(result.todos)
    return result.todos
}
getTodo()
function displayTasks(tasks){
    taskBox ='';
    for(let i = 0; i < tasks.length; i++){

        taskBox += `
          <div class=" ${tasks[i].completed? 'bg-red-600':'' } task flex justify-between my-5 bg-[#DFD3C3] px-5 py-3 rounded-lg w-[90%] mx-auto hover:w-[100%]  ease-in-out duration-[0.8s]">
                            <div class="text ${tasks[i].completed? 'line-through':'' }" >
                                ${tasks[i].title}
                            </div>
                            <div class="icons">
                                <i onclick="markCompleted('${tasks[i]._id}')" id="checkButtton" class="${tasks[i].completed? 'hidden':'fa-regular' }  fa-circle-check me-6 cursor-pointer hover:text-white duration-150 "></i>
                                <i onclick="deleteTodo('${tasks[i]._id}')" id="deleteButton" class="fa-solid fa-trash cursor-pointer hover:text-white duration-150"></i>
                            </div>
                        </div>
        `

    }
    $('#tasksData').html('<span class="loader"></span>');
    // $('#addButton').html('<span class="loaderBTN"></span>')
    setTimeout(function() {
        $('#tasksData').html(taskBox);
        $('#addButton').html('Add task')
    }, 300);
    $('#userInput').val('')

}
async function deleteAllTasks(arr) {
    // console.log(response.todos);
    for(let i = 0; i < arr.length; i++){
        let y = await fetch('https://todos.routemisr.com/api/v1/todos', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                todoId: arr[i]._id
            })
        })
       
       
        // console.log('Deleted'+ response.todos[i]._id);
        
 
    }
    getTodo()
   
}
$('#deleteAll').on('click', async function(){
    let response = await fetch('https://todos.routemisr.com/api/v1/todos/66a6649060a208ee1fdc66ce', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      
    })
    let result = await response.json();
    let x = result.todos;
    // console.log(x);
    if (x.length > 0) {
        deleteAllTasks(x) 
    }
    else{
        console.log('No tasks found');
    }
})
