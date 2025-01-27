import { Component, OnInit } from '@angular/core'
import { Students } from 'src/dataDummy/students'
import { StudentsService } from 'src/app/services/students.service'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})

export class StudentPage implements OnInit {

  students: any[] = []
  error: string | null = null

  constructor(

    private studentService: StudentsService,
    private router: Router,
    private alertController: AlertController
  
  ) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe((data) => {
      console.log(data)
      this.students = data
    },
    async(error) => {
      console.error('Error al cargar estudiantes:', error);
      this.error = 'No se pudo cargar la lista de estudiantes.'
      await this.presentAlert()

      this.students = Students.studentsList

    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error de conexión',
      subHeader: 'No se pudo conectar con la API',
      message: 'Se mostrará información de ejemplo.',
      buttons: ['Aceptar'],
      cssClass: 'custom-alert',
      mode: 'ios'
    });

    await alert.present();
  }

  goToProfile(studentID: string) {
    this.router.navigateByUrl(`/profile/${studentID}`)
  }

}
