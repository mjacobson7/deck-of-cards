const { getNewDeck, drawFromDeck, addToCardMap, sortResults } = require('./utility');
let deckId;

const init = () => {
    getNewDeck()
        .then(newDeckId => {
            deckId = newDeckId;
            checkCards();
        })
}

const checkCards = () => {
    drawFromDeck(deckId)
        .then(newCards => addToCardMap(newCards))
        .then(isComplete => isComplete ? sortResults() : setTimeout(checkCards, 1000))
        .catch(err => console.log(`There was an unexpected error: ${err}`))
}

init();



