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
        this.drawPile = Array()
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
    }

    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
    }

    dealToAll(cards, amount) {
        [...Array(amount).keys()].forEach(() => {
            [...this.players.keys()].forEach(player => {
                this.dealToOne(cards, player, 1)
            })
        })
    }

    dealToOne(cards, player, amount) {
        let currentHand = this.hands.get(player)
        currentHand.push(...[...Array(amount).keys()].map(() => cards.shift()))
        this.hands.set(player, currentHand)
    }

    playCard(player, card) {

    }
}