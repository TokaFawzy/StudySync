import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Sidebar } from "../../components/sidebar/sidebar";

@Component({
  selector: 'app-tasks',
  imports: [Header, Footer, Sidebar],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {

}
