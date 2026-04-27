import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Sidebar } from "../../components/sidebar/sidebar";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-courses',
  imports: [Header, Footer, Sidebar, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {

}
