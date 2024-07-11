import { Component, Input } from '@angular/core';
import { Kitten } from '../models/kitten.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-kitten',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-kitten.component.html',
  styleUrl: './user-kitten.component.css'
})
export class UserKittenComponent {

  @Input()
  kitten!: Kitten;
}
