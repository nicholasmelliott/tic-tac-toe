# Tic Tac Toe Game

This is a simple Tic Tac Toe game built with HTML, CSS, and Vanilla Javascript.

## How to Play

1. Open the `index.html` file in a web browser.
2. Enter a player name and select game mode (Player vs Player or Player vs Computer).
3. Start the game by clicking the `Start Game` button.
4. In Player vs Player mode, players take turns clicking on a square to place their mark (either X or O).
5. In Player vs Computer mode, the player clicks on a square to place their mark, and the computer automatically places its mark on the board.
6. The game ends when one player has three marks in a row or all squares are filled.
7. The winning player's name will be displayed on the screen.
8. To play again, click the `New Game` button.

## Code Overview

The game logic is written in Javascript and is divided into three parts:

1. **startMenu**: This object handles the initial setup of the game, including player name input and game mode selection. It also initializes the game board and starts the game.

2. **player**: This object handles player data, including player name and the player's mark (either X or O). It also provides functions for selecting and deselecting the player.

3. **board**: This object handles the game board, including displaying the current game state, checking for a winner, and resetting the board.

The game also includes a simple AI for the computer player in Player vs Computer mode. The AI uses a simple algorithm to determine the best move to make based on the current game state.
