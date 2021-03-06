import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import { AnalystService } from '../../core/services/analyst.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addsample',
  templateUrl: './addSample.component.html',
  styleUrls: ['./addSample.component.scss']
})


export class AddSampleComponent implements OnInit{
  sub: any;
  id: any;
  idE: number;
  ids: number;
  auxRes: any;
  EstudioMuestraForm: FormGroup;
  admin: any;
  Muestras:any;
  token: string;
  IdEncuestados:any;
  constructor(private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder,private analistService:AnalystService,public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.EstudioMuestraForm = this.formBuilder.group({
      itemRows: this.formBuilder.array([this.initItemRows()])
    });
    this.getEncuestado();
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'X', {
      duration: 3000,
    });
  }

  handleStudieSample(){
    this.IdEncuestados = this.EstudioMuestraForm.get('itemRows').value;
    this.sub = this.route.params.subscribe(params => {
        this.idE = +params['id'];
        let userStorage = localStorage.getItem('analistaLogged');
        let user = JSON.parse(userStorage);
        let token = user.token;
        this.analistService.setEncuestados(this.idE,this.IdEncuestados,token)
        .subscribe(
          res => {
            let auxRes:any;
            auxRes = res;
            if(auxRes.estado == 'success'){          
            this.openSnackBar("Encuestado añadido");
            this.router.navigate(['/analitics/sample/'+this.idE]);
            }
          },
          err => {
            console.log(err)
          }
        )
      });
  } 

  getEncuestado(){
    this.sub = this.route.params.subscribe(params => {
      this.idE = +params['id'];
      let userStorage = localStorage.getItem('analistaLogged');
      let user = JSON.parse(userStorage);
      let token = user.token;
      this.analistService.getEncuestados(this.idE,token)
      .subscribe(
        res => {
          let auxRes:any;
          auxRes = res;
          if(auxRes.estado == 'success'){
            this.Muestras = auxRes.encuestados;
          }
        },
        err => {
          console.log(err)
        }
      )
    });  
  }

   //Agregar preguntas dinamicas
  initItemRows() {
    return this.formBuilder.group({
        id: ['',Validators.required]
    });
  }

  get formArr() {
    return this.EstudioMuestraForm.get('itemRows') as FormArray;
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  
}