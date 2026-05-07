import { InstructorService } from './../../Service/instructor/instructor-service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-prof-courses',
  standalone: true,
  imports: [Header, Footer, FormsModule, CommonModule, RouterLink],
  templateUrl: './prof-courses.html',
  styleUrl: './prof-courses.css',
})
export class ProfCourses implements OnInit {
  userName = localStorage.getItem('userName');
  courses: any[] = [];
  instructors: any[] = [];
  departmentsList = ['CS', 'IS', 'IT'];

  newCourse: any = {
    name: '',
    code: '',
    description: '',
    level: '',
    semester: '',
    departments: [],
    teachingAssistantIds: []
  };

  constructor(private instructorService: InstructorService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getInstructorCourses();
    this.getAllInstructors();
  }
  getInstructorCourses() {
    this.instructorService.getInstructorCourses().subscribe({
      next: (res: any) => {
        this.courses = res.data;
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }
  getAllInstructors() {
    this.instructorService.allInstructors().subscribe({
      next: (res: any) => {
        this.instructors = res.data.filter((ins: any) => ins.instructorType !== 'PROFESSOR');
        console.log(this.instructors);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching instructors:', err)
    });
  }

  onDepartmentChange(dept: string, event: any) {
    if (event.target.checked) {
      this.newCourse.departments.push(dept);
    } else {
      this.newCourse.departments = this.newCourse.departments.filter((d: string) => d !== dept);
    }
  }
  onTAChange(taId: string, event: any) {
    if (event.target.checked) {
      this.newCourse.teachingAssistantIds.push(taId);
    } else {
      this.newCourse.teachingAssistantIds = this.newCourse.teachingAssistantIds.filter((id: string) => id !== taId);
    }
  }

  createCourse() {
    this.instructorService.createCourse(this.newCourse).subscribe({
      next: (res: any) => {
        this.getInstructorCourses();
        this.resetForm();
        document.querySelector('#addCourseModal [data-bs-dismiss="modal"]')?.dispatchEvent(new MouseEvent('click'));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('فشل في إنشاء الكورس:', err)
    });
  }

  resetForm() {
    this.newCourse = {
      name: '', code: '', description: '',
      level: '', semester: '',
      departments: [], teachingAssistantIds: []
    };
  }

  iconColor = ['#393B8B', '#00B894', '#521278', '#E3AF11'];
  backgroundColors = [
    'rgba(99, 102, 241, 20%)',
    'rgba(16, 185, 129, 8.2%)',
    'rgba(245, 11, 237, 8.2%)',
    'rgba(236, 185, 33, 9%)'
  ];
}
