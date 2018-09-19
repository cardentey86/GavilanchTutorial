import {Component, Inject, OnInit} from '@angular/core';
import {Persona} from './persona';
import {PersonaService} from './persona.service';
import {Alert} from 'selenium-webdriver';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogComponent} from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[];

  constructor(public personaService: PersonaService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas(){
    this.personaService.getAll().subscribe(
        p => this.personas = p,
        error1 => console.error(error1)
        );
  }

  modalDialog(persona: Persona): void {
      const dialogRef = this.dialog.open(DialogComponent, {
           width: '550px',
           data: {
               persona: persona,
               title : "Confirmacion",
               message: "Desea eliminar a: "+persona.nombre
           }
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result == 1)
          {
              this.deletePersona(persona);
              this.getPersonas();
          }
      });
  }

  deletePersona(persona: Persona){
     this.personaService.delete(persona).subscribe(p => this.getPersonas(), error1 => console.error(error1));
  }


}

