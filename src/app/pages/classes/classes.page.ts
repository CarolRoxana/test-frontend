import { Component, OnInit } from '@angular/core'
import { ClassesService } from 'src/app/services/classes.service'
import { Classes } from 'src/dataDummy/classes'
import { AlertController } from '@ionic/angular'


@Component({
  selector: 'app-classes',
  standalone: false,
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

  classes: any[] = []
  error: string | null = null
  searchTerm: string = ''
  filterClasses: any[] = []
  noResults = false
  
  constructor(
    private classesServices: ClassesService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    this.classesServices.getClasses().subscribe((data) => {
      this.classes = data
      this.filterClasses = data
    },
    async (error) => {
      console.error('Error al cargar clases:', error)
      this.error = 'No se pudo cargar la lista de clases.'
      await this.presentAlert()

      this.classes = Classes.classesList
      this.filterClasses = Classes.classesList
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


  searchStudent(event:any){
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm = searchTerm

    if (!searchTerm) {
      this.classes = this.filterClasses; 
    } else {
      this.classes = this.filterClasses.filter(classItem => 
        classItem.StudentId.FirstName.toLowerCase().includes(searchTerm) ||
        classItem.StudentId.LastName.toLowerCase().includes(searchTerm)
      );
    }

    this.noResults = this.classes.length === 0;
  }

}
