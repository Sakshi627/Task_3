document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item');

            const taskText = document.createElement('span');
            taskText.classList.add('task-text');
            if (task.completed) {
                taskText.classList.add('completed');
            }
            taskText.textContent = task.text;
            li.appendChild(taskText);

            const taskButtons = document.createElement('div');
            taskButtons.classList.add('task-buttons');

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.classList.add('complete-btn');
            completeButton.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });
            taskButtons.appendChild(completeButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => {
                const newText = prompt('Edit task', task.text);
                if (newText !== null) {
                    tasks[index].text = newText;
                    saveTasks();
                    renderTasks();
                }
            });
            taskButtons.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
            taskButtons.appendChild(deleteButton);

            li.appendChild(taskButtons);
            taskList.appendChild(li);
        });
    };

    // Function to save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    // Initial render
    renderTasks();
});
