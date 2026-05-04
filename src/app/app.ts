import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Landing } from "./pages/landing/landing";
import { AuthService } from './Service/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('StudySync');
  constructor(private router: Router,private authService: AuthService) { }
  ngOnInit() {
    const currentPath = window.location.pathname;
    this.getRole()
    if (localStorage.getItem('token')) {
      if (currentPath === '/landing' || currentPath === '/login' || currentPath === '/'|| currentPath === '/register'|| currentPath === '/') {
        this.router.navigate(['/home']);
      }
    }else{
        if (currentPath === '/home') {
        this.router.navigate(['/landing']);
      }
    }
    if(this.role=='INSTRUCTOR' && currentPath==='/home'){
      this.router.navigate(['/profCourses']);
    }
  }
    role: any;
    getRole(){
      this.role=localStorage.getItem('role');
      return this.role;
    }
}
