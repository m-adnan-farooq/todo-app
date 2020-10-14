var tasks = document.getElementById('tasks');

firebase.database().ref('todos').on('child_added', function(data){
    //create li tag
    var li = document.createElement('li');
    // add li tag to ul tag
    tasks.appendChild(li)
    //creating a text node
    var node = document.createTextNode(data.val().value);
    //adding new task (input from user) to list (li)
    li.appendChild(node);

    //Create delete button
    var delBtn = document.createElement('button');
    //add Delete text to delete button
    var delText = document.createTextNode('Delete');
    delBtn.appendChild(delText);
    // add class to delete button
    delBtn.setAttribute('class', 'btn');
    //add key as id to delete button
    delBtn.setAttribute('id',data.val().key)
    //add onclick funtion to delete button
    delBtn.setAttribute('onclick', 'deleteItem(this)');
    // add delete button with every task
    li.appendChild(delBtn);

    //Create Edit Button
    var editBtn = document.createElement('button');
    var editText = document.createTextNode('Edit');
    editBtn.appendChild(editText);
    li.appendChild(editBtn);
    editBtn.setAttribute('id',data.val().key)
    editBtn.setAttribute('onclick', 'editItem(this)');

})
function addToDo() {
    var newTask = document.getElementById('newTask');
    var database = firebase.database().ref('todos'); 
    var key = database.push().key;
    console.log(key)
    var todo = {
        value: newTask.value,
        key: key
    }
    newTask.value =  "";
    database.child(key).set(todo);
}

function deleteItem(e){
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove();
}

function deleteAll(){
    tasks.innerHTML = "";
    firebase.database().ref('todos').remove()
    
}

function editItem(e){
    var val = e.parentNode.firstChild.nodeValue;
    var update = e.parentNode.childNodes[2];
    var editTaskOld = e.parentNode;
    var editTask = document.createElement('input');
    editTask.setAttribute('value',val);
    update.innerHTML = "Update";
    editTaskOld.firstChild.remove();
    editTaskOld.prepend(editTask);
    update.setAttribute('onclick','updateItem(this)');
}

function updateItem(e){
    var val = e.parentNode.childNodes[0].value;
    e.parentNode.childNodes[0].remove();
    e.parentNode.prepend(val);
    var editBtn = e.parentNode.childNodes[2];
    editBtn.innerHTML = "Edit";
    editBtn.setAttribute('onclick', 'editItem(this)')
    var updateTodo = {
        value: val,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(updateTodo)
}