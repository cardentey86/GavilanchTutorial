import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PersonaService} from '../persona.service';
import {Persona} from '../persona';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate, registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es'
registerLocaleData(localeEs);
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

    this.formGroup.setValue({
        nombre: persona.nombre,
        fechaNacimiento: formatDate(persona.fechaNacimiento,"yyyy-MM-dd", "es-EA")
    });
    //console.log(new Date(persona.fechaNacimiento));
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
