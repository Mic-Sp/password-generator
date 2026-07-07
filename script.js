// --- DOM Element Selection ---
// Target the elements from our HTML using their specific IDs
const lengthSliderInput = document.getElementById('password-length-slider');
const lengthDisplayValue = document.getElementById('password-length-display');
const includeUppercaseCheckbox = document.getElementById('include-uppercase-letters');
const includeLowercaseCheckbox = document.getElementById('include-lowercase-letters');
const includeNumbersCheckbox = document.getElementById('include-numbers');
const includeSymbolsCheckbox = document.getElementById('include-symbols');
const allowedSymbolsInput = document.getElementById('allowed-symbols-input');
const generatePasswordButton = document.getElementById('generate-password-button');
const passwordOutputField = document.getElementById('generated-password-output');
const copyToClipboardButton = document.getElementById('copy-to-clipboard-button');

// --- Cryptographic Character Pools ---
const UPPERCASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARACTERS = '0123456789';
const DEFAULT_SYMBOL_CHARACTERS = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// --- Core Logic ---

// Add an "event listener" that triggers every time the slider moves and updates the text content with the slider's current value.
lengthSliderInput.addEventListener('input', (event) => {
    lengthDisplayValue.textContent = event.target.value;
});

function getSecureRandomCharacter(characterPool) {
    /* * Initializes a 32-bit unsigned integer array to hold the entropy.
     * Web Crypto API populates this buffer with cryptographically secure randomness
     * generated from the operating system's hardware entropy pool.
     */
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    
    /* * We use a modulo operation to map the 32-bit integer to our character pool index.
     * Note on Modulo Bias: Because 2^32 is not perfectly divisible by typical pool lengths (e.g., 26 or 70), 
     * a microscopic modulo bias exists. However, for a 32-bit integer against a pool < 100, 
     * the bias is smaller than 0.000002%, making it cryptographically negligible for password generation.
     */
    const randomIndex = randomBuffer[0] % characterPool.length;
    return characterPool[randomIndex];
}

function securelyShuffleString(stringToShuffle) {
    const arrayToShuffle = stringToShuffle.split('');
    
    /* * Implements a strict Fisher-Yates (Knuth) shuffle algorithm.
     * We iterate backwards and swap each element with a randomly selected index.
     * Utilizing CSPRNG here ensures the permutation distribution remains uniformly random,
     * preventing side-channel predictability regarding character positioning.
     */
    for (let currentIndex = arrayToShuffle.length - 1; currentIndex > 0; currentIndex--) {
        const randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);
        
        const targetIndex = randomBuffer[0] % (currentIndex + 1);
        
        const temporaryValue = arrayToShuffle[currentIndex];
        arrayToShuffle[currentIndex] = arrayToShuffle[targetIndex];
        arrayToShuffle[targetIndex] = temporaryValue;
    }
    
    return arrayToShuffle.join('');
}

function generateSecurePassword() {
    const passwordLength = parseInt(lengthSliderInput.value, 10);
    let masterCharacterPool = '';
    let guaranteedCharacters = [];

    if (includeUppercaseCheckbox.checked) {
        masterCharacterPool += UPPERCASE_CHARACTERS;
        guaranteedCharacters.push(getSecureRandomCharacter(UPPERCASE_CHARACTERS));
    }
    
    if (includeLowercaseCheckbox.checked) {
        masterCharacterPool += LOWERCASE_CHARACTERS;
        guaranteedCharacters.push(getSecureRandomCharacter(LOWERCASE_CHARACTERS));
    }
    
    if (includeNumbersCheckbox.checked) {
        masterCharacterPool += NUMBER_CHARACTERS;
        guaranteedCharacters.push(getSecureRandomCharacter(NUMBER_CHARACTERS));
    }
    
    if (includeSymbolsCheckbox.checked) {
            const activeSymbols = allowedSymbolsInput.value;
            // Verify the input isn't blank before attempting to draw a random character
            if (activeSymbols.length > 0) {
                masterCharacterPool += activeSymbols;
                guaranteedCharacters.push(getSecureRandomCharacter(activeSymbols));
            }
        }

    if (masterCharacterPool.length === 0) {
        passwordOutputField.value = '';
        return; 
    }

    let constructedPassword = guaranteedCharacters.join('');
    
    const remainingLengthRequirements = passwordLength - guaranteedCharacters.length;
    
    for (let i = 0; i < remainingLengthRequirements; i++) {
        constructedPassword += getSecureRandomCharacter(masterCharacterPool);
    }

    passwordOutputField.value = securelyShuffleString(constructedPassword);
}

async function copyPasswordToClipboard() {
    const currentPassword = passwordOutputField.value;
    
    if (!currentPassword) return;

    try {
        await navigator.clipboard.writeText(currentPassword);
        
        const originalButtonText = copyToClipboardButton.textContent;
        copyToClipboardButton.textContent = 'COPIED!';
        copyToClipboardButton.style.color = '#00ff66'; 
        
        setTimeout(() => {
            copyToClipboardButton.textContent = originalButtonText;
            copyToClipboardButton.style.color = ''; 
        }, 2000);
        
    } catch (clipboardError) {
        console.error('Clipboard operation failed due to browser security restrictions:', clipboardError);
    }
}

// --- Event Binding ---
generatePasswordButton.addEventListener('click', generateSecurePassword);
copyToClipboardButton.addEventListener('click', copyPasswordToClipboard);

/* * UX Polish: Prevent the allowed symbols input from remaining empty.
 * Listens for the 'blur' event (when the input field loses focus). 
 * If the field is completely empty or contains only whitespace, 
 * it automatically restores the default symbol string to prevent 
 * cryptographic generation errors or empty pool selection.
 */
allowedSymbolsInput.addEventListener('blur', (event) => {
    if (event.target.value.trim() === '') {
        event.target.value = DEFAULT_SYMBOL_CHARACTERS;
    }
});

// Generate an initial password on page load
generateSecurePassword();