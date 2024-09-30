chrome.storage.local.get('selectedText', ({ selectedText }) => {
  const suggestions = [
      `I totally agree with this point about ${selectedText}!`,
      `That's an interesting take on ${selectedText}. Here’s my perspective...`,
      `Thanks for sharing your thoughts on ${selectedText}. I believe...`
  ];
  const suggestionsDiv = document.getElementById('suggestions');
  suggestions.forEach(suggestion => {
      const button = document.createElement('button');
      button.textContent = suggestion;
      button.onclick = () => {
          navigator.clipboard.writeText(suggestion);
          alert('Comment copied to clipboard!');
      };
      suggestionsDiv.appendChild(button);
  });
});
