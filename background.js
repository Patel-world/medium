chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, '----------------')
  if (message.text) {
      // You would make a request to your secure server here instead of directly to OpenAI
      sendTextToServer(message.text, sendResponse);
      return true; // Return true to indicate that you wish to send a response asynchronously
  }
});

function sendTextToServer(text, callback) {
  // Your server should handle the API request and securely store the API key.
  // fetch('https://your-secure-server.com/api/send-text', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ text: text })
  // })
  

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API_Key' // Securely store and use your API key
    },
    body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Use the latest model
        messages: [
            { role: 'user', content: text } // Adjust the prompt format
        ],
        max_tokens: 50
    })
  }).then(response => response.json())
  .then(data => {
      console.log("Received response from server:", data);
      callback({ reply: data.reply }); // This should be the processed result from your server
  })
  .catch(error => console.error('Error when contacting the server:', error));
}
