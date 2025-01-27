import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { StudentsService } from 'src/app/services/students.service'
import { Students } from 'src/dataDummy/students'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  studentId: any
  students: any[] = []
  student: any
  error: string | null = null
  loading = true
  
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentsService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id') !== null) {
      this.studentId = this.route.snapshot.paramMap.get('id')
      this.studentService.getStudents().subscribe((data) => {

        this.students = data
      },
      async(error) => {
        console.error('Error al cargar estudiantes:', error);
        this.error = 'No se pudo cargar la lista de estudiantes.'
        await this.presentAlert()

        this.students = Students.studentsList

        const foundStudent = this.students.find(({ Id }) => Id === this.studentId)
          if (foundStudent) {
              this.student = foundStudent;
            }
        this.loading = false;
      })
    }
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
}
