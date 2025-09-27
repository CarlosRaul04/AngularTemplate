import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Dialog } from '@app/shared/dialog/dialog';
import { CardComponent } from "@app/shared/card/card";

@Component({
  selector: 'app-dialog-demo',
  imports: [CommonModule, Dialog, CardComponent],
  templateUrl: './dialog-demo.html',
  styleUrl: './dialog-demo.scss'
})
export class DialogDemo {
  isOpen = false;

  openDialog() {
    this.isOpen = true;
  }

  onClosed(){
    this.isOpen = false;
    console.log('Dialog cerrado');
  }

}
