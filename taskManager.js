class TaskManager {
    constructor() {
        this.tasks = this.loadTasks(); 
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }


    addTask(description) {
        const newTask = {
            id: this.tasks.length + 1,
            description: description,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
        console.log(`Task added: "${description}"`);
    }

    displayTasks() {
        if (this.tasks.length === 0) {
            console.log("No tasks found.");
            return;
        }

        let taskList = "";
        this.tasks.forEach(task => {
            const status = task.completed ? "Completed" : "Pending";
            taskList += `ID: ${task.id}. ${task.description} [${status}]\n`;
        });
        console.log(taskList);
    }

    updateTask(id, newDescription) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.description = newDescription;
            this.saveTasks();
            console.log(`Task ${id} updated to: "${newDescription}"`);
        } else {
            console.log(`Task with ID ${id} not found.`);
        }
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            console.log(`Task ${id} status toggled to: ${task.completed ? "Completed" : "not completed"}`);
        } else {
            console.log(`Task with ID ${id} not found.`);
        }
    }

    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            const removedTask = this.tasks.splice(taskIndex, 1);
            this.saveTasks();
            console.log(`Task "${removedTask[0].description}" deleted.`);
        } else {
            console.log(`Task with ID ${id} not found.`);
        }
    }

    searchTask(query) {
        const results = this.tasks.filter(task => task.description.toLowerCase().includes(query.toLowerCase()));
        if (results.length > 0) {
            let resultList = "";
            results.forEach(task => {
                const status = task.completed ? "Completed" : "Pending";
                resultList += `ID: ${task.id} - ${task.description} [${status}]\n`;
            });
            console.log(resultList);
        } else {
            console.log(`No tasks found "${query}".`);
        }
    }
}


const taskManager = new TaskManager();

function showMenu() {
    let menu = `Task Manager Menu:\n`;
    menu += `1. Add a task\n`;
    menu += `2. View all tasks\n`;
    menu += `3. Update a task description\n`;
    menu += `4. Toggle task completion\n`;
    menu += `5. Delete a task\n`;
    menu += `6. Search tasks by name\n`;
    menu += `7. Exit\n`;

    let choice;
    do {
        console.log(menu);
        choice = prompt("Enter option number");

        switch (choice) {
            case "1": 
                const description = prompt("Enter the task description:");
                if (description) {
                    taskManager.addTask(description);
                }
                break;

            case "2":
                taskManager.displayTasks();
                break;

            case "3": 
                const updateId = parseInt(prompt("Enter the task ID to update:"));
                if (!isNaN(updateId)) {
                    const newDescription = prompt("Enter the new task description:");
                    if (newDescription) {
                        taskManager.updateTask(updateId, newDescription);
                    }
                } else {
                    console.log("Invalid task ID.");
                }
                break;

            case "4":
                const toggleId = parseInt(prompt("Enter the task ID to toggle:"));
                if (!isNaN(toggleId)) {
                    taskManager.toggleTask(toggleId);
                } else {
                    console.log("Invalid task ID.");
                }
                break;

            case "5": 
                const deleteId = parseInt(prompt("Enter the task ID to delete:"));
                if (!isNaN(deleteId)) {
                    taskManager.deleteTask(deleteId);
                } else {
                    console.log("Invalid task ID.");
                }
                break;

            case "6": 
                const query = prompt("Enter a keyword to search tasks:");
                if (query) {
                    taskManager.searchTask(query);
                }
                break;

            case "7": 
                console.log("Exiting Task Manager...");
                break;

            default:
                if (choice !== null) {
                    console.log("Invalid choice. Please enter a number between 1 and 7.");
                }
                break;
        }
    } while (choice !== "7");
}

showMenu();
