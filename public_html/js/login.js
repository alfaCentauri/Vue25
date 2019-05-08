/* 
    Created on : 07/02/2019, 03:01:55 PM
    Author     : Ricardo Presilla.
    Licencia GNU.
    js/login.js
 */
/**Componente para modificar una propiedad*/
Vue.component('base-input',{
    template: `
        <div v-if='!authenticated'>
            <form>
                <input type="text" v-model="login" />
                <input type="password" v-model="clave" />
                <button @click="onClick">Aceptar</button>
                <input type="reset" id="cancelar">Cancelar</button>
            </form>
        </div>
        <div v-else>
            <nav>
                <ul>
                    <li><a href="" @click="nuevoUsuario">Nuevo Usuario</a>
                    </li>
                    <li>
                        <a href="" @click="salir">Salir</a>
                    </li>
                </ul>
            </nav>
        </div>
    `,
    data: function(){
        return {
            login: null, 
            clave: null
        }
    },
    methods: {
        onClick: function(){
            this.$emit('new', { login: this.login });
        },
        post: function(){
            this.$http.post('http://localhost/Ejercicio/web/app-dev.php/login',{
                _username: this.login, _password: this.clave
            }).then(function(data){
                console.log("Se envío la data");
            });
        },
        salir: function(){
            this.$http.post('http://localhost/Ejercicio/web/app-dev.php/logout',{
            }).then(function(data){
                console.log("Solicitud de cerrado de sesion");
            });
        },
        nuevoUsuario: function(){
            this.$http.post('http://localhost/Ejercicio/web/app-dev.php/nuevo',{
            }).then(function(data){
                console.log("Solicitud de cerrado de sesion");
            });
        },
    }
});

