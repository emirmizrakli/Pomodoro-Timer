// DOM Elements
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const modeBtns = document.querySelectorAll('.mode-btn');
const modeText = document.getElementById('modeText');
const completedCount = document.getElementById('completedCount');
const themeToggle = document.getElementById('themeToggle');
const todayCount = document.getElementById('todayCount');
const weekCount = document.getElementById('weekCount');
const monthCount = document.getElementById('monthCount');

// Timer state
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;
let currentMode = 'work';
let completedPomodoros = 0;

// Statistics
let stats = {
    today: 0,
    week: 0,
    month: 0
};

// Load statistics from localStorage
function loadStats() {
    const savedStats = localStorage.getItem('pomodoroStats');
    if (savedStats) {
        stats = JSON.parse(savedStats);
        updateStatsDisplay();
    }
}

// Save statistics to localStorage
function saveStats() {
    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
}

// Update statistics display
function updateStatsDisplay() {
    todayCount.textContent = stats.today;
    weekCount.textContent = stats.week;
    monthCount.textContent = stats.month;
}

// Timer functions
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                startBtn.style.display = 'block';
                pauseBtn.style.display = 'none';
                
                if (currentMode === 'work') {
                    completedPomodoros++;
                    completedCount.textContent = `Completed: ${completedPomodoros}`;
                    stats.today++;
                    stats.week++;
                    stats.month++;
                    saveStats();
                    updateStatsDisplay();
                    
                    // Play notification sound
                    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
                    audio.play();
                    
                    // Show notification
                    if (Notification.permission === 'granted') {
                        new Notification('Pomodoro Complete!', {
                            body: 'Time for a break!',
                            icon: 'https://example.com/icon.png'
                        });
                    }
                }
                
                // Auto switch modes
                if (currentMode === 'work') {
                    if (completedPomodoros % 4 === 0) {
                        setMode('longBreak');
                    } else {
                        setMode('shortBreak');
                    }
                } else {
                    setMode('work');
                }
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
        startBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    setMode(currentMode);
}

function setMode(mode) {
    currentMode = mode;
    modeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    switch (mode) {
        case 'work':
            timeLeft = 25 * 60;
            modeText.textContent = 'Focus Time';
            break;
        case 'shortBreak':
            timeLeft = 5 * 60;
            modeText.textContent = 'Short Break';
            break;
        case 'longBreak':
            timeLeft = 15 * 60;
            modeText.textContent = 'Long Break';
            break;
    }
    
    updateDisplay();
}

// Theme toggle
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
themeToggle.addEventListener('click', toggleTheme);

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!isRunning) {
            setMode(btn.dataset.mode);
        }
    });
});

// Request notification permission
if (Notification.permission === 'default') {
    Notification.requestPermission();
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Load statistics
loadStats();

// Reset daily stats at midnight
function checkAndResetDailyStats() {
    const lastReset = localStorage.getItem('lastReset');
    const now = new Date();
    const today = now.toDateString();
    
    if (lastReset !== today) {
        stats.today = 0;
        localStorage.setItem('lastReset', today);
        saveStats();
        updateStatsDisplay();
    }
}

// Check for daily reset every minute
setInterval(checkAndResetDailyStats, 60000);
checkAndResetDailyStats(); 