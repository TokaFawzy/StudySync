import { InstructorService } from './../../Service/instructor/instructor-service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { ActivatedRoute } from "@angular/router";
import { Footer } from "../../components/footer/footer";
import { AllCourses } from '../../Service/courses/all-courses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [Header, Sidebar, Footer,CommonModule,FormsModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  constructor(private courseService: AllCourses,
    private instructorService: InstructorService,
    private cdr: ChangeDetectorRef,private routes:ActivatedRoute){}
  courseMaterials:any=[];
  courseTasks: any = [];
  courseName:string='';
  id:string|null=null;
  role:string|null=localStorage.getItem('role');
  ngOnInit() {
    this.id=this.routes.snapshot.paramMap.get('courseId');
    this.getCourseDetails()
    if (this.id) {
      this.fetchMaterials(this.id);
      this.fetchTasks(this.id);
    }
  }
  getCourseDetails(){
    this.courseService.getCourseById(this.id).subscribe({
      next: (res:any) => {
        this.courseName=res.data.name;
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
        this.cdr.detectChanges();
      },error:(err)=>{
        console.log(err);
      }
    })
  }
  fetchTasks(id: string) {
    this.instructorService.getCourseTasks(id).subscribe({
      next: (res: any) => {
        this.courseTasks = res.data;
        this.cdr.detectChanges();
      }, error: (err) => {
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
  materialToDeleteId: string | null = null;
  deleteType: 'MATERIAL' | 'TASK' = 'MATERIAL';

  prepareDelete(id: string, type: 'MATERIAL' | 'TASK' = 'MATERIAL') {
    this.materialToDeleteId = id;
    this.deleteType = type;
  }

  executeDelete() {
    if (this.materialToDeleteId && this.id) {
      if (this.deleteType === 'MATERIAL') {
        this.deleteMaterial(this.materialToDeleteId);
      } else {
        this.deleteTask(this.materialToDeleteId);
      }
      document.querySelector('#deleteConfirmModal [data-bs-dismiss="modal"]')?.dispatchEvent(new MouseEvent('click'));
    }
  }
  deleteMaterial(materialId: string) {
    this.instructorService.deleteMaterial(this.id!, materialId).subscribe({
      next: (res: any) => {
        this.fetchMaterials(this.id!);
        console.log("Done");
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error deleting material:', err)
    });
  }

  deleteTask(taskId: string) {
    this.instructorService.deleteTask(this.id!, taskId).subscribe({
      next: (res: any) => {
        this.fetchTasks(this.id!);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error deleting task:', err)
    });
  }
    activeTab: string = 'materials';

    setActiveTab(tab: string) {
      this.activeTab = tab;
    }
  isEditMode = false;
  materialToEditId: string | null = null;

  prepareEdit(material: any) {
    this.isEditMode = true;
    this.materialToEditId = material.id;
    this.newMaterial = {
      title: material.title,
      type: material.type,
      url: material.type === 'LINK' ? material.url : ''
    };
  }
  isTaskEditMode = false;
  taskToEditId: string | null = null;

  prepareEditTask(task: any) {
    this.isTaskEditMode = true;
    this.taskToEditId = task.id;
    const date = new Date(task.deadline);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const formattedDeadline = date.toISOString().slice(0, 16);

    this.newTask = {
      title: task.title,
      description: task.description || '',
      deadline: formattedDeadline,
      maxGrade: task.maxGrade
    };
  }
  newTask = {
    title: '',
    description: '',
    deadline: '',
    maxGrade:0
  };
  newMaterial = {
    title: '',
    type: 'FILE',
    url: ''
  };
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

submitMaterial() {
  if (!this.id) return;
  if (this.isEditMode && this.materialToEditId) {
    const updateData = { title: this.newMaterial.title };
    this.instructorService.updateMaterial(this.id, this.materialToEditId, updateData).subscribe({
      next: (response: any) => {
        this.handleSuccess('#addMaterialModal');
      },
      error: (err) => this.handleError(err)
    });
  } else {
    const formData = new FormData();
    formData.append('title', this.newMaterial.title);
    formData.append('type', this.newMaterial.type);
    if (this.newMaterial.type === 'FILE' && this.selectedFile) {
      formData.append('file', this.selectedFile);
    } else if (this.newMaterial.type === 'LINK') {
      formData.append('url', this.newMaterial.url);
    }
    this.instructorService.addMaterial(this.id, formData).subscribe({
      next: (response: any) => {
        console.log("Material added successfully:", response);
        this.handleSuccess('#addMaterialModal');
      },
      error: (err) => this.handleError(err)
    });
  }
}

submitTask() {
  if (!this.id) return;
  const taskPayload = {
    ...this.newTask,
    deadline: this.newTask.deadline ? new Date(this.newTask.deadline).toISOString() : ''
  };
  const request = this.isTaskEditMode && this.taskToEditId
    ? this.instructorService.updateTask(this.id, this.taskToEditId, taskPayload)
    : this.instructorService.addTask(this.id, taskPayload);

  request.subscribe({
    next: (response: any) => {
      console.log(this.isTaskEditMode ? "Task updated:" : "Task created:", response);
      this.handleSuccess('#addTaskModal');
    },
    error: (err) => this.handleError(err)
  });
}

private handleSuccess(modalId: string) {
  if (modalId === '#addMaterialModal') {
    this.fetchMaterials(this.id!);
  } else if (modalId === '#addTaskModal') {
    this.fetchTasks(this.id!);
  }
  this.resetForm();
  document.querySelector(`${modalId} [data-bs-dismiss="modal"]`)?.dispatchEvent(new MouseEvent('click'));
  this.cdr.detectChanges();
}

private handleError(err: any) {
  console.error('Error:', err);
  alert('حدث خطأ. يرجى التأكد من البيانات والمحاولة مرة أخرى.');
}
  resetForm() {
    this.newTask = { title: '', description: '', deadline: '',maxGrade:0};
    this.newMaterial = { title: '', type: 'FILE', url: '' };
    this.selectedFile = null;
    this.isEditMode = false;
    this.materialToEditId = null;
    this.isTaskEditMode = false;
    this.taskToEditId = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

}
