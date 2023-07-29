import { Component, ViewChild, ElementRef, AfterContentInit, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lienso',
  templateUrl: './lienso.component.html',
  styleUrls: ['./lienso.component.css']
})
export class LiensoComponent implements OnInit, AfterContentInit{
  
  @Input() activarAnimacion: boolean = false;
  @Input() restaurarAnimacion: boolean = false;

  
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  @ViewChild('canvas2', {static: true}) myCanvas2!: ElementRef;
  private canvas!: HTMLCanvasElement | null;
  private contexto!: CanvasRenderingContext2D | null ;

  private canvas2!: HTMLCanvasElement | null;
  private contexto2!: CanvasRenderingContext2D | null ;

  private image_men!: HTMLImageElement | null;
  private image_torre!: HTMLImageElement | null;

  gravedad: number = 10; // 9.81 m/s^2
  diferencial_tiempo: number = 0.02; // 20 ms
  //@Input() altura: number = 5; // altura en metros
  altura: number = 5; // altura en metros
  proporcion: number = 0.5; // 580 px = 15 m -> 600 menos el grosor del cuerpo
  recorrido_inicial: number = (this.gravedad/2) * this.diferencial_tiempo * this.diferencial_tiempo * (580 / this.altura);// de metros a pixeles (20m -> 600px) en el 1er invervalo de tiempo
  contador_repeticion: number = 0;
  tiempo: number = 0;
  posicion_inicial: number = 50;
  posicion_final: number = 50;
  radius: number = 58/this.altura;
  //grounded: boolean = false;
  id: any = 0;
  x: number = 200;
  y: number = 0;
  

  ngOnInit(): void {}
  
  ngAfterContentInit(): void {
    this.canvas = this.myCanvas.nativeElement;
    this.contexto = this.canvas!.getContext('2d');
    
    this.canvas2 = this.myCanvas2.nativeElement;
    this.contexto2 = this.canvas2!.getContext('2d');

    if (this.contexto) {
      //this.contexto.beginPath();// permite separar las figuras, definiendo el inicio de la figura
      //contexto.lineWidth = 1;
      //contexto.strokeRect(10, 10, 580, 580);
      this.contexto.fillStyle = 'rgb(230,230,230)';
      this.drawCirculo();
      this.drawLinea();
      this.drawTexto();
      this.drawReferencias();
    }
  }
  
  ngOnChanges(): void { // --> activa la animacion
    if (this.activarAnimacion) {
      console.log('start------');
      this.start();
    }
    if (this.restaurarAnimacion) {
      console.log('restart------');
      this.restart();
    }
  }

  drawLinea(){
    this.contexto2!.beginPath();
    this.contexto2!.strokeStyle = 'rgb(200,200,200)';
    this.contexto2!.setLineDash([10, 5]); // Establecer el patrón de línea punteada
    this.contexto2!.moveTo(20, 60);
    this.contexto2!.lineTo(185, 60);
    //this.contexto!.strokeStyle = 'black';
    this.contexto2!.lineWidth = 1;
    this.contexto2!.stroke();

    this.contexto2!.beginPath();
    this.contexto2!.strokeStyle = 'rgb(200,200,200)';
    this.contexto2!.setLineDash([10, 5]); // Establecer el patrón de línea punteada
    this.contexto2!.moveTo(20, 640);
    this.contexto2!.lineTo(185, 640);
    //this.contexto!.strokeStyle = 'black';
    this.contexto2!.lineWidth = 1;
    this.contexto2!.stroke();
  }

  drawTexto(){
    this.contexto2!.font = '14px Courier New';
    this.contexto2!.fillStyle = 'rgb(200,200,200)';
    this.contexto2!.fillText('Altura: ' + 20, 20, 54);
    this.contexto2!.fillText('S.R.', 20, 634);
  }
  
  drawReferencias(){ // --> dibujamos al hombre y la torre
    this.image_men = new Image();
    this.image_men.src = 'assets/men.png';
    this.image_men.onload = () => {
      this.contexto2!.drawImage(this.image_men!, 0, 0, 28.5, 100); // 171x600 -> w = h*171/600
    }
    this.image_torre = new Image();
    this.image_torre.src = 'assets/torre.png';
    this.image_torre.onload = () => {
      this.contexto2!.drawImage(this.image_torre!, 250, 0, 44.1, 100); // 265x600 -> w = h*265/600
    }
  }

  drawCirculo(){
    //this.contexto!.fillRect(this.x, this.y, 20, 20);
     // permite separar las figuras, definiendo el inicio de la figura
    this.contexto!.beginPath();
    this.contexto!.arc(this.x, this.y + 60, this.radius, 0, 2 * Math.PI); // x, y, radio, angulo inicial, angulo final
    this.contexto!.fill();
  }

  start(){
    this.tiempo = new Date().getTime();
    this.id = setInterval(() => {this.update();},20);// comienza(desde la 1er) despues de 20 ms
  }

  update(): void {
    this.contexto!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    this.contador_repeticion++; // enpieza en 1
    this.y = this.recorrido_inicial * this.contador_repeticion * this.contador_repeticion;
    this.collision();
    this.drawCirculo();
    console.log('posicion y: ' + this.y + ' - '  + this.contador_repeticion);
  }

  restart(){
    clearInterval(this.id); // detenemos el intervalo
    this.contexto!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    this.tiempo = 0;
    this.y = 0;
    this.contador_repeticion = 0;
    this.drawCirculo();
    //this.restaurarAnimacion = false; // --> desactiva la animacion que fue activada desde el componente padre
  }

  collision(){
    if (this.y > 580) {
      this.y = 580;
      clearInterval(this.id); // detenemos el intervalo
      this.tiempo = new Date().getTime() - this.tiempo;
      //this.activarAnimacion = false; // --> desactiva la animacion que fue activada desde el componente padre
      console.log('tiempo: ' + this.tiempo);
      //this.vy *= -0.7;
    }
  }


}
