import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userName=signal<string|null>(localStorage.getItem('userName'));
  constructor(private router:Router){}
  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }
  logout(){
    localStorage.clear();
    this.userName.set(null);
    this.router.navigate(['/landing'])
  }
}
