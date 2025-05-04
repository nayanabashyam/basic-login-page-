import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security-message.component.html',
  styleUrls: ['./security-message.component.scss']
})
export class SecurityMessageComponent {
  isExpanded = false;
  
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}