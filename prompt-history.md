# LocalCrypt: AI Collaboration & Prompt History

This document chronicles the step-by-step collaboration with Gemini to build LocalCrypt. Instead of requesting a completed application all at once, the project was intentionally built in stages: establishing the structure, polishing the design, writing the core security logic, and handling edge cases discovered during user testing.

Shared conversation for actual project build: https://share.gemini.google/PcejHh3kURm4

---

## 1. Initial Planning & Project Setup
**Intent:** Setting a strict project scope and building the HTML layout skeleton before writing any styles or logic.

### User Prompt:
> "I am going to create a small, secure web-based password generator using only HTML, CSS, and JavaScript. The user should be able to select the password length and the characters allowed. It should have a modern, interactive single page UI that is highly responsive, clean, and user-friendly.. Let's start with just creating the file structure, HTML layout, and CSS styling. Ensure all CSS classes and structural IDs use descriptive, professional naming conventions and no ambiguous abbreviations."

---

## 2. Visual Iteration & Cybersecurity Theme
**Intent:** Overhauling a plain layout into a sharp, dark-themed security aesthetic while preserving the structural naming rules.

### User Prompt:
> "The HTML structure is perfect and the naming conventions are very clean. The only thing that needs some adjusting is the visual style is a bit plain. Let's change style.css to give it a more modern and sleek cyber-security aesthetic. 
> Let's try adding a dark background and giving the main application container a modern feel with a subtle border highlight to give it a bit of depth. Enhance the buttons, checkboxes, and text field to give them a clear active state with the new dark background. 
> Make the necessary changes to style.css but keep the structure and naming conventions in place."

---

## 3. UI Debugging & Learning Opportunity
**Intent:** Investigating why the slider display text wasn't updating and learning how the JavaScript event hooks work.

### User Prompt:
> "that looks perfect, fits much more to the cyber-security aesthetic. I notice one small error so far, when I move the character length bar it does not change the text that goes with it - it is stuck at 16 characters. Can you explain why this text isn't updating with the slider and how to fix it?"

---

## 4. Writing the Core Cryptographic Security
**Intent:** Enforcing high-security standards (`window.crypto.getRandomValues`) and making sure code comments focus on *why* the security choices were made.

### User Prompt:
> "okay that makes sense and it's working perfectly now! The next step is to implement the password generator logic in script.js. This should be a highly secure generator utilizing CSPRNG to prevent reproduceable results. Keep the same naming conventions used in the HTML and CSS files. Also include comments that explain the cryptographic selection logic while avoiding comments on basic syntax."

---

## 5. Designing the Advanced Custom Symbol Feature
**Intent:** Solving a real-world user problem by replacing standard static checkboxes with a live text box where users can change the symbol pool on the fly.

### User Prompt:
> "that is exactly the implementation i was looking for, excellent work with the .getRandomValues function and the Fisher-Yates shuffling. 
> Now, I would like to add another feature that is often overlooked in these types of apps and is a common real-world problem. Some websites restrict specific symbols (such as '#' or '@') so let's modify the symbol configuration area so the user can explicitly choose which symbols are included in the generator. We will need to make changes to index.html style.css and script.js.
> In index.html: lets add a text input field next to the label for 'include symbols' that defaults to the full symbol string
> In style.css: style this new text box so that it matches with the cyber-security theme and shifts opacity if the checkbox is unchecked.
> In script.js: connect the generateSecurePassword to read the symbols from the new text box instead of using the full symbol set.
> Make the necessary changes to these files but keep the structure and naming conventions in place."

---

## 6. Catching User Errors (Self-Healing Input)
**Intent:** Fixing an edge case found during manual testing where completely clearing out the text box would break the generation loop.

### User Prompt:
> "okay we are up and fully operational! let's add another UX polish to help prevent user error in the scripts.js file. Currently, if a user deletes all the symbols from allowed-symbols-input they would have to retype every symbol or reload the page to get the default symbols back. Let's add a JS event to watch for an unfocused text box and restore the default string of symbols back in the field when this happens. Add a clear comment explaining this behavior as well."

---

## 7. Data Verification & Future Feature Strategy
**Intent:** Confirming that the character pool randomness matched theoretical math, and planning the roadmap based on direct tester feedback.

### Additional Questions Asked:
1. *"Can you give me a breakdown of the percentage of each representation for each field of uppercase, lowercase, numbers, and symbols [from my test outputs]?"*
   * **Why this matters:** I verified that when letters were turned off, the output naturally skewed to 76% symbols and 24% numbers. This mathematical analysis proved that the random distribution perfectly matched theoretical pool probability ($29 \text{ symbols} / 39 \text{ total characters} = 74.36\%$), confirming the randomness engine was unbiased.
2. *"A friend testing it suggested having a way to input disallowed characters to remove them from the pool. What's the best way to handle this?"*
   * **Why this matters:** This allowed me to evaluate real-world user feedback, balance it against scope creep to ensure on-time deployment, and strategically add a **Global Exclusion Filter Box** to my project's future roadmap.