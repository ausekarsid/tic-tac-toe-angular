import { Component, QueryList, ViewChildren } from '@angular/core';
import { PlayerMoves } from '../PlayerMoves';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @ViewChildren(SquareComponent) private squares: QueryList<SquareComponent> | undefined;

  winningCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  boxes: number[] = [...Array(9)];
  activePlayer: string = 'X';
  hasGameDrawn: boolean = false;
  isGameOver: boolean = false;
  history: PlayerMoves[] = [];
  winner: string = '';
  handleBoxClick(event: number) {
    if (this.winner !== '')
      return;
    const squarePointer = this.squares?.get(event) as SquareComponent;
    squarePointer.value = this.activePlayer;
    this.history.push({
      player: this.activePlayer,
      squareNumber: event
    });
    this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
    if (this.hasAnyOneWon() !== null) {
      this.isGameOver = true;
      this.winner = this.hasAnyOneWon() || '';
      this.squares?.forEach(square => square.disabled = true);
    }
  }

  resetGame() {
    this.history = [];
    this.activePlayer = 'X';
    this.hasGameDrawn = false;
    this.isGameOver = false;
    this.squares?.forEach(square => { square.value = ''; square.disabled = false; });
  }

  hasAnyOneWon() {
    const xMoves = this.history.filter(move => move.player === 'X').map(move => move.squareNumber);
    const oMoves = this.history.filter(move => move.player === 'O').map(move => move.squareNumber);
    if (this.winningCombinations.some(winMoves => winMoves.every(m => xMoves.includes(m))))
      return 'X';
    else if (this.winningCombinations.some(winMoves => winMoves.every(m => oMoves.includes(m))))
      return 'O';
    else
      return null;
  }
}
