const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

function addTask(description) {
    const task = {
        id: tasks.length + 1,
        description,
        completed: false
    };
    tasks.push(task);
    console.log('Tarea añadida:', task);
}

function removeTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        console.log('Tarea no encontrada');
    } else {
        const removedTask = tasks.splice(taskIndex, 1);
        console.log('Tarea eliminada:', removedTask[0]);
    }
}

function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    if (!task) {
        console.log('Tarea no encontrada');
    } else {
        task.completed = true;
        console.log('Tarea completada:', task);
    }
}

function listTasks() {
    console.log('Lista de tareas:');
    tasks.forEach(task => {
        console.log(`[${task.id}] ${task.description} - ${task.completed ? 'Completada' : 'No completada'}`);
    });
}

function exitConsole() {
    console.log('Saliendo de la consola...');
    rl.close();
}

rl.on("close", function() {
    console.log("\nLa consola se ha cerrado.");
    process.exit(0);
});

function run() {
    rl.question('Seleccione una función (añadir, eliminar, completar, listar, salir): ', function (answer) {
        switch (answer.toLowerCase()) {
            case 'añadir':
            case 'add':
                rl.question('Ingrese la descripción de la tarea: ', function (description) {
                    addTask(description);
                    run();
                });
                break;
            case 'eliminar':
            case 'remove':
                rl.question('Ingrese el ID de la tarea a eliminar: ', function (id) {
                    removeTask(parseInt(id));
                    run();
                });
                break;
            case 'completar':
            case 'complete':
                rl.question('Ingrese el ID de la tarea a completar: ', function (id) {
                    completeTask(parseInt(id));
                    run();
                });
                break;
            case 'listar':
            case 'list':
                listTasks();
                run();
                break;
            default:
                console.log('Opción no válida');
                run();
                break;
        }
    });
}

run();