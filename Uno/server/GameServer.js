const GameSockets = require('./GameSockets.js')

const baseNumbers = [...Array(9).keys()].map(key => key + 1)
const specials = ['S', 'R', 'D']
const wilds = ['W', 'Z']
const colors = ['R', 'G', 'B', 'Y']

module.exports = class GameServer {

    constructor(serverName, host) {
        this.serverName = serverName
        this.host = host
        this.players = new Map()
        // Array of tuples
        this.moves = Array()
        this.discardPile = Array()
        this.hands = new Map()
        this.cards = Array()
        colors.map(color => {
            let collect = Array()
            let doubled = Array()
            doubled.push(...baseNumbers.map(numb => color.concat(numb.toString())))
            doubled.push(...specials.map(special => color.concat(special)))

            collect.push(...doubled)
            collect.push(...doubled)
            collect.push(color.concat('0'))

            collect.push(...wilds)
            return collect
        }).forEach(color => this.cards.push(...color))

        this.shuffleCards(this.cards)
    }

    addPlayer(username, socket) {
        this.players.set(username, socket)
        this.hands.set(username, Array())

        new GameSockets(socket, this)
    }

    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
    }

    dealToAll(amount) {
        [...Array(amount).keys()].forEach(() => {
            [...this.players.keys()].forEach(player => {
                this.drawCard(player, 1)
            })
        })
    }

    drawCard(player, amount) {
        if (amount >= this.cards.length) {
            this.regainDiscardPile()
        }

        let currentHand = this.hands.get(player)

        for (let i = 0; i < amount; i++) {
            let currentCard = this.cards.shift()
            currentHand.push(currentCard)
            this.moves.push([player, 'd' + currentCard])
        }
        this.hands.set(player, currentHand)
    }

    regainDiscardPile() {
        let lastCardPlayed = this.discardPile.pop()

        this.shuffleCards(this.discardPile)
        this.cards.push(...this.discardPile)
        this.discardPile = []
        this.discardPile.push(lastCardPlayed)
    }

    playCard(player, card) {
        if (!this.hands.get(player).includes(card)) {
            return 404
        }
        let hand = this.hands.get(player)
        let removed = hand.splice(hand.indexOf(card), 1)[0]

        this.discardPile.push(removed)
        this.moves.push([player, removed])

        return 200
    }
}