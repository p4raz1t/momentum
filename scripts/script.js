//weather
const apiKey = "85693bff78271ee79a42cabeafa2c807"; // Замените вашим ключом
        const cityInput = document.getElementById("city");
        const temperatureDisplay = document.getElementById("temperature");
        const conditionDisplay = document.getElementById("condition");
        const getWeatherButton = document.getElementById("getWeather");

        // Функция для загрузки города по умолчанию
        function loadDefaultCity() {
            const defaultCity = { latitude: 45.0355, longitude: 38.9753 }; // Краснодар
            localStorage.setItem('city', JSON.stringify(defaultCity));
            getWeather(defaultCity);
        }

        // Функция для получения погоды по городу
        function getWeather(city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Город не найден");
                    }
                    return response.json();
                })
                .then(data => {
                    const temperature = Math.round(data.main.temp);
                    const weatherCondition = data.weather[0].description;

                    temperatureDisplay.innerText = `Температура: ${temperature}°C`;
                    conditionDisplay.innerText = `Погода: ${weatherCondition}`;
                })
                .catch(error => {
                    alert(error.message);
                });
        }

        // Загрузка города из local storage
        window.onload = () => {
            const savedCity = localStorage.getItem("city") || "Краснодар";
            cityInput.value = savedCity;
            getWeather(savedCity);
            setLocation();
        };

        // Обработка события нажатия кнопки
        getWeatherButton.addEventListener("click", () => {
            const city = cityInput.value;
            if (city) {
                getWeather(city);
                localStorage.setItem("city", city);
            }
        });



//time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timeString;
}

setInterval(updateTime, 1000); // обновляем каждую секунду
updateTime(); // вызываем сразу, чтобы не ждать 1 секунду
//

//date
const today = new Date();

// Массив с названиями месяцев
const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

// Массив с названиями дней недели
const daysOfWeek = [
    "Воскресенье", "Понедельник", "Вторник", "Среда", 
    "Четверг", "Пятница", "Суббота"
];

// Получаем день, месяц и год
const day = today.getDate();
const month = months[today.getMonth()];
const year = today.getFullYear();
const dayOfWeek = daysOfWeek[today.getDay()];

// Форматируем дату
const formattedDate = `${day} ${month}, ${dayOfWeek}`;

// Выводим на страницу
document.getElementById('date').innerText = formattedDate;
//

//tasks
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const deleteCompletedBtn = document.getElementById('deleteCompletedBtn');
    const error = document.getElementById('error');

    // Функция для добавления новой задачи
    function addTask(taskName) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" />
            <span class="task-name">${taskName}</span>
            <button class="delete-btn">Удалить</button>
        `;
        taskList.appendChild(li);

        // Обработчик удаления задачи
        li.querySelector('.delete-btn').addEventListener('click', () => {
            taskList.removeChild(li);
        });

        // Обработчик для чекбокса
        li.querySelector('.task-checkbox').addEventListener('change', (e) => {
            const taskNameSpan = li.querySelector('.task-name');
            if (e.target.checked) {
                taskNameSpan.style.textDecoration = 'line-through';
            } else {
                taskNameSpan.style.textDecoration = 'none';
            }
        });
    }

    // Обработчик нажатия клавиши Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskName = taskInput.value.trim();
            if (taskName === '') {
                error.textContent = 'Ошибка: поле задачи не должно быть пустым!';
                return;
            }
            error.textContent = '';
            addTask(taskName);
            taskInput.value = '';
        }
    });

    // Обработчик удаления выполненных задач
    deleteCompletedBtn.addEventListener('click', () => {
        const tasks = Array.from(taskList.children);
        tasks.forEach(task => {
            const checkbox = task.querySelector('.task-checkbox');
            if (checkbox.checked) {
                taskList.removeChild(task);
            }
        });
    });
});
//