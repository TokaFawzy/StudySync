import { AllCourses } from './../../Service/courses/all-courses';
import { ChangeDetectorRef, Component, OnInit, Pipe } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Sidebar } from "../../components/sidebar/sidebar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Header, RouterOutlet, Footer, Sidebar, RouterLinkWithHref,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  ngOnInit() {
  this.allCourses();
  }
  courses: any[] = [];
  constructor(private courseService: AllCourses, private cdr: ChangeDetectorRef) { }
  iconColor=[
    '#393B8B',
    '#00B894',
    '#521278',
    '#E3AF11',
  ]
  backgroundColors=[
    'rgba(99, 102, 241,20%)',
    'rgba(16, 185, 129,8.2%)',
    'rgba(245, 11, 237, 8.2%)',
    'rgba(236, 185, 33, 9%)']
  userName=localStorage.getItem('userName');
  allCourses(){
    this.courseService.getCourses().subscribe({
      next: (res:any) => {
        this.courses = res.data.map((c: any) => ({ ...c, enrolled: false }));
        this.cdr.detectChanges();
        console.log(res);
      },
    });
  }
  enroll(course:any){
    if (!course || !course.id) {
    console.error("Course ID is missing!");
    return;
  }
    this.courseService.enrollInCourse(course.id).subscribe({
      next: (res:any) => {
        console.log(res);
        course.enrolled=true;
        this.cdr.detectChanges();
      },
      error: (err:any) => {
        console.log(err);
        course.enrolled=false;
        this.cdr.detectChanges();
      }
    });
  }
}
