// находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
// var index = 0;

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) {
    renderTask(task);
})

checkEmptyList();

// Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи
tasksList.addEventListener('click', deleteTask)

// Отмечаем задачу зваершенной
tasksList.addEventListener('click', doneTask)

function addTask(event) {

    // отменяем отправку формы
    event.preventDefault();

    // Досатем текст задачи из поля
    const taskText = taskInput.value;

    // Достаем индекс
    const object = tasks.find(obj => obj.id == 0);
    if (object == undefined){
        index=0;
        }
    else{
        index=0;
        while(index<99){
            index = index+1;
            const object = tasks.find(obj => obj.id == index);
            if (object == undefined){
                break;
            }
        }
    };

    const newTask = {
        id: index,
        text: taskText,
        done: false,
    };

    // Добавляем задачу в массив с задачами
    tasks.push(newTask)

    // Добавляем задачу в LocalStorage
    saveToLocalStorage();

    renderTask(newTask);

    // Очищаем поле ввода и возвращаем на него фокус
    taskInput.value = "";
    taskInput.focus();

    // Проверка. Если в списке задач нет элементов, скрываем блок
    checkEmptyList();
}

function deleteTask(event) {
    // Проверяем если клик был НЕ по кнопке "удалить задачу"
    if (event.target.dataset.action != 'delete') return;
        

    const parentNode = event.target.closest('.list-group-item');

    // определяем ID задачи
    const id = Number(parentNode.id);


    // находим индекс в массиве
    const index = tasks.findIndex(function (task) {
        return task.id == id;
    });

    // Удаляем задачу из массива с задачами
    tasks.splice(index, 1)

    // удаляем задачу из разметки
    parentNode.remove();

    saveToLocalStorage();

    // Проверка. Если в списке задач нет элементов элемент, показываем
    checkEmptyList();
}

function doneTask(event) {
    // Проверяем что клик был не по кнопек задача выполнена
    if (event.target.dataset.action != 'done') return;

    const parentNode = event.target.closest('.list-group-item');

    // Определяем ID задачи
    const id = Number(parentNode.id);

    // находим индекс в массиве
    const index = tasks.findIndex(function (task) {
        return task.id == id;
    });
    
    // упрощенная версия того что ниже
    const task = tasks.find( (task) => task.id == id)

    // меняем статус на выполнено и обратно
    task.done = !task.done

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    saveToLocalStorage();

}

function checkEmptyList() {

    if (tasks.length == 0) {
        const emptyListHTML = `
                <li id="emptyList" class="list-group-item empty-list">

					<div class="empty-list__title">Список дел пуст</div>
				</li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0) {
        let emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask (task) {
    // Формируем CSS класс
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

    // Формируем разметку для новой задачи
    const taskHTML = `
                <li id="${task.id}"class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}