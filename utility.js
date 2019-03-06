const axios = require('axios');

const valueMap = {
    'ACE': 1,
    'JACK': 11,
    'QUEEN': 12,
    'KING': 13
}
const cardMap = {
    SPADES: [],
    CLUBS: [],
    HEARTS: [],
    DIAMONDS: []
}
let completedSuits = [];

module.exports = {

    getNewDeck: () => {
        return axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => {
                console.log('Shuffling new deck... \n');
                return res.data.deck_id;
            })
            .catch(error => {
                console.log(`There was an unexpected error: ${error} \n`);
            })
    },

    drawFromDeck: (deckId) => {
        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            .then(res => {
                const cards = res.data.cards
                if (res.data.error) {
                    console.log(`Finished drawing from deck: ${res.data.error} \n`);
                }
                return cards;
            })
            .catch(error => {
                console.log(`There was an unexpected error: ${error} \n`);
            })
    },

    addToCardMap: (cards) => {
        cards.map(card => {
            if (!cardMap[card.suit].includes('QUEEN')) {
                cardMap[card.suit].push(card.value);
            } else if (!completedSuits.includes(card.suit)) {
                completedSuits.push(card.suit);
            }
        })
        return completedSuits.length == 4 ? true : false;
    },

    sortResults: () => {
        console.log(`Gathering results, please wait... \n`)
        for (suit in cardMap) {
            let sortedSuitArr = cardMap[suit].sort((a, b) => {
                [a, b] = [a, b].map(val => valueMap[val] ? valueMap[val] : parseInt(val));
                if (a > b) return 1
                if (a < b) return -1
                return 0
            }).toString().split(',').join(', ')

            console.log(`${suit}: [${sortedSuitArr}]`);
        }
    }
}
