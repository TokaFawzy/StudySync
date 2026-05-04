import { ChangeDetectorRef, Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Footer } from "../../components/footer/footer";
import { AllCourses } from '../../Service/courses/all-courses';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [Header, Sidebar, Footer,CommonModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  constructor(private courseService: AllCourses,private cdr: ChangeDetectorRef,private routes:ActivatedRoute){}
  courseMaterials:any=[];
  courseName:string='';
  id:string|null=null;
  ngOnInit() {
    this.id=this.routes.snapshot.paramMap.get('courseId');
    this.getCourseDetails()
    if (this.id) {
      this.fetchMaterials(this.id);
    }
  }
  getCourseDetails(){
    this.courseService.getCourseById(this.id).subscribe({
      next: (res:any) => {
        this.courseName=res.data.name;
        console.log(res);
        this.cdr.detectChanges();
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  fetchMaterials(id:string){
    this.courseService.getCourseMaterials(id).subscribe({
      next: (res:any) => {
        this.courseMaterials = res.data;
        console.log(this.courseMaterials);
        this.cdr.detectChanges();
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  getFileIcon(url: string, type: string): string {
    if (type === 'LINK') return 'fa-link text-success';
    if (!url) return 'fa-file text-secondary';
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'fa-file-pdf text-danger';
      case 'doc':
      case 'docx':
        return 'fa-file-word text-primary';
      case 'xls':
      case 'xlsx':
        return 'fa-file-excel text-success';
      case 'ppt':
      case 'pptx':
        return 'fa-file-powerpoint text-warning';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'fa-file-image text-info';
      default:
        return 'fa-file text-secondary';
  }
}
}
