import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [
    {
      firstName: 'Gucci'
    }
  ];
  constructor(private http: Http) { }
  ngOnInit() {
    this.fetchUsers();
  }
  fetchUsers() {
    this.http.get('/users')
      .toPromise()
      .then( (response) => {
        this.users = response.json();
      });

  }

}
