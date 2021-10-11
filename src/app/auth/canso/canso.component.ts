import { Component, OnInit } from '@angular/core';
import { UsersService } from "src/app/core/services/users.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-canso',
  templateUrl: './canso.component.html',
  styleUrls: ['./canso.component.scss']
})
export class CANSOComponent implements OnInit {
  registerMembers: FormGroup;

  constructor( private formBuilder: FormBuilder, private userService:UsersService,public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerMembers = this.formBuilder.group({
      Family_Name: ['', Validators.required],
      First_Name: ['', Validators.required],
      Email: ['', Validators.required]
    });
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'X', {
      duration: 3000,
    });
  }

  handleRegisterMember(){
  
    let formData = new FormData();
    formData.append('Family_Name', this.registerMembers.get('Family_Name').value);
    formData.append('First_Name', this.registerMembers.get('First_Name').value);
    formData.append('Email', this.registerMembers.get('Email').value);
    this.userService.registerMembers(formData)
    .subscribe(
      res => {
        let auxRes:any = res;
        this.openSnackBar("Person added");
        console.log(auxRes);
      },
      err => {
        console.log(err)
      }
    )
  }

}
