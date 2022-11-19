# README
## Resumen
El cliente está compuesto de 3 paginas
1. Shift Assignments (Menú Shifts)
Al acceder a esta página se carga por defecto el calendario de la semana actual y aparece seleccionado en el selector 
   de Weekly Calendar. En el selector también se muestran 5 calendarios futuros.
   
   Una vez seleccionado un Company (Empresa) se mostrará los monitored services (servicios monitoreados) de ese company.
   
   Una vez seleccionado el monitored service se habilitará el botón Search. El botón search muestra los datos en el calendario
   según los datos seleccionados en el filtro.
   
   Para que se muestren datos en el calendario, se debe seleccionar la semana actual, la empresa Recorrido.cl y el servicio 
   Recorrido App, solo esa combinación tiene datos.
   
   En el calendario se aclara los Empleados asignados según día y horario. 

   No assigned significa que ningún empleado cubre ese bloque de tiempo.
   Los bloques que tiene el nombre de empleado junto a la palabra Conflict correspondes a los bloques cubiertos por más
   de un empleado. Los bloques de tiempo se marcan como Conflict para tenerlos a la vista y permitir analizar si las 
   asignaciones son adecuadas.
   
2. Services Assignments (Menú Edit Assignments -> Services)
    
    Esta vista no se terminó de implementar, la idea era definir la cobertura del servicio. 
    Actualmente solo permite seleccionar los calendarios y mostrar sus fechas en el calendario.
   
3. Employee Assignments (Menú Edit Assignments -> Employees)

   En esta vista se permite seleccionar un calendario, un empleado y luego buscar, lo cual muestra el calendario de disponibilidad
   del empleado.
   
   Una vez cargado el calendario se puede hacer click en las celdas para indicar que el empleado cubre o no un bloque de tiempo.
   
   Luego de seleccionar o des seleccionar las celdas se puede hacer click en Save para guardar los datos.
    
   Los cambios realizados en esta vista se reflejan en la vista de Shift Assignments.

## Aclaraciones
El cliente se conecta por defecto a un api cuya url base es localhost:3000, esto puede ser modificado baseUrl en src/main.js
En App.vue se usan los siguientes componentes implementados:
- nav-var, que muestra el menú principal con los links
- router-view, para renderizar las vistas existentes

Cada vista tiene su propio filtro y reutilizar el componente weekly-calendar
Algunos filtros comporten componentes de tipo selector.
Cada componente de tipo selector se encarga de conectarse al API y obtener sus datos.
Los componentes interaccionan entre sí teniendo componentes padre que ejecutan métodos de componentes hijo y componentes
hijo que ejecutan métodos de componentes padre.

## Posibles mejoras
- Reducir la cantidad de información procesada desde el backend, algunos atributos no se usan.
- Mejorar la estructura de algunos datos, hay casos en que para encontrar un datos se itera sobre un arreglo, un hash sería 
 más eficiente.
- Arreglar el scroll, no siempre quedá fijo la cabecera del calendario. 

## Proceso de Instalación
**Tecnologías utilizadas**
- Nvm 0.39.2
- Node V19
- Npm 8.19.2  
- Vue 3
- Materialize CSS

**Clonar el proyecto**

    $ git clone https://github.com/rofaccess/maas-client.git

**Acceder a la carpeta del proyecto**

    $ cd maas-client

**Instalar las librerias**

    $ npm install

**Ejecutar la aplicación**

    $ npm run serve

**Acceder al siguiente link**
- localhost:8080

# maas-client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Proceso de Desarrollo
**Verificar que vue cli esté instalado**

    $ vue --version

**Crear el proyecto**

    $ vue create maas-client

**Obs.:** Seleccionar la configuración por defecto de Vue 3.

**Ingresar a la carpeta del proyecto**

    $ cd maas-client

**Iniciar la aplicación**

    $ npm run start

Acceder a localhost:8080 en el navegador

**Instalar Materialize e íconos de Material Design **

    $ npm install materialize-css@next --save
    $ npm install material-design-icons --save

**Instalar Axios para peticiones HTTP**

    $ npm install --save axios vue-axios

**Instalar Router para rutas**

    $ npm install vue-router@next