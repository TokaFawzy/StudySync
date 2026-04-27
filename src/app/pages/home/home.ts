import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../../components/sidebar/sidebar";

@Component({
  selector: 'app-home',
  imports: [Header, RouterOutlet, Footer, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  userName=localStorage.getItem('userName');
}
