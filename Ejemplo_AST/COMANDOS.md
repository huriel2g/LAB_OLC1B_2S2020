
## Laboratorio de Compiladores 1 - Sección B
Aux. Huriel Gómez

2do. Semestre 2020  


# TRABAJANDO MI APLICACION DENTRO DE MI CONTAINER DE DOCKER

Descargamos la imagen de docker: docker pull ubuntu:18.04


Creamos la carpeta para agregar nuestro proyecto:            

###docker run -v E:\AEjemploDocker:/miApp -p 3000:3000 --name "ejemplo" -it ubuntu:18.04 /bin/bash

docker run: Crea el container

-v: mapeo entre volumenes (para las carpetas)

-p: mapeo de los puertos 3000 del host y el container

"ejemplo": el nombre del contenedor se escribe entre comillas

-it: idicamos sobre que imagen queremos inicializar el contenedor



# APLICACIÓN EN NODE UTILIZANDO TYPESCRIPT
1) npm init					            -> nos crea un json que contiene la configuracion basica del proyecto
2) npm install -s typescript			-> instalamos typescript en nuestro proyecto
3) creamos un arbol de directorios:
	
	|- dist 		         (contiene los archivos .js traducidos a partir del codigo typescript)
	
	|- Gramatica             (contienen la gramatica para el analisis del lenguaje)
	
	|- node_modules		     (contiene las librerias necesarias para que funciones nuestra aplicacion)
	
	|- src	 		         (contiene los archivos .ts)
	
	|- package.json		     (contiene la estructura basica de nuestro proyecto)


### CONFIGURACION DE TYPESCRIPT
4) tsconfig.json 				-> Creamos el archivo con la configuracion basica de typescript
5) Configuramos la ruta de los archivos


{
    
    "compilerOptions": {
        
	"target": "es6",
        
	"module": "commonjs",
        
	"outDir": "dist",			-> indicamos la carpeta de salida de nuestros archivos js
        
	"sourceMap": true
    
    },
    
    "include": [
        
	"src/**/*.ts"				-> indicamos donde estan alojados los archivos de typescript
    ],
    
    "exclude": [
        
	"node_modules"
    
    ]

}




6) npm install -s jison				-> analizador jison
7) npm install -s express			-> express para el servidor	
8) npm install -s comunicarse		-> ayuda a nuestro servidor a comunicarse con otro tipo de servidores	

9) "start": "node dist",			-> agregamos esta linea en el jison	indica la carpeta donde se encuentra el index.js para ejecutar la aplicacion
   "main": "index.js",				-> configuracion que indica que archivo buscar para ejecutar nuestra aplicacion


# Para ejecutar la aplicacion
descargar el codigo del repositorio, dentro de la carpeta tecleamos el comando: 

npm install     -> descarga todas las librerias y/o dependencias que aparecene en el package.json


ejecutamos la aplicacion con el comando: node dist

consumimos la API: http://localhost:3000/analisis	-> Pueda que la API tenga errores, la estare revisando bien cuando tenga tiempo


Entrada que se evalua (En la clase Analisis): 
        
	numeric a=0.0;
        
	while(true){ 
            
	    a = "hola"+":)"+59.5*12.2+(10.9*12.12-56.56/0.1);
            
	    print(a+b||c>d);
        
	}


Traduccion generada:
        
	var a = 0.0;
        
	mientras(true){
            
	    a = hola + :) + 59.5 * 12.2 + 10.9 * 12.12 - 56.56 / 0.1;        
            
	    imprimir(a + b or c > d);
        
	}
