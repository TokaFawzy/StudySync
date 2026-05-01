import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-quiz',
  imports: [Header, Sidebar, Footer],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {

}
