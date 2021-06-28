const quoteContainer = document.getElementById('quote-container');
const text = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get Quote From API
async function getQuote() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        const b=Math.floor(Math.random() * 10) + 1;
        console.log(b);
        if (data[b].author === '') {
            authorText.innerText = 'Unknown';
        } else {

            authorText.innerText = data[b].author;
        }
        // Reduce font size for long quotes
        if (data[b].text.length > 120) {
            text.classList.add('long-quote');
        } else {
            text.classList.remove('long-quote');
        }
        text.innerText = data[b].text;

    } catch (error) {
        getQuote();
    }
}

// On Load
getQuote();
// Tweet Quote
function tweetQuote() {
    const quote = text.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);




