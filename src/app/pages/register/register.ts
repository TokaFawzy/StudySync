import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  validEmail = /^[a-zA-Z0-9._%+-]{3,}@ics\.tanta\.edu\.eg$/;
  registerForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(8)]),
    userName:new FormControl('',[Validators.required,Validators.minLength(4)]),
    number:new FormControl(''),
    role:new FormControl('',[Validators.required]),
    department:new FormControl('',[Validators.required]),
    level:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.pattern(this.validEmail)]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    cardImg:new FormControl(null,[Validators.required]),
  })
  constructor(){
    this.registerForm.get('role')?.valueChanges.subscribe((value)=>{
      const controleNumber=this.registerForm.get('number');
      if(value=='student'){
        controleNumber?.setValidators([Validators.required,Validators.minLength(7)]);
      }else{
        controleNumber?.clearValidators();
      }
      controleNumber?.updateValueAndValidity();
    });
  }
  imagePreview: string | null = null;
  onFileSelected(event: any) {
    const file=event.target.files[0];
    if(file){
      this.registerForm.patchValue({cardImg:file});
      this.registerForm.get('cardImg')?.markAsTouched();
      this.registerForm.get('cardImg')?.updateValueAndValidity();
      const reader=new FileReader();
      reader.onload=()=>{
        this.imagePreview=reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

}
