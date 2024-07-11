import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListKittenComponent } from './list-kitten/list-kitten.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListKittenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user_interactions-quest';
}
