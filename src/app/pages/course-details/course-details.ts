import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { RouterLink } from "@angular/router";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-course-details',
  imports: [Header, Sidebar, Footer],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {

}
