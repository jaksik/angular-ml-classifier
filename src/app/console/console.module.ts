import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './console.component';



@NgModule({
  declarations: [ConsoleComponent],
  imports: [
    CommonModule
  ],
  exports: [ConsoleComponent]

})
export class ConsoleModule { }
