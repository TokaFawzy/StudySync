import { ChangeDetectorRef, Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Sidebar } from "../../components/sidebar/sidebar";
import { RouterLink } from "@angular/router";
import { AllCourses } from '../../Service/courses/all-courses';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [Header, Footer, Sidebar, RouterLink,CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  constructor(private courseService: AllCourses,private cdr: ChangeDetectorRef){}
  enrolledCourses: any[] = [];
  ngOnInit() {
    this.studentCourses();
  }

  backgroundColors=[
    'linear-gradient(135deg,#A29BFE 0%,#615D98 100%)',
    'linear-gradient(135deg,#FDCB6E 0%,#977942 100%)',
    'linear-gradient(135deg,#00B894 0%,#005242 100%)',
    'linear-gradient(135deg,#9921DE 0%,#521278 100%)']
  studentCourses(){
    this.courseService.studentCourses().subscribe({
      next: (res:any) => {
        this.enrolledCourses = res.data;
        this.cdr.detectChanges();
      }
    });
  }
}
