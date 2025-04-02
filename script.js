document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('add-todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    const apiUrl = '/cgi-bin/todo.py'; // Our CGI endpoint

    // --- Core API Request Function ---
    async function apiRequest(method, data = null) {
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            };
            if (data) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(apiUrl, options);

            if (!response.ok) {
                let errorMsg = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.error || errorMsg;
                } catch (e) { }
                throw new Error(errorMsg);
            }
            return await response.json();

        } catch (error) {
            console.error('API Request Failed:', error);
            alert(`Error communicating with server: ${error.message}`);
            return null;
        }
    }

    // --- Render To-Do List ---
    function renderTodos(todos) {
        todoList.innerHTML = '';

        if (!todos || todos.length === 0) {
            const emptyLi = document.createElement('li');
            emptyLi.textContent = 'No tasks yet! Add one above.';
            emptyLi.style.textAlign = 'center';
            emptyLi.style.fontStyle = 'italic';
            emptyLi.style.color = '#6c757d';
            todoList.appendChild(emptyLi);
            updateProgress([]); // Update progress bar
            return;
        }

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.dataset.id = todo.id;
            li.classList.toggle('done', todo.done);

            const taskContent = document.createElement('div');
            taskContent.classList.add('task-content');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.done;
            checkbox.addEventListener('change', () => toggleTodo(todo.id));

            const textSpan = document.createElement('span');
            textSpan.classList.add('task-text');
            textSpan.textContent = todo.text;

            taskContent.appendChild(checkbox);
            taskContent.appendChild(textSpan);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

            li.appendChild(taskContent);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });

        updateProgress(todos); // Update progress bar after rendering tasks
    }

    // --- Fetch Initial Todos ---
    async function fetchTodos() {
        const data = await apiRequest('POST', { action: 'get' });
        if (data && data.todos) {
            renderTodos(data.todos);
        } else {
            renderTodos([]);
        }
    }

    // --- Add Todo ---
    async function addTodo(text) {
        const data = await apiRequest('POST', { action: 'add', text: text });
        if (data && data.todos) {
            renderTodos(data.todos);
            todoInput.value = '';
        }
    }

    // --- Delete Todo ---
    async function deleteTodo(id) {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }
        const data = await apiRequest('POST', { action: 'delete', id: id });
        if (data && data.todos) {
            renderTodos(data.todos);
        }
    }

    // --- Toggle Todo Done/Undone ---
    async function toggleTodo(id) {
        const data = await apiRequest('POST', { action: 'toggle', id: id });
        if (data && data.todos) {
            renderTodos(data.todos);
        } else {
            console.error("Toggle failed, list might be out of sync");
        }
    }

    // --- Event Listeners ---
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
        }
    });

    // --- Initial Load ---
    fetchTodos();

    // --- Progress Bar Feature ---
    let progressBar = document.getElementById('progress-bar');
    let progressText = document.getElementById('progress-text');

    if (!progressBar) {
        progressBar = document.createElement('progress');
        progressBar.id = 'progress-bar';
        progressBar.value = 0;
        progressBar.max = 100;

        progressText = document.createElement('span');
        progressText.id = 'progress-text';
        progressText.textContent = '0% Completed';

        const form = document.getElementById('add-todo-form');
        form.insertAdjacentElement('afterend', progressBar);
        progressBar.insertAdjacentElement('afterend', progressText);
    }

    // --- Update Progress Bar ---
    function updateProgress(todos) {
        if (!todos || todos.length === 0) {
            progressBar.value = 0;
            progressText.textContent = '0% Completed';
            return;
        }

        const completedTasks = todos.filter(todo => todo.done).length;
        const totalTasks = todos.length;
        const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

        progressBar.value = progressPercentage;
        progressText.textContent = `${progressPercentage}% Completed`;
    }

});
