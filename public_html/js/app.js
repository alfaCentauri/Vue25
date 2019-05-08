/* 
    Created on : 07/02/2019, 03:01:55 PM
    Author     : Ricardo Presilla.
    Licencia GNU.
    js/app.js
 */
/**Componente td-item: Muestra cada usuario y sus propiedades, en una tabla con 
 * estilos CSS y Boostratp. 
 * */
Vue.component('tr-item', {
  props: ['usuario'],
  template: `
        <tr>
            <td v-html="usuario.dni" class="hidden-xs celda"></td>
            <td class="hidden-xs celda">{{ usuario.nombre}}</td>
            <td class="hidden-xs celda">{{ usuario.apellido}}</td>
            <td class="celda">{{ usuario.email }}</td>
            <td class="celda">{{ usuario.login }}</td>
            <td class="celda">{{ usuario.rol }}</td>
            <td class="hidden-xs celdaFecha">{{ usuario.fechaCreacion }}</td>
            <td class="capaModificar">  
                <a href="">
                    <span class="glyphicon glyphicon-edit"></span>
                </a>
                <a href="">
                    <span class="glyphicon glyphicon-remove"></span> 
                </a>
                <div v-if="usuario.activo" class="isActivo">
                    <a href="">
                        <span class="glyphicon glyphicon-thumbs-up"></span> 
                    </a>
                </div>
                <div v-else class="isActivo">
                    <a href="">
                        <span class="glyphicon glyphicon-thumbs-down"></span>
                    </a>
                </div>
            </td>
        </tr>
    ` ,
}); 
/**Componente para crear la plantilla html ha mostrar y modificar una propiedad.
 * */
Vue.component('templateLogin',{
    props: ['sesion'], //Objeto con los datos
    //Plantilla para el formulario.
    template: `
        <div v-if='sesion.authenticated' class="container">
            <form>
                <div class="row">
                    <div class="hidden-sm col-md-2 col-lg-2"></div>
                    <div class="col-sm-3 col-md-2 col-lg-2">
                        Usuario:
                    </div>
                    <div class="col-sm-9 col-md-6 col-lg-6">
                        <input type="text" v-model="login" class="form-control"/>
                    </div>
                    <div class="hidden-sm col-md-2 col-lg-2"></div>
                </div>
                <div class="row">
                    <div class="hidden-sm col-md-2 col-lg-2"></div>
                    <div class="col-sm-3 col-md-2 col-lg-2">
                        Contraseña: 
                    </div>
                    <div class="col-sm-9 col-md-6 col-lg-6">
                        <input type="password" v-model="clave" class="form-control"/>
                    </div>
                    <div class="hidden-sm col-md-2 col-lg-2"></div>
                </div>
                <div class="row">
                    <div class="hidden-sm col-md-1 col-lg-1"></div>
                    <div class="col-sm-6 col-md-5 col-lg-5">
                        <button @click="onClick" class="form-control">Aceptar</button>
                    </div>
                    <div class="col-sm-6 col-md-5 col-lg-5">
                        <button type="reset" id="cancelar" class="form-control">Cancelar</button>
                    </div>
                    <div class="hidden-sm col-md-1 col-lg-1"></div>
                </div>
            </form>
        </div>
        <div v-else class="container">
            <nav>
                <ul class="nav navbar-nav">
                    <li><a href="#" @click="nuevoUsuario">Nuevo Usuario</a>
                    </li>
                    <li>
                        <a href="#" @click="salir">Salir</a>
                    </li>
                </ul>
            </nav>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <table border="1" class="table table-striped">
                        <tr>
                            <th class="hidden-xs titulo">Cedula</th>
                            <th class="hidden-xs titulo">Nombre</th>
                            <th class="hidden-xs titulo">Apellido</th>
                            <th class="titulo">Email</th>
                            <th class="titulo">Login</th>
                            <th class="titulo">Rol</th>
                            <th class="hidden-xs titulo">Fecha de creaci&oacute;n</th>
                            <th class="hidden-sm titulo">Acciones</th>
                        </tr>
                        <tr-item v-for="usuario in sesion.usuarios"
                            v-bind:usuario="usuario"
                            v-bind:key="usuario.dni"
                        >
                        
                        </tr-item>
                    </table>
                </div>
            </div>
        </div>
    `,
    data: function(){//Datos del login
        return {
            login: null, 
            clave: null,
        }
    },
    methods: {
        onClick: function(){
            this.$emit('new', { login: this.login, authenticated: this.authenticated });
        },
        post: function(){//LLamada a la api del login, usando un JSon con los parametros.
            $.post( "http://localhost/Ejercicio/web/app-dev.php/login", 
                { _username: this.login, _password: this.clave }, null, "json" )
                .done(function( data, textStatus, jqXHR ) {
                    if ( console && console.log ) {
                        console.log( "La solicitud se ha completado correctamente." );
                    }
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    if ( console && console.log ) {
                        console.log( "La solicitud a fallado: " +  textStatus);
                    }
            });
        },
        salir: function(){//Llamada a la api de logout
            $.post('http://localhost/Ejercicio/web/app-dev.php/logout',{
            }, null, "json" )
                .done(function( data, textStatus, jqXHR ) {
                    if ( console && console.log ) {
                        console.log( "La solicitud se ha completado correctamente." );
                    }
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    if ( console && console.log ) {
                        console.log( "La solicitud a fallado: " +  textStatus);
                    }
            });
        },
        nuevoUsuario: function(){//Llamada a la api de crear usuarios
            $.post('http://localhost/Ejercicio/web/app-dev.php/nuevo',{
            }, null, "json" )
                .done(function( data, textStatus, jqXHR ) {
                    if ( console && console.log ) {
                        console.log( "La solicitud se ha completado correctamente." );
                    }
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    if ( console && console.log ) {
                        console.log( "La solicitud a fallado: " +  textStatus);
                    }
            });
        },
    }
});
/**Instancia del vue**/
var vue = new Vue({
    el: '#app',
    data: {//Datos iniciales
        sesion: {
            authenticated: false,
            usuarios: [
                {dni: 12345678, nombre: 'Maria', apellido: 'Perez', email: 'mperez@dominio.com', login: 'mperez', rol: 'Operador', fechaCreacion: '01/02/2019', activo: false},
                {dni: 12345679, nombre: 'Pedro', apellido: 'Perez', email: 'pperez@dominio.com', login: 'pperez', rol: 'Operador', fechaCreacion: '01/02/2019', activo: false},
            ]  
        },
    },
    methods: {},
    computed: {},
    template:  '<templateLogin v-bind:sesion="sesion"></templateLogin>',//Plantilla mejorada   
});
