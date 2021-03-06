import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpoll',
  templateUrl: './addPoll.component.html',
  styleUrls: ['./create.component.scss']
})


export class AddPollComponent implements OnInit{
  nombre:any;
  auxRes: any;
  createEncuestaForm: FormGroup;
  admin: any;
  subCategorias:any;
  token: string;
  Idsubcategoria:number;
  nombreCategoria:string;
  constructor(private formBuilder: FormBuilder,private adminService:AdminService,public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createEncuestaForm = this.formBuilder.group({
      selectSubCategoria: ['',Validators.required],
      Nombre: ['',Validators.required]
    });
    this.getSubCategoria();
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'X', {
      duration: 3000,
    });
  }

  handleCreateMarca(){
    this.Idsubcategoria = this.createEncuestaForm.get('selectSubCategoria').value
    this.nombreCategoria = this.createEncuestaForm.get('Nombre').value
    this.adminService.createEncuesta(this.Idsubcategoria,this.nombreCategoria)
    .subscribe(
      res => {
        let auxRes:any;
        auxRes = res;
        if(auxRes.estado == 'success'){
          this.openSnackBar("Encuesta creada con exito");
          window.location.reload();
        }
        else if(auxRes.estado != 'success'){
          this.openSnackBar("Ocurrio un problema");
        }
      },
      err => {
        console.log(err)
      }
    )
  } 

  getSubCategoria(){
    this.adminService.getSubcategorias()
    .subscribe(
      res => {
        let auxRes:any;
        auxRes = res;
        if(auxRes.estado == 'success'){
          this.subCategorias = auxRes.subcategorias;
        }
      },
      err => {
        console.log(err)
      }
    )
  }
  
}