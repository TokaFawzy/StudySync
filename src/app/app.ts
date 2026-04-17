import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Landing } from "./pages/landing/landing";

@Component({
  selector: 'app-root',
  imports: [ Header,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('StudySync');
}
