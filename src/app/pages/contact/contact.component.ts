import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form: FormGroup;
  formSubmitAttempt: boolean = false;
  coreservice = inject(CoreService)

  constructor(private fb: FormBuilder,private http: HttpClient) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }


  onSubmit() {
    this.formSubmitAttempt = true; // Set the flag to true when form is submitted
    if (this.form.valid) {
      const formData = this.form.value;
      console.log("formData",formData)

      this.coreservice.postForm(formData);
    } else {
      console.log('Form is invalid!');
    }
  }


}
