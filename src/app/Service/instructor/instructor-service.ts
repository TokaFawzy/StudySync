import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private baseUrl='https://study-sync-project-production.up.railway.app/api'
  constructor(private http: HttpClient) { }
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  getInstructorCourses(){
    return this.http.get(`${this.baseUrl}/courses/my-courses`,{headers:this.getHeaders()});
  }
  createCourse(courseData: any) {
    return this.http.post(`${this.baseUrl}/courses`, courseData, { headers: this.getHeaders() });
  }
  allInstructors(){
    return this.http.get(`${this.baseUrl}/instructors`,{headers:this.getHeaders()});
  }
  deleteMaterial(courseId: string,materialId: string) {
    return this.http.delete(`${this.baseUrl}/courses/${courseId}/materials/${materialId}`, { headers: this.getHeaders() });
  }
  addMaterial(courseId: string, formData: FormData) {
  return this.http.post(`${this.baseUrl}/courses/${courseId}/materials`, formData, { headers: this.getHeaders() });
}
  updateMaterial(courseId: string, materialId: string, data: { title: string }) {
    return this.http.put(`${this.baseUrl}/courses/${courseId}/materials/${materialId}`, data, { headers: this.getHeaders() });
  }
  getCourseTasks(courseId: string) {
    return this.http.get(`${this.baseUrl}/courses/${courseId}/tasks`, { headers: this.getHeaders() });
  }
  addTask(courseId: string, taskData: any){
    return this.http.post(`${this.baseUrl}/courses/${courseId}/tasks`, taskData, {headers:this.getHeaders()});
  }
  updateTask(courseId: string, taskId: string, taskData: any) {
    return this.http.put(`${this.baseUrl}/courses/${courseId}/tasks/${taskId}`, taskData, { headers: this.getHeaders() });
  }
  deleteTask(courseId: string, taskId: string) {
    return this.http.delete(`${this.baseUrl}/courses/${courseId}/tasks/${taskId}`, { headers: this.getHeaders() });
  }
  deleteCourse(courseId: string) {
    return this.http.delete(`${this.baseUrl}/courses/${courseId}`, { headers: this.getHeaders() });
  }
}
