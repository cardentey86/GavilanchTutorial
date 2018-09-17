import {ChangeDetectorRef, Component, Directive, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
    animations: [
        // Each unique animation requires its own trigger. The first argument of the trigger function is the name
        trigger('rotatedState', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rotated', style({ transform: 'rotate(180deg)' })),
            transition('rotated => default', animate('400ms ease-out')),
            transition('default => rotated', animate('400ms ease-in'))
        ])
    ]
})
export class SidenavComponent implements OnInit {
  state: string = 'default';
  opened = true;
  events = [];
  screenWidth: number;

   constructor() {
       this.screenWidth = window.innerWidth;
       window.onresize = () => {
           this.screenWidth = window.innerWidth;
       }
   }

  AbrirCerrar(){
    if(this.opened)
    {
      this.opened=false;
        this.rotate();
    }
    else {
      this.opened = true;
        this.rotate();
    }
  }

    rotate() {
       if(this.opened)
       {
           this.state = 'default';
       } else {
           this.state = 'rotated';
       }

    }

  ngOnInit() {
  }

}
