# Dice Betting Game

This is a simple dice betting game implemented in React. Players can place bets on the sum of two dice rolls. The bets can be on whether the sum is less than 7, equal to 7, or greater than 7.

## Table of Contents

- [Introduction](#introduction)
- [Rules](#rules)
- [Setup](#setup)
- [How to Play](#how-to-play)
- [Contributing](#contributing)

## Introduction

This game allows players to place bets and roll dice. The player can bet on three possible outcomes: the sum of the two dice is less than 7, equal to 7, or greater than 7. The game will automatically calculate the payout based on the bet amount and the outcome of the dice roll.

## Rules

1. The player can place a bet on three outcomes:
   - Sum less than 7
   - Sum equal to 7
   - Sum greater than 7
2. The bet amount should be between 1 and 100.
3. If the player bets correctly:
   - Bet on less than 7 or greater than 7: payout is double the bet amount.
   - Bet on equal to 7: payout is triple the bet amount.
4. The player can set the bet amount for future rounds.
5. The game keeps track of the last 10 rounds.

## Setup

To get a local copy up and running follow these simple steps:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

   git clone https://github.com/KunshArora912/DiceBettingGame.git
   cd DiceBettingGame
   npm install
   npm start

### How to Play
Enter the bet amount in the input field.
Drag the glass to one of the three options (less than 7, equal to 7, greater than 7).
Click the "Roll" button to roll the dice.
Check the result and see if you won!
The results table on the top right shows the results of the last 10 rounds.


### Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
   
