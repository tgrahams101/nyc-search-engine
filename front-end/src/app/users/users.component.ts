import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [
  ];

  newUser: any;
  constructor(private http: Http) {
    this.newUser = {

    };
  }
  ngOnInit() {
    this.fetchUsers();
  }
  fetchUsers() {
    this.http.get('/api/users')
      .toPromise()
      .then( (response) => {
        this.users = response.json();
        console.log('ALL USERS', this.users);
      });
  }
  addUser() {
    this.http.post('/api/users', this.newUser)
    .toPromise()
    .then( (response) => {
      console.log(response);
      console.log(response.json());
      this.users.push(response.json());
      console.log(this.users);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  editUser(id, thisBinding) {
    console.log('ID', id);
    console.log('THIS BINDING', thisBinding);
  }

  deleteUser(id, ...args) {
    console.log('ID', id);
    let index;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
      }
    }
    console.log('INDEX TO DELETE', index);
    console.log('INDEXOF USERS TO DELETE', this.users.indexOf(args[0]));
    console.log('THIS BINDING', args);
    this.http.delete('/api/users/' + id)
      .toPromise()
      .then( (response) => {
        console.log(this.users);
        this.users.splice(index, 1);
        console.log('RESPONSE', response);
        console.log(this.users);
      })
      .catch( (error) => {
        console.log(error);
      });
  }

}
