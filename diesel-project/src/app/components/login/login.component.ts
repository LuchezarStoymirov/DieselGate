import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user = {username: '', password: ''};
  newUser = {username: '', password: '', email: '', claims: []};
  
  showRegister = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.loginUser(this.user).subscribe(
      res => {
        if (res) {
          this.router.navigate(['/overview']);
        } else {
          alert('Login failed');
        }
      },
      error => {
        alert('Login failed: ' + error);
      }
    );
  }

  register(event: Event) {
    event.preventDefault();
    
    this.userService.registerUser(this.newUser).subscribe(
      res => {
        if (res) {
          alert('User created successfully, you can now log in!')
        } else {
          alert('Registration failed');
        }
      },
      error => {
        // Log the full error object to the console
        console.error('Full error info:', error);
        console.error('Error details:', error.error);
        alert('Registration failed: ' + error.message);
      }
    );
  }
  
  toggleForm() {
    this.showRegister = !this.showRegister;
  }
}
