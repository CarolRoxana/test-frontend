import { Component, OnInit } from '@angular/core';
import { Students } from 'src/dataDummy/students'; 
import { StudentsService } from 'src/app/services/students.service';
@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})

export class StudentPage implements OnInit {

  students: any[] = []
  error: string | null = null

  constructor(private studentService: StudentsService) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe((data) => {
      console.log('Estudiantes:', data)
      this.students = data
    },
    (error) => {
      console.error('Error al cargar estudiantes:', error);
      this.error = 'No se pudo cargar la lista de estudiantes.'

      alert('Error en la API. Se mostrará data Dummy.')
      console.log(this.students = Students.studentsList)
    }
  )

  }

}
