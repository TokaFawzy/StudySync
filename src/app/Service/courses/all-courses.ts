import { CourseDetails } from './../../pages/course-details/course-details';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AllCourses {
  private coursesUrl="https://study-sync-project-production.up.railway.app/api";
  constructor(private http: HttpClient) { }
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  getCourses() {
    return this.http.get(`${this.coursesUrl}/courses`, { headers: this.getHeaders()});
  }
  getCourseById(id:any){
    return this.http.get(`${this.coursesUrl}/courses/${id}`, { headers: this.getHeaders()});
  }
  getCourseMaterials(courseId: string) {
  return this.http.get(`${this.coursesUrl}/courses/${courseId}/materials`, { headers:this.getHeaders() });
  }
  enrollInCourse(id:any){
    const headers = this.getHeaders();
    return this.http.post(`${this.coursesUrl}/enrollments/${id}`,{},{headers});
  }
  studentCourses(){
    const headers = this.getHeaders();
    return this.http.get(`${this.coursesUrl}/enrollments`,{headers});
  }
}
