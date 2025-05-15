// Food Matching Game in TypeScript
var FoodGame = /** @class */ (function () {
    function FoodGame() {
        var _this = this;
        this.cards = [];
        this.flippedCards = [];
        this.score = 0;
        this.lockBoard = false;
        this.gameBoard = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score');
        this.restartButton = document.getElementById('restart-btn');
        this.initializeGame();
        this.restartButton.addEventListener('click', function () { return _this.resetGame(); });
    }
    FoodGame.prototype.initializeGame = function () {
        var _this = this;
        var foodPairs = [
            { food: 'Pizza', image: '🍕' },
            { food: 'Burger', image: '🍔' },
            { food: 'Salad', image: '🥗' },
            { food: 'Sushi', image: '🍣' },
            { food: 'Taco', image: '🌮' },
            { food: 'Ice Cream', image: '🍦' }
        ];
        // Create pairs of cards
        this.cards = [];
        foodPairs.forEach(function (item, index) {
            _this.cards.push({
                id: index * 2,
                food: item.food,
                image: item.image,
                flipped: false,
                matched: false
            });
            _this.cards.push({
                id: index * 2 + 1,
                food: item.food,
                image: item.image,
                flipped: false,
                matched: false
            });
        });
        this.shuffleCards();
        this.renderGame();
    };
    FoodGame.prototype.shuffleCards = function () {
        var _a;
        // Fisher-Yates shuffle algorithm
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
        }
    };
    FoodGame.prototype.renderGame = function () {
        var _this = this;
        this.gameBoard.innerHTML = '';
        this.cards.forEach(function (card) {
            var cardElement = document.createElement('div');
            cardElement.className = 'col-3 col-md-2 mb-3';
            var cardInner = document.createElement('div');
            cardInner.className = "game-card ".concat(card.flipped || card.matched ? 'flipped' : '');
            cardInner.dataset.id = card.id.toString();
            var cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.textContent = '?';
            var cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            cardBack.textContent = card.image;
            cardBack.setAttribute('aria-label', card.food);
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardElement.appendChild(cardInner);
            if (!card.matched) {
                cardInner.addEventListener('click', function () { return _this.flipCard(card.id); });
            }
            _this.gameBoard.appendChild(cardElement);
        });
    };
    FoodGame.prototype.flipCard = function (cardId) {
        if (this.lockBoard)
            return;
        var card = this.cards.find(function (c) { return c.id === cardId; });
        if (!card || card.flipped || card.matched)
            return;
        card.flipped = true;
        this.renderGame();
        this.flippedCards.push(cardId);
        if (this.flippedCards.length === 2) {
            this.checkForMatch();
        }
    };
    FoodGame.prototype.checkForMatch = function () {
        var _this = this;
        this.lockBoard = true;
        var _a = this.flippedCards, id1 = _a[0], id2 = _a[1];
        var card1 = this.cards.find(function (c) { return c.id === id1; });
        var card2 = this.cards.find(function (c) { return c.id === id2; });
        if (card1 && card2 && card1.food === card2.food) {
            // Match found
            card1.matched = true;
            card2.matched = true;
            this.score += 10;
            this.scoreElement.textContent = this.score.toString();
            // Check for game completion
            if (this.cards.every(function (card) { return card.matched; })) {
                setTimeout(function () {
                    alert("Congratulations! You won with a score of ".concat(_this.score, "!"));
                }, 500);
            }
            this.flippedCards = [];
            this.lockBoard = false;
        }
        else {
            // No match
            setTimeout(function () {
                if (card1)
                    card1.flipped = false;
                if (card2)
                    card2.flipped = false;
                _this.flippedCards = [];
                _this.renderGame();
                _this.lockBoard = false;
            }, 1000);
        }
    };
    FoodGame.prototype.resetGame = function () {
        this.score = 0;
        this.scoreElement.textContent = '0';
        this.flippedCards = [];
        this.lockBoard = false;
        this.initializeGame();
    };
    return FoodGame;
}());
// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('game-board')) {
        new FoodGame();
    }
});
