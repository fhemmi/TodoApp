var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var completedTask = document.getElementById("completed-tasks");
var incompleteTask = document.getElementById("incomplete-tasks");


var createnewTask = function(taskstring){
    
    
    var listitem = document.createElement('li');
    
    
    var checkbox = document.createElement('input');
    var label = document.createElement('label');
    var editinput = document.createElement('input');
    var editbutton = document.createElement('button');
    var deletebutton = document.createElement('button');
    
    
    checkbox.type = 'checkbox';
    editinput.type = 'text';
    
    
    editbutton.innerText = 'Edit'
    editbutton.className = 'edit'
    deletebutton.innerText = 'Delete'
    deletebutton.className = 'delete'
    
    
    
     label.innerText = taskstring;
    
    listitem.appendChild(checkbox)
    listitem.appendChild(label)
    listitem.appendChild(editinput)
    listitem.appendChild(editbutton)
    listitem.appendChild(deletebutton)
    
    return listitem;
}






var addTask = function(){
    console.log('add task')

    var listitem = createnewTask(taskInput.value);
    incompleteTask.appendChild(listitem);
    bindTaskEvents(listitem, taskCompleted)

}



var editTask = function(){
       console.log('edit task')
    var listItem = this.parentNode;
  
    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");
    
    var containsClass = listItem.classList.contains("editMode");
    
    //if the class of the parent is .editMode
    if(containsClass) {
      //Switch from .editMode
      //label text become the input's value
      label.innerText = editInput.value;
    } else {
      //Switch to .editMode
      //input value becomes the label's text
      editInput.value = label.innerText;
    }
    
    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");    
}





var deleteTask = function(){
    console.log("delete task...")
    var listitem = this.parentNode;
    var ul = listitem.parentNode;
    
    ul.removeChild(listitem);

}

var taskCompleted = function(){
       var listitem = this.parentNode;
    completedTask.appendChild(listitem);
    bindTaskEvents(listitem, taskIncomplete);
}
//
var taskIncomplete = function(){
     console.log('task incomplete')
      var listitem = this.parentNode;
      incompleteTask.appendChild(listitem)
      bindTaskEvents(listitem, taskCompleted);
}


 var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
   console.log("Bind list item events");
   //select taskListItem's children
   var checkBox = taskListItem.querySelector("input[type=checkbox]");
   var editButton = taskListItem.querySelector("button.edit");
   var deleteButton = taskListItem.querySelector("button.delete");
  
   //bind editTask to edit button
   editButton.onclick = editTask;
  
   //bind deleteTask to delete button
   deleteButton.onclick = deleteTask;
  
   //bind checkBoxEventHandler to checkbox
   checkBox.onchange = checkBoxEventHandler;
 }

 var ajaxRequest = function() {
   console.log("AJAX request");
 }



// Set the click handler to the addTask function
 addButton.addEventListener("click", addTask);
 addButton.addEventListener("click", ajaxRequest);


//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTask.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTask.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for(var i = 0; i < completedTask.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTask.children[i], taskIncomplete);
}
