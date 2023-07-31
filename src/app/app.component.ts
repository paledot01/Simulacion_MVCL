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

  activarMetodoAnimacion: boolean = false;
  activarMetodoReinicio: boolean = false;

  v_altura: number = 5;
  new_altura: number = 5;
  //input_altura: number = 5; // altura en metros
  //send_altura: number = 5; // altura en metros


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
    //console.log('send_altura: ', this.send_altura, ' input_altura: ', this.input_altura);
    this.activarMetodoAnimacion = false;
    
    this.activarMetodoReinicio = true;
    this.start.nativeElement.disabled = false;
    this.restart.nativeElement.disabled = true;
  }

}
