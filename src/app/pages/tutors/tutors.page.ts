import { Component, OnInit } from '@angular/core';
import { Tutors } from '../../../dataDummy/tutors'
import { TutorsService} from '../../services/tutors.service'
@Component({
  selector: 'app-tutors',
  standalone: false,
  templateUrl: './tutors.page.html',
  styleUrls: ['./tutors.page.scss'],
})
export class TutorsPage implements OnInit {
  tutors: any[] = []
  error: string | null = null

  constructor( private tutorsService:TutorsService) { }

  ngOnInit() {
    this.tutorsService.getTutors().subscribe((data) => {
      console.log('Toturs:', data)
      this.tutors = data
    },
    (error) => {
      console.error('Error al cargar totures:', error)
      this.error = 'No se pudo cargar la lista de tutores.'

      alert('Error en la API. Se mostrará data Dummy.')

      this.tutors = Tutors.tutorsList
      console.log (this.tutors = Tutors.tutorsList)
    })

  }

}
