import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="page-header">Dashboard</h2>
    <p>Welcome to your Dashboard</p>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

}
