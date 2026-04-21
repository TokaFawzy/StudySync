import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../Service/auth-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  validEmail = /^[A-Za-z0-9._%+-]+@ics\.tanta\.edu\.eg$/;
  registerForm=new FormGroup({
    fullName:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(100)]),
    userName:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(100),Validators.pattern(/^[A-Za-z0-9._-]+$/)]),
    seatNumber:new FormControl(''),
    role:new FormControl('STUDENT',[Validators.required]),
    department:new FormControl('',[Validators.required]),
    level:new FormControl(''),
    universityEmail:new FormControl('',[Validators.required,Validators.pattern(this.validEmail)]),
    password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(64),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)]),
    idCardPath:new FormControl('', [Validators.required]),
  })
  constructor(private AuthService:AuthService,private http:HttpClient){}
  updateValidators(role: string | null) {
      const controleNumber=this.registerForm.get('seatNumber');
      const controlLevel=this.registerForm.get('level');
      if(role=='STUDENT'){
        controleNumber?.setValidators([Validators.required,Validators.minLength(1),Validators.maxLength(30),Validators.pattern(/^[0-9]*$/)]),
        controlLevel?.setValidators([Validators.required])
      }else{
        controleNumber?.clearValidators(),
        controlLevel?.clearValidators(),
        controleNumber?.setValue(''),
        controlLevel?.setValue('')
      }
      controleNumber?.updateValueAndValidity(),
      controlLevel?.updateValueAndValidity();
    ;
  }
  ngOnInit() {
    this.updateValidators(this.registerForm.get('role')?.value!);
    this.registerForm.get('role')?.valueChanges.subscribe((value) => {
      this.updateValidators(value);
    });
  }
  imagePreview: string | null = null;
  onFileSelected(event: any) {
    const file=event.target.files[0];
    if(file){
      const formData=new FormData();
      formData.append('file',file);
      formData.append('upload_preset','study_sync_preset');
      this.registerForm.get('idCardPath')?.markAsTouched();
      this.registerForm.get('idCardPath')?.updateValueAndValidity();
      this.http.post(`https://api.cloudinary.com/v1_1/deg9slrmz/image/upload`,formData).subscribe({
        next: (res: any) => {
          this.registerForm.patchValue({ idCardPath: res.secure_url });
          this.imagePreview = res.secure_url;
        },
      });

    }
  }
  isSubmmited=false;
  hasError=false;
  sendData(){
    this.hasError=false;
    this.isSubmmited=false;
    if(this.registerForm.valid){
      const formValues=this.registerForm.value;
      const role=formValues.role;
      const {role:_,...payload}=formValues;
      if(role == 'STUDENT'){
        this.AuthService.registerStudent(payload).subscribe(
          {
            next:(res)=>{
              this.isSubmmited=true;
            },
            error:(err)=>{
              this.hasError=true;
            }
          }
        )
      }
      else{
        const instructorPayload={...payload,instructorType: role}
        this.AuthService.registerInstructor(instructorPayload).subscribe(
          {
            next:(res)=>{
              this.isSubmmited=true;
            },
            error:(err)=>{
              this.hasError=true;
            }
          }
        )
      }
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
}
