import { AuthService } from './../../Service/auth-service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  constructor(private authService: AuthService) {}
  role: any;
  ngOnInit(){
    this.getRole()
  }
  getRole(){
    this.role=localStorage.getItem('role');
    return this.role;
  }
}
