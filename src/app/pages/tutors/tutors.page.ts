import { Component, OnInit } from '@angular/core'
import { Tutors } from '../../../dataDummy/tutors'
import { TutorsService} from '../../services/tutors.service'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-tutors',
  standalone: false,
  templateUrl: './tutors.page.html',
  styleUrls: ['./tutors.page.scss'],
})

export class TutorsPage implements OnInit {
  tutors: any[] = []
  error: string | null = null

  filteredTutors: any[] = []

  specialities = [
    'Baby', 'Shoes', 'Tools', 'Computers', 'Health',
    'Books', 'Jewelery', 'Movies', 'Home', 'Beauty',
    'Music', 'Industrial'
  ]
  selectedSpeciality: string = ''


  constructor( 
    private tutorsService:TutorsService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.tutorsService.getTutors().subscribe((data) => {
      this.tutors = data
      this.filteredTutors = data
    },
    async (error) => {
      console.error('Error al cargar totures:', error)
      this.error = 'No se pudo cargar la lista de tutores.'
      await this.presentAlert()

      this.tutors = Tutors.tutorsList
      this.filteredTutors = Tutors.tutorsList
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

  filterTutors(event: any) {
    const speciality = event.detail.value
    this.selectedSpeciality = speciality
    
    if (!speciality) {
      this.filteredTutors = this.tutors;
    } else {
      this.filteredTutors = this.tutors.filter(
        tutor => tutor.Speciality === speciality
      )
    }
  }

}

