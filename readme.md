# LocalCrypt: Client-Side CSPRNG Password Generator

## Live Demo
[View my project here](https://mic-sp.github.io/password-generator/)

## Problem Being Solved
Many online password generators send your data over the internet to a remote server to create a password. This introduces risks like data tracking, security leaks, or server logging. On top of that, basic generators often use weak randomness math that can technically be predicted by modern computer programs.

Another common issue is that many corporate or banking websites have rigid rules that ban specific special characters (like `#` or `@`). Most password generators only give you an "all-or-nothing" checkbox for symbols, which becomes incredibly frustrating when the site keeps rejecting the password because of one illegal character.

## Value Provided
LocalCrypt solves these privacy and usability issues by running entirely inside your own web browser. Because the logic runs completely on your local computer, no password data is ever sent across the internet, ensuring 100% privacy.

Additionally, instead of a static checkbox, LocalCrypt includes a live text input field for symbols. This gives the user total control to instantly add or remove specific characters on the fly, making it easy to create a secure password that perfectly fits any website's strict rules.

## Project Plan & The Builder Loop
This project was built step-by-step using the **Next Chapter Builder Loop** framework to keep the development organized:

1. **Understand the Problem:** I realized that many online password generators are either insecure (using basic math randomness) or send data over a network. I also noticed how frustrating it is when a website blocks specific symbols and a generator won't let you change them.
2. **Identify the Value:** I wanted to make a tool that runs entirely in the browser for privacy, while giving the user total control over exactly which symbols are allowed.
3. **Plan:** I mapped out the structure in HTML first, decided on a clean dark-mode design, and planned the JavaScript steps before writing any code.
4. **Build:** I worked with an AI assistant to build the project layer by layer: first the HTML layout, then the modern CSS styling, and finally the JavaScript logic.
5. **Verify:** While testing the app, I found an edge case: if a user completely deleted all the symbols from the text box, the app would stop adding symbols or could act unreliably. I also tested the mathematical breakdown of the password outputs to make sure the randomness was working correctly.
6. **Improve:** To fix the empty text box issue, I added a "self-healing" feature in JavaScript so that if a user deletes the symbols and clicks away, the default list automatically snaps back.

## Completed Features
* **Secure Random Generation:** Uses the browser’s built-in secure crypto tools (`window.crypto.getRandomValues`) instead of basic math randomness. This ensures the passwords generated are truly unpredictable and secure.
* **Fair Character Shuffling:** Uses a standard array-shuffling method (Fisher-Yates) to mix up the password characters completely. This ensures that characters aren't placed in a predictable order.
* **Adjustable Length Slider:** Allows users to dynamically slide the password length anywhere from 8 up to 128 characters.
* **Custom Symbol Filter:** Includes a live text box next to the symbol checkbox so users can actively type, edit, or delete specific characters on the fly depending on what a website allows.
* **Self-Healing Input Box:** Tracks when a user clicks away from the symbol text box (`blur` event). If they accidentally leave the field completely empty, the app automatically puts the default list of symbols back in so the app doesn't break.
* **One-Click Copy Button:** Copies the password to the clipboard smoothly using a modern browser script. It also handles browser errors safely and changes the button text to a green "COPIED!" for 2 seconds to give the user quick visual feedback.

## Future Roadmap (What to Build Next)
* **Global Exclusion Filter Box:** An extra text field where a user could type *any* character (including specific letters or numbers) to ban them entirely from the password, helping bypass rigid corporate password rules.
* **Text Encryption Panel:** Expanding the tool into a broader privacy utility by adding a feature that lets users type a secret text message and lock it behind a passphrase using secure local encryption, completely inside the browser.

## Technologies Used
* **HTML5**
* **CSS3**
* **Vanilla JavaScript (ES6+)**

## AI Tools Used & Collaboration Style
* **Gemini:** Used as a step-by-step coding partner to brainstorm layouts and refine logic.
* **Our AI Workflow Strategy:** Instead of asking the AI to write the entire application all at once, I built it intentionally in small, manageable pieces. I made sure we locked down the basic HTML structure first, then polished the CSS design, and only wrote the JavaScript code once the visual layout was working perfectly. I also instructed the AI to focus its code comments on *why* the security logic was written a certain way, rather than just explaining basic programming syntax. This kept the final files clean, organized, and easy to read. A full log of how these prompts evolved is documented in `prompt-history.md`.

## 7. Running the Project
**Local**: Because this project utilizes zero external framework wrappers, databases, or Node package managers, executing a local mirror takes less than 5 seconds:
1. Clone this repository: 
   ```bash
   git clone https://github.com/mic-sp/password-generator.git
   ```
2. Open the directory folder.
3. Launch index.html directly inside any standard modern web browser (Chrome, Safari, Firefox, Edge).

**GitHub**: [LocalCrypt Live Demo](https://mic-sp.github.io/password-generator/)
