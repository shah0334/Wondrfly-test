import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router = inject(Router);
  city: string = '';
  program: string = '';
  category: string = '';
  openTask1() {
    this.router.navigate(['task1']);
  }

  openTask2() {
    const url = `task2${this.city ? `/${this.city}` : ''}${
      this.program ? `/${this.program}` : ''
    }${this.category ? `/${this.category}` : ''}`;

    this.router.navigate([url]);
  }
}
