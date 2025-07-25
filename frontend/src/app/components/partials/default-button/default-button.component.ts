import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  imports: [NgStyle],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent {

  @Input()
  type: 'submit' | 'button' = 'submit';
  @Input()
  text: string = 'Submit';
  @Input()
  bgColor: string = '#e72929';
  @Input()
  color: string = 'white';
  @Input()
  fontSizeRem: number = 1.3;
  @Input()
  widthRem: number = 12;
  @Output()
  onClick = new EventEmitter();
}
