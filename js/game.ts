// // Food Matching Game in TypeScript
// class FoodGame {
//     private cards: {id: number, food: string, image: string, flipped: boolean, matched: boolean}[];
//     private flippedCards: number[];
//     private score: number;
//     private gameBoard: HTMLElement;
//     private scoreElement: HTMLElement;
//     private restartButton: HTMLElement;
//     private lockBoard: boolean;

//     constructor() {
//         this.cards = [];
//         this.flippedCards = [];
//         this.score = 0;
//         this.lockBoard = false;
//         this.gameBoard = document.getElementById('game-board') as HTMLElement;
//         this.scoreElement = document.getElementById('score') as HTMLElement;
//         this.restartButton = document.getElementById('restart-btn') as HTMLElement;
        
//         this.initializeGame();
//         this.restartButton.addEventListener('click', () => this.resetGame());
//     }

//     private initializeGame(): void {
//         const foodPairs = [
//             { food: 'Pizza', image: '🍕' },
//             { food: 'Burger', image: '🍔' },
//             { food: 'Salad', image: '🥗' },
//             { food: 'Sushi', image: '🍣' },
//             { food: 'Taco', image: '🌮' },
//             { food: 'Ice Cream', image: '🍦' }
//         ];

//         // Create pairs of cards
//         this.cards = [];
//         foodPairs.forEach((item, index) => {
//             this.cards.push({
//                 id: index * 2,
//                 food: item.food,
//                 image: item.image,
//                 flipped: false,
//                 matched: false
//             });
//             this.cards.push({
//                 id: index * 2 + 1,
//                 food: item.food,
//                 image: item.image,
//                 flipped: false,
//                 matched: false
//             });
//         });

//         this.shuffleCards();
//         this.renderGame();
//     }

//     private shuffleCards(): void {
//         // Fisher-Yates shuffle algorithm
//         for (let i = this.cards.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
//         }
//     }

//     private renderGame(): void {
//         this.gameBoard.innerHTML = '';
        
//         this.cards.forEach(card => {
//             const cardElement = document.createElement('div');
//             cardElement.className = 'col-3 col-md-2 mb-3';
            
//             const cardInner = document.createElement('div');
//             cardInner.className = `game-card ${card.flipped || card.matched ? 'flipped' : ''}`;
//             cardInner.dataset.id = card.id.toString();
            
//             const cardFront = document.createElement('div');
//             cardFront.className = 'card-front';
//             cardFront.textContent = '?';
            
//             const cardBack = document.createElement('div');
//             cardBack.className = 'card-back';
//             cardBack.textContent = card.image;
//             cardBack.setAttribute('aria-label', card.food);
            
//             cardInner.appendChild(cardFront);
//             cardInner.appendChild(cardBack);
//             cardElement.appendChild(cardInner);
            
//             if (!card.matched) {
//                 cardInner.addEventListener('click', () => this.flipCard(card.id));
//             }
            
//             this.gameBoard.appendChild(cardElement);
//         });
//     }

//     private flipCard(cardId: number): void {
//         if (this.lockBoard) return;
        
//         const card = this.cards.find(c => c.id === cardId);
//         if (!card || card.flipped || card.matched) return;
        
//         card.flipped = true;
//         this.renderGame();
        
//         this.flippedCards.push(cardId);
        
//         if (this.flippedCards.length === 2) {
//             this.checkForMatch();
//         }
//     }

//     private checkForMatch(): void {
//         this.lockBoard = true;
        
//         const [id1, id2] = this.flippedCards;
//         const card1 = this.cards.find(c => c.id === id1);
//         const card2 = this.cards.find(c => c.id === id2);
        
//         if (card1 && card2 && card1.food === card2.food) {
//             // Match found
//             card1.matched = true;
//             card2.matched = true;
//             this.score += 10;
//             this.scoreElement.textContent = this.score.toString();
            
//             // Check for game completion
//             if (this.cards.every(card => card.matched)) {
//                 setTimeout(() => {
//                     alert(`Congratulations! You won with a score of ${this.score}!`);
//                 }, 500);
//             }
            
//             this.flippedCards = [];
//             this.lockBoard = false;
//         } else {
//             // No match
//             setTimeout(() => {
//                 if (card1) card1.flipped = false;
//                 if (card2) card2.flipped = false;
//                 this.flippedCards = [];
//                 this.renderGame();
//                 this.lockBoard = false;
//             }, 1000);
//         }
//     }

//     public resetGame(): void {
//         this.score = 0;
//         this.scoreElement.textContent = '0';
//         this.flippedCards = [];
//         this.lockBoard = false;
//         this.initializeGame();
//     }
// }

// // Initialize the game when the DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     if (document.getElementById('game-board')) {
//         new FoodGame();
//     }
// });


interface Card {
    id: number;
    food: string;
    image: string;
    flipped: boolean;
    matched: boolean;
}

class FoodGame {
    private cards: Card[];
    private flippedCards: number[];
    private score: number;
    private gameBoard: HTMLElement;
    private scoreElement: HTMLElement;
    private restartButton: HTMLElement;
    private lockBoard: boolean;

    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.score = 0;
        this.lockBoard = false;
        this.gameBoard = document.getElementById('game-board') as HTMLElement;
        this.scoreElement = document.getElementById('score') as HTMLElement;
        this.restartButton = document.getElementById('restart-btn') as HTMLElement;
        
        this.initializeGame();
        this.restartButton.addEventListener('click', () => this.resetGame());
    }

    private initializeGame(): void {
        const foodPairs = [
            { food: 'Pizza', image: '🍕' },
            { food: 'Burger', image: '🍔' },
            { food: 'Salad', image: '🥗' },
            { food: 'Sushi', image: '🍣' },
            { food: 'Taco', image: '🌮' },
            { food: 'Ice Cream', image: '🍦' }
        ];

        this.cards = [];
        foodPairs.forEach((item, index) => {
            this.cards.push({
                id: index * 2,
                food: item.food,
                image: item.image,
                flipped: false,
                matched: false
            });
            this.cards.push({
                id: index * 2 + 1,
                food: item.food,
                image: item.image,
                flipped: false,
                matched: false
            });
        });

        this.shuffleCards();
        this.renderGame();
    }

    private shuffleCards(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    private renderGame(): void {
        this.gameBoard.innerHTML = '';
        
        this.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'col-3 col-md-2 mb-3';
            
            const cardInner = document.createElement('div');
            cardInner.className = `game-card ${card.flipped || card.matched ? 'flipped' : ''}`;
            cardInner.dataset.id = card.id.toString();
            
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.textContent = '?';
            
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            cardBack.textContent = card.image;
            cardBack.setAttribute('aria-label', card.food);
            
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardElement.appendChild(cardInner);
            
            if (!card.matched) {
                cardInner.addEventListener('click', () => this.flipCard(card.id));
            }
            
            this.gameBoard.appendChild(cardElement);
        });
    }

    private flipCard(cardId: number): void {
        if (this.lockBoard) return;
        
        const card = this.cards.find(c => c.id === cardId);
        if (!card || card.flipped || card.matched) return;
        
        card.flipped = true;
        this.renderGame();
        
        this.flippedCards.push(cardId);
        
        if (this.flippedCards.length === 2) {
            this.checkForMatch();
        }
    }

    private checkForMatch(): void {
        this.lockBoard = true;
        
        const [id1, id2] = this.flippedCards;
        const card1 = this.cards.find(c => c.id === id1);
        const card2 = this.cards.find(c => c.id === id2);
        
        if (card1 && card2 && card1.food === card2.food) {
            card1.matched = true;
            card2.matched = true;
            this.score += 10;
            this.scoreElement.textContent = this.score.toString();
            
            if (this.cards.every(card => card.matched)) {
                setTimeout(() => {
                    alert(`Congratulations! You won with a score of ${this.score}!`);
                }, 500);
            }
            
            this.flippedCards = [];
            this.lockBoard = false;
        } else {
            setTimeout(() => {
                if (card1) card1.flipped = false;
                if (card2) card2.flipped = false;
                this.flippedCards = [];
                this.renderGame();
                this.lockBoard = false;
            }, 1000);
        }
    }

    public resetGame(): void {
        this.score = 0;
        this.scoreElement.textContent = '0';
        this.flippedCards = [];
        this.lockBoard = false;
        this.initializeGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('game-board')) {
        new FoodGame();
    }
});