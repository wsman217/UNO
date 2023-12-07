const baseNumbers = [...Array(9).keys()].map(key => key + 1)
const specials = ['S', 'R', 'D']
const wilds = ['W', 'Z']
const colors = ['R', 'G', 'B', 'Y']

module.exports = class GameServer {

    constructor(serverName, host, hostSocket) {
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

            collect.push(...wilds)
            return collect
        }).forEach(color => this.cards.push(...color))

        this.shuffleCards(this.cards)

        this.addPlayer(host, hostSocket)
    }

    addPlayer(username, socket) {
        this.players.set(username, socket)

        this.players.forEach(value => {
            value.emit("setPlayers", [...this.players.keys()])
        })

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

    dealToAll(amount) {
        [...Array(amount).keys()].forEach(() => {
            [...this.players.keys()].forEach(player => {
                this.dealCard(player, 1)
            })
        })
    }

    dealCard(player, amount) {
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

    drawCard(player, amount) {
        if (this.order[0] !== player) {
            return 401
        }

        this.dealCard(player, amount)
        this.updateCards(player)
        return 200
    }

    regainDiscardPile() {
        let lastCardPlayed = this.discardPile.pop()

        this.shuffleCards(this.discardPile)
        this.cards.push(...this.discardPile)
        this.discardPile = []
        this.discardPile.push(lastCardPlayed)
    }

    playCard(player, card) {
        if (this.order[0] !== player) {
            return 401
        }

        if (!this.hands.get(player).includes(card)) {
            return 404
        }

        if (!this.canPlay(card))
            return 400

        let hand = this.hands.get(player)
        let removed = hand.splice(hand.indexOf(card), 1)[0]

        this.discardPile.push(removed)
        this.moves.push([player, removed])

        this.checkIfGameOver()
        this.nextTurn()

        let cardType = card.charAt(1)

        if (cardType === 'S')
            this.nextTurn()

        if (cardType === 'R') {
            this.reverseOrder()
            this.nextTurn()
        }

        if (cardType === 'D') {
            this.drawCard(this.order[0], 2)
        }

        if (cardType === 'Z') {
            this.drawCard(this.order[0], 4)
        }

        return 200
    }

    canPlay(toPlayCard) {
        let cardColor = toPlayCard.charAt(0)
        let cardType = toPlayCard.charAt(1)

        let prevCardColor = this.moves.at(-1).charAt(0)
        let prevCardType = this.moves.at(-1).charAt(1)

        let isSpecial = ['S', 'R', 'D'].includes(cardType)
        let isWild = ['W', 'Z'].includes(cardType)

        if (isSpecial) {
            return prevCardColor === cardColor;
        }

        if (isWild) {
            return true
        }

        return cardColor === prevCardColor || cardType === prevCardType
    }

    nextTurn() {
        this.order.push(this.order.shift())
    }

    reverseOrder() {
        this.order.reverse()
    }

    updateAllCards() {
        [...this.players.keys()].forEach(player => {
            this.updateCards(player)
        })
    }

    updateCards(player) {
        [...this.players.values()].forEach(value => value.emit("updateCards", player, this.hands.get(player)))
    }

    startGame() {
        this.order = [this.host, ...[...this.players.keys()].filter(name => name !== this.host)]

        this.dealToAll(7)

        this.updateAllCards()
        console.log(this.serverName + " started")
    }

    checkIfGameOver() {
        [...this.hands.keys()].forEach(player => {
            if (this.hands.get(player).length === 0) {
                this.winner = player
                this.gameOver()
            }
        })
    }

    gameOver() {
        // TODO emit to all players that the game is over.
    }
}
