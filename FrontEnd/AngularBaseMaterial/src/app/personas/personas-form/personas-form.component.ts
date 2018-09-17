import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PersonaService} from '../persona.service';
import {Persona} from '../persona';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-personas-form',
  templateUrl: './personas-form.component.html',
  styleUrls: ['./personas-form.component.css']
})
export class PersonasFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private personaService: PersonaService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  persona: Persona;
  formGroup: FormGroup;
  modoEdicion: boolean = false;
  idPersona: number;
  fecha: string;
  pos: number;
    date = new Date();

    options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric"
    };

  ngOnInit() {
    this.formGroup = this.fb.group({
        nombre: '',
        fechaNacimiento: ''
    });



    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined)
      {
        return;
      }
        this.modoEdicion = true;
        this.idPersona = params["id"];
        this.personaService.getById(this.idPersona).subscribe(p => this.cargarFormularioEditar(p));
    })

  }

  cargarFormularioEditar(persona: Persona){
   // var dp = new DatePipe(navigator.language);
    this.pos = persona.fechaNacimiento.toString().indexOf('T');
    this.fecha = persona.fechaNacimiento.toString().substr(0,this.pos);
    //this.date = new Date(persona.fechaNacimiento);

    this.formGroup.patchValue({
        nombre: persona.nombre,

        fechaNacimiento: this.fecha
       // fechaNacimiento: dp.transform(persona.fechaNacimiento, "yyyy-MM-dd")

    });

    console.log(this.fecha);

  }


  save(){
    let persona: Persona = Object.assign({},this.formGroup.value);

    if(this.modoEdicion){
        persona.id = this.idPersona;
        this.personaService.update(persona).subscribe(p => this.onSaveSuccess(), error1 => console.error(error1 ));
    } else {
        this.personaService.create(persona).subscribe(p => this.onSaveSuccess(), error1 => console.error(error1 ));
    }

  }

    onSaveSuccess(){
      this.route.navigate(['/personas'])
  }
}
