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
      name_members: ['', Validators.required],
      email_members: ['', Validators.required],
      phone: ['', Validators.required],
      job_title: ['', Validators.required],
      organisation: ['',Validators.required],
      entry_id: ['',Validators.required],
      entry_date: ['',Validators.required],
    });
  }

  handleRegisterMember(){
    let name_members = this.registerMembers.get('name_members').value;
    let email_members = this.registerMembers.get('email_members').value;
    let phone = this.registerMembers.get('phone').value;
    let job_title = this.registerMembers.get('job_title').value;
    let organisation = this.registerMembers.get('organisation').value;
    let entry_id = this.registerMembers.get('entry_id').value;
    let entry_date = this.registerMembers.get('entry_date').value;
    this.userService.registerMembers(name_members,email_members,phone,job_title,organisation,entry_id,entry_date)
    .subscribe(
      res => {
        let auxRes:any = res;
        console.log(auxRes);
      },
      err => {
        console.log(err)
      }
    )
  }

}
