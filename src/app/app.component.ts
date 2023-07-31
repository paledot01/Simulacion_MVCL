import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simulacionFisica';

  @ViewChild('start') start!: ElementRef;
  @ViewChild('restart') restart!: ElementRef;
  @ViewChild('input_altura') input_altura!: ElementRef; // --> para obtener el valor del input
  @ViewChild('input_gravedad') input_gravedad!: ElementRef; // --> para obtener el valor del input
  
  v_altura: number = 5;
  v_gravedad: number = 10;

  activarMetodoAnimacion: boolean = false;
  activarMetodoReinicio: boolean = false;

  // si no coloco el 1er codigo, se activa la animacion y como el reinicio esta activado, tambien se ejecuta cortando la animacion en ese orden pero casi instantaneamente
  activarMetodoAnimacionComponenteLienso(){ // --> modifica el valor del componente hijo, para que se active la animacion
    this.activarMetodoReinicio = false; //

    this.activarMetodoAnimacion = true;
    this.start.nativeElement.disabled = true;
    this.restart.nativeElement.disabled = false;
  }

  activarBotones(){
    this.start.nativeElement.disabled = true;
    this.restart.nativeElement.disabled = false;
  }

  /* al reiniciar se restablece los valores por defecto, por eso debemos 1er desactivar la animacion  */
  activarMetodoReinicioComponenteLienso(){
    this.v_altura = this.input_altura.nativeElement.value;
    this.v_gravedad = this.input_gravedad.nativeElement.value;

    this.activarMetodoAnimacion = false;
    
    this.activarMetodoReinicio = true;
    this.start.nativeElement.disabled = false;
    this.restart.nativeElement.disabled = true;
  }

}
