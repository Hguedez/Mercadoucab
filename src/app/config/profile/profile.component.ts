import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../core/services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  nombre:any;
  iduser:any;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){  
    let userStorage = localStorage.getItem('administrador');
    this.iduser = JSON.parse(userStorage);
    let token = this.iduser.token;
    this.iduser = this.iduser.id;
    this.adminService.getAdministrador(this.iduser,token).
    subscribe(
      res =>{
        let auxRes:any = res;
        this.nombre = auxRes.nombreUsuario;
      },
      err =>{
        console.log(err)
      }
    )
  }
}
