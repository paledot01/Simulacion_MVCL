import { Time } from '@angular/common';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit, AfterContentInit {

  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  posicion_inicial: number = 50;
  posicion_final: number = 50;
  id: any = 0;
  x: number = 0;
  y: number = 0;
  vy: number = 0;

  ngOnInit(): void {
    
  }
  
  ngAfterContentInit(): void {
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const contexto = canvas.getContext('2d');
    
    if (contexto) {
      contexto.lineWidth = 1;
      contexto.strokeStyle = 'white';
      contexto.strokeRect(10, 10, 580, 580);
      contexto.fillStyle = 'red';
      this.drawRectangulo(contexto, this.x, this.y, 20, 20);
    }

    //this.update(contexto!);
    //this.id = setInterval(() => {this.update(contexto!)});
    //this.id = setInterval(() => {this.update(contexto!), 50});
  }

  drawRectangulo(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number){
    
    context.fillRect(x, y, width, height);
    console.log("dibujando rectangulo");
  }

  update(context: CanvasRenderingContext2D): void {
    context.clearRect(this.x-5, this.y-5, 40, 40);
    this.y += this.vy;
    this.vy += 0.1;
    this.drawRectangulo(context, this.x, this.y, 20, 20);
    this.collision();
    console.log('posicion y: ' + this.y + ' - ' + 'velocidad y: ' + this.vy);
  }

  collision(){
    if (this.y > 580) {
      this.y = 580;
      this.vy *= -0.7;
    }
  }
  //const myCanvas = document.getElementById("myCanvas");
  //const ctx = myCanvas.getContext("2d");

}
