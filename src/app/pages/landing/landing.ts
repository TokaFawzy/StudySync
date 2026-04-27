import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
@Component({
  selector: 'app-landing',
  imports: [RouterOutlet, Header, Footer, RouterLinkWithHref],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit{
  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('userName')){
      this.router.navigate(['/home']);
    }
  }
}
