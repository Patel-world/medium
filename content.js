let modals = []; // Array to keep track of all modals

document.addEventListener('keydown', function(event) {
    // Check if the "Alt" key is pressed
    if (event.altKey) {
        const selectedText = window.getSelection().toString();
        if (selectedText.length > 0) {
            console.log(selectedText);
            fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer API_KEY' // Replace with your actual API key
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'user', content: `${selectedText} \n \n \n Write a comment or reply author for above in 1 line(30 words) like e.g. "Interesting artical thnx for sharing 😊" or "Beautiful written I must say ❤️ each thread in tapestry is love 💖 it's definitely beings emotions and visuals to life"` }
                    ],
                    max_tokens: 50
                })
            }).then(response => response.json())
            .then(data => {
                console.log("Received response from server:", data);
                showResponseModal(data.choices[0].message.content); // Show the modal with the response
            })
            .catch(error => console.error('Error when contacting the server:', error));
        }
    }
});

function showResponseModal(responseText) {
    console.log(responseText);

    // Create the modal
    const modal = document.createElement('div');
    const modalId = `modal-${modals.length}`; // Unique ID for each modal
    modal.id = modalId;
    modal.style.position = 'fixed';
    modal.style.top = `${20 + modals.length * 70}px`; // Offset for each modal
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, 0)';
    modal.style.background = '#fefefe';
    modal.style.border = '1px solid #ccc';
    modal.style.padding = '20px';
    modal.style.zIndex = '10000000000';
    modal.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    modal.style.borderRadius = '8px'; // Rounded corners
    modal.style.cursor = 'pointer';

    // Create modal text
    const modalText = document.createElement('p');
    modalText.textContent = responseText;
    modalText.style.margin = '0'; // Remove default margin
    modalText.style.color = '#333'; // Darker text for readability
    modalText.style.fontSize = '16px'; // Increase font size
    modal.appendChild(modalText);

    // Create a full-cover copy button
    const copyButton = document.createElement('button');
    copyButton.style.position = 'absolute';
    copyButton.style.top = '0';
    copyButton.style.left = '0';
    copyButton.style.right = '0';
    copyButton.style.bottom = '0';
    copyButton.style.background = 'rgba(255, 255, 255, 0)'; // Transparent background
    copyButton.onclick = function(event) {
        event.stopPropagation(); // Prevent closing modal when clicking the button
        copyToClipboard(responseText); // Copy content
        console.log('Text copied:', responseText); // Debug text being copied
    };
    modal.appendChild(copyButton);

    // Append modal to the body
    document.body.appendChild(modal);

    // Add the modal to the array of modals
    modals.push(modal);
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    console.log('Copying text:', text); // Debug text being copied
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    const copied = document.execCommand('copy');
    console.log('Copy successful:', copied); // Check if execCommand returns true
    document.body.removeChild(tempInput);
    closeAllModals();
}

// Function to close a specific modal
function closeModal(modal) {
    document.body.removeChild(modal); // Remove the modal from the DOM
    modals = modals.filter(m => m !== modal); // Remove from the modal array
}

// Function to close all modals
function closeAllModals() {
    modals.forEach(modal => {
        document.body.removeChild(modal); // Remove all modals from the DOM
    });
    modals = []; // Clear the modal array
}
