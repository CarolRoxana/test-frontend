import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Students', url: '/student', icon: 'people' },
    { title: 'Tutors', url: '/tutors', icon: 'folder' },
    { title: 'Classes', url: '/classes', icon: 'school' },

  ]
  constructor() {}
}
