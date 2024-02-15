import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent:any
  model:any ={};


  constructor(){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  register(){
    console.log(this.model);
  }

  cancel()
  {
    console.log('cancel')
  }

}
