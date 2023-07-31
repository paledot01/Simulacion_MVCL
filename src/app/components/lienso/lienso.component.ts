import { Component, ViewChild, ElementRef, AfterContentInit, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-lienso',
  templateUrl: './lienso.component.html',
  styleUrls: ['./lienso.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LiensoComponent implements OnInit, AfterContentInit, OnChanges{
  
  @Input() activarAnimacion: boolean = false;
  @Input() restaurarAnimacion: boolean = false;

  
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  @ViewChild('canvas2', {static: true}) myCanvas2!: ElementRef;
  private canvas!: HTMLCanvasElement | null;
  private contexto!: CanvasRenderingContext2D | null ;

  private canvas2!: HTMLCanvasElement | null;
  private contexto2!: CanvasRenderingContext2D | null ;

  private image_men!: HTMLImageElement | null;
  private image_estatua!: HTMLImageElement | null;
  private image_poste!: HTMLImageElement | null;

  @Input() altura: number = 5; // altura en metros
  @Input() gravedad: number = 10; // 9.81 m/s^2
  men_altura: number = 1.75*(580/this.altura); // altura del hombre en pixeles
  poste_altura: number = 10*(580/this.altura); // altura de la torre en pixeles
  estatua_altura: number = 93*(580/this.altura); // altura de la torre en pixeles

  diferencial_tiempo: number = 0.02; // 20 ms
  proporcion: number = 0.5; // 580 px = 15 m -> 600 menos el grosor del cuerpo
  recorrido_inicial: number = (this.gravedad/2) * this.diferencial_tiempo * this.diferencial_tiempo * (580 / this.altura);// de metros a pixeles (20m -> 600px) en el 1er invervalo de tiempo
  contador_repeticion: number = 0;
  tiempo_ejecucion: number = 0;
  posicion_inicial: number = 50;
  posicion_final: number = 50;
  radius: number = 58/this.altura;
  id: any = 0;
  x: number = 160;
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
      this.contexto2!.fillStyle = 'rgb(150,150,150)';
      this.drawCirculo();
      this.drawLinea();
      this.drawTexto();
      this.drawReferencias();
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void { // --> detecta los cambios de los inputs. Se ejecuta antes de ngOnInit()
    //console.log('cambios: ', changes); // --> muestra los cambios
    if(this.altura){
      this.recorrido_inicial = (this.gravedad/2) * this.diferencial_tiempo * this.diferencial_tiempo * (580 / this.altura);// de metros a pixeles (20m -> 600px) en el 1er invervalo de tiempo
      this.radius = 58/this.altura;
      this.men_altura = 1.75*(580/this.altura);
      this.poste_altura = 10*(580/this.altura);
      this.estatua_altura = 93*(580/this.altura);
    }
    if(this.gravedad){
      this.recorrido_inicial = (this.gravedad/2) * this.diferencial_tiempo * this.diferencial_tiempo * (580 / this.altura);// de metros a pixeles (20m -> 600px) en el 1er invervalo de tiempo
    }
    if (this.activarAnimacion) {
      console.log('---------- Start ----------');
      this.start();
    }
    if (this.restaurarAnimacion) {
      //console.log('restart------');
      this.restart();
    }
  }

  drawLinea(){
    this.contexto2!.beginPath(); // linea superior
    this.contexto2!.strokeStyle = 'rgb(200,200,200)';
    this.contexto2!.setLineDash([10, 5]); // Establecer el patrón de línea punteada
    this.contexto2!.moveTo(20, 60);
    this.contexto2!.lineTo(110, 60);
    this.contexto2!.lineWidth = 1;
    this.contexto2!.stroke();

    this.contexto2!.beginPath(); // linea inferior
    this.contexto2!.strokeStyle = 'rgb(200,200,200)';
    this.contexto2!.setLineDash([10, 5]); // Establecer el patrón de línea punteada
    this.contexto2!.moveTo(20, 640);
    this.contexto2!.lineTo(110, 640);
    this.contexto2!.lineWidth = 1;
    this.contexto2!.stroke();

    this.contexto2!.beginPath(); // linea central, gravedad
    this.contexto2!.strokeStyle = 'rgb(150,150,150)';
    this.contexto2!.setLineDash([10, 0]);
    this.contexto2!.moveTo(50, 260);
    this.contexto2!.lineTo(50, 330);
    this.contexto2!.lineWidth = 2;
    this.contexto2!.stroke();

    this.contexto2!.beginPath(); // triangulo de la gravedad
    this.contexto2!.moveTo(45, 325);
    this.contexto2!.lineTo(55, 325);
    this.contexto2!.lineTo(50, 340);
    this.contexto2!.fill();
    //this.contexto2!.closePath(); -> esto dos de abajo es para hacer un triangulo sin relleno
    //this.contexto2!.stroke();
  }

  drawTexto(){
    this.contexto2!.font = '14px Courier New';
    this.contexto2!.fillStyle = 'rgb(200,200,200)';
    this.contexto2!.fillText('h = ' + this.altura + ' m', 20, 54);
    this.contexto2!.fillText(this.gravedad + ' m/s2', 20, 247);
    this.contexto2!.fillText('g' , 32, 296);
    this.contexto2!.fillText('S.R.', 20, 634);

    this.contexto2!.fillText('tiempo(formula) = ' + Math.sqrt((this.altura*2)/this.gravedad).toFixed(3) + ' s', 20, 697);
    this.contexto2!.fillText('tiempo(ejecución) = ' + '?.??? s', 290, 697);
    //this.contexto2!.fillText('h = ' + this.altura + ' m', 20, 54);
  }
  
  drawReferencias(){ // --> dibujamos al hombre y la torre
    if(this.altura >= 2){
      this.image_men = new Image();
      this.image_men.src = 'assets/men.png';
      this.image_men.onload = () => {
        this.contexto2!.drawImage(this.image_men!, 210, 640-this.men_altura, (this.men_altura*171)/600, this.men_altura); // 171x600 -> w = h*171/600 -> 600 es la altura de la imagen png
      }
    }
    if(this.altura >= 8){
      this.image_poste = new Image();
      this.image_poste.src = 'assets/poste_electrico.png';
      this.image_poste.onload = () => {
        this.contexto2!.drawImage(this.image_poste!, 220, 640-this.poste_altura, (this.poste_altura*222)/600, this.poste_altura); // 222x600 -> w = h*222/600 -> 600 es la altura de la imagen png
      }
    }
    if(this.altura >= 70){
      this.image_estatua = new Image();
      this.image_estatua.src = 'assets/estatua_libertad.png';
      this.image_estatua.onload = () => {
        this.contexto2!.drawImage(this.image_estatua!, 255, 640-this.estatua_altura, (this.estatua_altura*265)/600, this.estatua_altura); // 265x600 -> w = h*265/600
      }
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
    console.log("Altura: ", this.altura, " - Gravedad: ", this.gravedad);
    this.tiempo_ejecucion = new Date().getTime();
    this.id = setInterval(() => {this.update();}, 20);// comienza(desde la 1er) despues de 20 ms
  }

  update(): void {
    this.contexto!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    this.contador_repeticion++; // enpieza en 1
    this.y = this.recorrido_inicial * this.contador_repeticion * this.contador_repeticion;
    this.collision();
    this.drawCirculo();
    //console.log('posicion y: ' + this.y + ' - '  + this.contador_repeticion);
  }

  restart(){
    clearInterval(this.id); // detenemos el intervalo
    // CANVAS 1
    this.contexto!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    this.tiempo_ejecucion = 0; // el tiempo debe reiniciarse despues
    this.y = 0;
    this.contador_repeticion = 0;
    this.drawCirculo();
    // CANVAS 2
    this.contexto2!.clearRect(0, 0, this.canvas2!.width, this.canvas2!.height);
    this.drawLinea();
    this.drawTexto();
    this.drawReferencias();
    //this.restaurarAnimacion = false; // --> desactiva la animacion que fue activada desde el componente padre
  }

  collision(){
    if (this.y > 580) {
      this.y = 580;
      clearInterval(this.id); // detenemos el intervalo
      this.tiempo_ejecucion = new Date().getTime() - this.tiempo_ejecucion;
      //this.activarAnimacion = false; // --> desactiva la animacion que fue activada desde el componente padre
      console.log('Tiempo(ejecucion): ' + this.tiempo_ejecucion);
      this.contexto2!.clearRect(280,680, 300, 20);
      this.contexto2!.fillText('tiempo(ejecución) = ' + this.tiempo_ejecucion/1000 + ' s', 290, 697);
      //this.vy *= -0.7;
    }
  }


}
