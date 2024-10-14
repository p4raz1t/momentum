//WEATHER
const apiKey = "85693bff78271ee79a42cabeafa2c807"; // Set your API key
        const cityInput = document.getElementById("city");
        const temperatureDisplay = document.getElementById("temperature");
        const conditionDisplay = document.getElementById("condition");
        const getWeatherButton = document.getElementById("getWeather");
        // Function to load default city
        function loadDefaultCity() {
            const defaultCity = { latitude: 55.77966, longitude: 37.62268 }; // Moscow
            localStorage.setItem('city', JSON.stringify(defaultCity));
            getWeather(defaultCity);
        }
        // Function for getting weather by city
        function getWeather(city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("City not found");
                    }
                    return response.json();
                })
                .then(data => {
                    const temperature = Math.round(data.main.temp);
                    const weatherCondition = data.weather[0].description;

                    temperatureDisplay.innerText = `${temperature}°`;
                    conditionDisplay.innerText = `${weatherCondition}`;
                })
                .catch(error => {
                    alert(error.message);
                });
        }
        // Loading a city from local storage
        window.onload = () => {
            const savedCity = localStorage.getItem("city") || "Moscow";
            cityInput.value = savedCity;
            getWeather(savedCity);
        };
        // Handling the button click event
        getWeatherButton.addEventListener("click", () => {
            const city = cityInput.value;
            if (city) {
                getWeather(city);
                localStorage.setItem("city", city);
            }
        });


//TIME
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timeString;
}
setInterval(updateTime, 1000); // Update every second
updateTime(); // Call immediately so as not to wait 1 second


//DATE
const today = new Date();
// Array with month names
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
// An array with the names of the days of the week
const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"
];
// We get the day, month and year
const day = today.getDate();
const month = months[today.getMonth()];
const year = today.getFullYear();
const dayOfWeek = daysOfWeek[today.getDay()];
// Format the date
const formattedDate = `${day} ${month}, ${dayOfWeek}`;
// Display on the page
document.getElementById('date').innerText = formattedDate;


//TASKS
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const deleteCompletedBtn = document.getElementById('deleteCompletedBtn');
    const error = document.getElementById('error');
    // Function for adding a new task
    function addTask(taskName) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" />
            <span class="task-name">${taskName}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
        // Task deletion handler
        li.querySelector('.delete-btn').addEventListener('click', () => {
            taskList.removeChild(li);
        });
        // Checkbox handler
        li.querySelector('.task-checkbox').addEventListener('change', (e) => {
            const taskNameSpan = li.querySelector('.task-name');
            if (e.target.checked) {
                taskNameSpan.style.textDecoration = 'line-through';
            } else {
                taskNameSpan.style.textDecoration = 'none';
            }
        });
    }
    // Enter key press handler
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskName = taskInput.value.trim();
            if (taskName === '') {
                error.textContent = 'Error';
                return;
            }
            error.textContent = '';
            addTask(taskName);
            taskInput.value = '';
        }
    });
    // Completed task deletion handler
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


// BACKGROUND CHANGER
function setBackground() {
    const now = new Date();
    const hours = now.getHours();
    let imageUrl;
    if (hours >= 0 && hours < 6) {
        imageUrl = 'https://wallpapercat.com/w/full/3/6/6/3750082-3840x2160-desktop-hd-mountain-night-background.jpg';
    } else if (hours >= 6 && hours < 12) {
        imageUrl = 'https://facts.net/wp-content/uploads/2023/07/16-facts-about-sunshine-1689735178.jpg';
    } else if (hours >= 12 && hours < 18) {
        imageUrl = 'https://avatars.mds.yandex.net/i?id=5c2b0399a2b9fff2d5cd4fd903fa9b1a_l-7547218-images-thumbs&n=13';
    } else {
        imageUrl = 'https://wallpapercat.com/w/full/2/8/c/19674-1920x1080-desktop-full-hd-sunset-background-image.jpg';
    }
    document.body.style.backgroundImage = `url(${imageUrl})`;
}
// Set the background when the page loads
setBackground();
// Update background every minute to capture time changes
setInterval(setBackground, 60000);