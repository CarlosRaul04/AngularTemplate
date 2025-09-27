import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-dialog',
  imports: [ CommonModule ],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog {
  @Input() open = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'danger' | 'success' | null = null
  @Input() noClose = false;

  @Output() closed = new EventEmitter<void>();

  exiting = false; // controla animación de salida

  close() {
    if(this.exiting) return; // evitar spam
    this.exiting = true;
    
    const duration = 200; // mismo que en SCSS (fade-out)
    setTimeout(() => {
      this.open = false;
      this.exiting = false;
      this.closed.emit();
    }, duration)
  }

  onBackdropClick() {
    if(!this.noClose) this.close();
  }
}
