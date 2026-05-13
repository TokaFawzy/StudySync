import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  baseUrl='https://study-sync-project-production.up.railway.app/api/courses'
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  constructor(private http: HttpClient) { }
  submitTask(courseId: string,taskId:string, taskData: any) {
    return this.http.post(`${this.baseUrl}/${courseId}/tasks/${taskId}/submit`, taskData,{headers:this.getHeaders()});
  }
  getMySubmissions(courseId: string) {
    return this.http.get(`${this.baseUrl}/${courseId}/my-submissions`, { headers: this.getHeaders() });
  }
  getUnsubmitedTasks(courseId: string) {
    return this.http.get(`${this.baseUrl}/${courseId}/tasks/unsubmitted`, { headers: this.getHeaders() });
  }
}
