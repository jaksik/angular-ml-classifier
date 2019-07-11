import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})

export class ColorPickerComponent {
  @Output() messageEvent = new EventEmitter<any>();

  public hue: string;
  public color: string;
  public rgb: any;

  sendMessage() {
    this.messageEvent.emit(this.rgb)
  }
}
