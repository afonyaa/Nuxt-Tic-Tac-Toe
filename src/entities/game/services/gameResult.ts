import { GameSign, type GameField } from "../domain";

export function hasWinner(gameField: GameField) {
    if (checkWinner(gameField, GameSign.Circle)) {
        return GameSign.Circle
    }
    if (checkWinner(gameField, GameSign.Cross)) {
        return GameSign.Cross
    }
    return false
}

function checkWinner(gameField: GameField, player: GameSign) {
    for (let row = 0; row < 3; row++) {
        if (gameField[row][0] === player &&
            gameField[row][1] === player &&
            gameField[row][2] === player) {
            return true;
        }
    }

    for (let col = 0; col < 3; col++) {
        if (gameField[0][col] === player &&
            gameField[1][col] === player &&
            gameField[2][col] === player) {
            return true;
        }
    }

    if (gameField[0][0] === player &&
        gameField[1][1] === player &&
        gameField[2][2] === player) {
        return true;
    }

    if (gameField[0][2] === player &&
        gameField[1][1] === player &&
        gameField[2][0] === player) {
        return true;
    }

    return false;
}

export function isGameFieldFull(gameField: GameField) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (gameField[row][col] === null) {
                return false;
            }
        }
    }
    return true;
}