import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CreateKittenComponent } from '../create-kitten/create-kitten.component';
import { Kitten } from '../models/kitten.model';
import { UserKittenComponent } from '../user-kitten/user-kitten.component';

@Component({
  selector: 'app-list-kitten',
  standalone: true,
  imports: [CommonModule, CreateKittenComponent, UserKittenComponent],
  templateUrl: './list-kitten.component.html',
  styleUrl: './list-kitten.component.css'
})
export class ListKittenComponent {

  kittenList: Kitten[] = [];

  onReceiveKitten(newKitten: Kitten) {
    this.kittenList.push(newKitten);
  }

  userKittens: Kitten[] = [];

  showDetails: boolean[]= [];

  adoptKitten(index: number): void {
    const adoptedKitten = this.kittenList.splice(index, 1)[0];
    this.userKittens.push(adoptedKitten);
    this.showDetails[index] = false;
  }

}
