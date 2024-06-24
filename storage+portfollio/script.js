function addTask(storageType) {
    var inputElement = document.getElementById('taskInput' + (storageType === 'local' ? 'Local' : 'Session'));
    var taskListElement = document.getElementById('taskList' + (storageType === 'local' ? 'Local' : 'Session'));

    var task = inputElement.value.trim();
    if (task !== '') {
        var tasks = JSON.parse(window[storageType + 'Storage'].getItem(storageType + 'Tasks')) || [];
        tasks.push(task);
        window[storageType + 'Storage'].setItem(storageType + 'Tasks', JSON.stringify(tasks));
        renderTasks(tasks, taskListElement);
        inputElement.value = ''; 
    }
}

function renderTasks(tasks, taskListElement) {
    taskListElement.innerHTML = '';

    tasks.forEach(function(task, index) {
        var li = document.createElement('li');
        li.textContent = task;

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn'); 
        deleteButton.addEventListener('click', function() {
            
            tasks.splice(index, 1);
            var storageType = taskListElement.id.includes('Local') ? 'local' : 'session';
            window[storageType + 'Storage'].setItem(storageType + 'Tasks', JSON.stringify(tasks));
            renderTasks(tasks, taskListElement);
        });

        li.appendChild(deleteButton);
        taskListElement.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var localTasks = JSON.parse(window.localStorage.getItem('localTasks')) || [];
    var sessionTasks = JSON.parse(window.sessionStorage.getItem('sessionTasks')) || [];

    renderTasks(localTasks, document.getElementById('taskListLocal'));
    renderTasks(sessionTasks, document.getElementById('taskListSession'));
});

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.getElementById("location-info").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location-info").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location-info").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location-info").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location-info").innerHTML = "An unknown error occurred.";
            break;
    }
}

// Call getLocation when the page loads
window.onload = function() {
    getLocation();
};

// Drag and drop functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var navBar = document.querySelector("nav ul");
    var draggedItem = document.getElementById(data);
    navBar.insertBefore(draggedItem, navBar.children[ev.target.getAttribute("data-index")]);
}

// Web Worker functionality
function startWorker() {
    const worker = new Worker("worker.js");

    worker.onmessage = function(event) {
        console.log("Calculation result:", event.data);
    };

    worker.postMessage("start");
}

// Call startWorker when the button is clicked
document.querySelector("#workButton").addEventListener("click", startWorker);
// Function to start the worker
function startWorker() {
    const worker = new Worker("worker.js");

    worker.onmessage = function(event) {
        console.log("Calculation result:", event.data);
        alert("Calculation result: " + event.data);
    };

    worker.postMessage("start");
}

// Call startWorker when the button is clicked
document.querySelector("#workButton").addEventListener("click", startWorker);
