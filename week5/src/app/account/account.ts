import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [CommonModule, FormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account implements OnInit {
  constructor(private router: Router) {}

  user: any = null;
  temp_data: any = {};
  editing = false;

  // load user info from local storage
  ngOnInit() {
    const user_info = localStorage.getItem('user');
    if (!user_info) {
      this.router.navigate(['']);
      return;
    }
    this.user = JSON.parse(user_info);
    this.temp_data = { ...this.user };
  }

  // activate the edit form
  startEdit() {
    this.editing = true;
  }

  // allow edit on user data
  update() {
    localStorage.setItem('user', JSON.stringify(this.temp_data));
    this.user = { ...this.temp_data };
    this.editing = false;
    alert('Update Successful!');
  }

  // when cancel, reset the temp and editing check
  cancel() {
    this.temp_data = {...this.user};
    this.editing = false;
  }

  // route back to login
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
