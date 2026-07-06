// 1. Target the elements from our HTML using their specific IDs
const lengthSlider = document.getElementById('password-length-slider');
const lengthDisplay = document.getElementById('password-length-display');

// 2. Add an "event listener" that triggers every time the slider moves
lengthSlider.addEventListener('input', (event) => {
    // 3. Update the text content of the display with the slider's current value
    lengthDisplay.textContent = event.target.value;
});