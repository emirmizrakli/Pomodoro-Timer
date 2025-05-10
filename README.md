# Modern Pomodoro Timer

A beautiful, minimalist Pomodoro timer web application built with HTML, CSS, and JavaScript. This application helps you stay focused and productive using the Pomodoro Technique.

![Pomodoro Timer Preview](preview.png)

## Features

- 🎯 Classic Pomodoro Timer (25/5/15 minutes)
- 🌓 Dark/Light Mode
- 📊 Statistics Tracking
- 🔔 Desktop Notifications
- 🎨 Modern and Minimalist Design
- 📱 Fully Responsive
- 💾 Local Storage for Statistics
- 🔄 Automatic Mode Switching

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- Vanilla JavaScript
- Local Storage API
- Web Notifications API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pomodoro-timer.git
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server

# Using Node.js
npx serve
```

3. Start using the Pomodoro Timer!

## Usage

1. Click the "Start" button to begin your Pomodoro session
2. Work for 25 minutes (one Pomodoro)
3. Take a 5-minute break
4. After 4 Pomodoros, take a longer 15-minute break
5. Track your progress in the statistics panel

## Customization

You can customize the timer durations by modifying the following values in `script.js`:

```javascript
// Work duration (25 minutes)
timeLeft = 25 * 60;

// Short break duration (5 minutes)
timeLeft = 5 * 60;

// Long break duration (15 minutes)
timeLeft = 15 * 60;
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons from [Feather Icons](https://feathericons.com/)
- Font from [Google Fonts](https://fonts.google.com/)
- Notification sound from [Mixkit](https://mixkit.co/) 