import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SummaryResolver } from '@angular/compiler';

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
        this.users.map( (element) => {
          element.showEditForm = false;
          return element;
        });
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
      this.newUser = {};
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  editUser(userToEdit, userId) {
    console.log('USER TO EDIT', userToEdit);
    console.log('USER ID TO EDIT', userId);
    const userToSend = {...userToEdit};
    delete userToSend.showEditForm;
    console.log('USER TO SEND FOR EDIT,', userToSend);
    this.http.patch('/api/users/' + userId, userToEdit)
    .toPromise()
    .then( (response) => {
      console.log(response);
      const index = this.users.indexOf(userToEdit);
      this.users[index] = response.json();
      userToEdit.showEditForm = false;
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  showEditDiv(user) {
    user.showEditForm = !user.showEditForm;
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
