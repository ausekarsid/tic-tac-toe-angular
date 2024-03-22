import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input('squareNumber') squareNumber: number = 0;
  @Input('value') value: string = '';
  @Input('disabled') disabled = false;
  @Output('handleClick') handleClick = new EventEmitter<number>();
  handleClickAction() {
    this.handleClick.emit(this.squareNumber);
  };
}
