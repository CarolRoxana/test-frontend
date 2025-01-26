import { Component, OnInit } from '@angular/core'
import { ClassesService } from 'src/app/services/classes.service';
import { Classes } from 'src/dataDummy/classes'


@Component({
  selector: 'app-classes',
  standalone: false,
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

  classes: any[] = []
  error: string | null = null;
  
  constructor(private classesServices:ClassesService) { }

  ngOnInit() {

    this.classesServices.getClasses().subscribe((data) => {
      console.log('Clases:', data)
      this.classes = data
    },
    (error) => {
      console.error('Error al cargar clases:', error)
      this.error = 'No se pudo cargar la lista de clases.'

      alert('Error en la API. Se mostrará data Dummy.')

      this.classes = Classes.classesList
      console.log(this.classes = Classes.classesList)
    })
  }

}
