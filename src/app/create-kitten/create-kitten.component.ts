import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Kitten } from '../models/kitten.model';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-kitten',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-kitten.component.html',
  styleUrl: './create-kitten.component.css'
})

export class CreateKittenComponent implements OnInit {

  newKitten!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newKitten = this.fb.group({
      name: ['', Validators.required],
      breed: ['', [Validators.required, this.breedValidator()]],
      birthdate: [new Date(), [Validators.required, this.rangeDateValidator(new Date(2000, 0, 1), new Date())]],
      photo: [''],
    });

    this.newKitten.patchValue({
      photo: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    });
  }

  @Output()
  sendKittenToList: EventEmitter<Kitten> = new EventEmitter<Kitten>;

  createKitten(): void {
    const kitten: Kitten = this.newKitten.value as Kitten;
    this.sendKittenToList.emit(kitten);
    this.newKitten.patchValue({
      name: '',
      breed: '',
      birthDate: new Date(),
      photo: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    });
  }

  onSubmit(): void {
    if (this.newKitten.valid) {
    console.log('newKitten submitted : ', this.newKitten.value);
    this.createKitten();
    }
  }

  objectKeys = Object.keys;

  getErrorMessage(fieldName: string, errorType: string): string {
    const errorMessage: { [key: string]: string } = {
      required: `${fieldName} is required.`,
      minlength: `The ${fieldName} should be longer than 3 characters.`,
      maxlength: `The ${fieldName} shoud be shorter than 15 characters.`,
      invalidBreed: `The breed you entered doesn't exist.`,
      wrongDate: `Please enter a valid date.`,
    };
    return errorMessage[errorType] || `Unknown Error for ${fieldName}`;
  }


  breedValidator(): (control: AbstractControl) => ValidationErrors | null {
    const validBreeds = [
      "Siamese", "British Shorthair", "Maine Coon", "Persian", "Ragdoll", "Sphynx", "Abyssinian",
      "American Shorthair", "Burmese", "Exotic Shorthair", "Birman", "Scottish Fold", "Bombay",
      "Siberian"]
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || validBreeds.some(breed => breed.toLowerCase() === control.value.toLowerCase())) {
        return null;
      }
      return { invalidBreed: true };
    };
  }

  rangeDateValidator(minDate: Date, maxDate: Date) {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = control.value;
      if (today < minDate || today > maxDate) {
        return {
          min: {
            requiredMin: minDate,
            requiredMax: maxDate,
          }
        };
      }
      return null;
    };
  }


}
