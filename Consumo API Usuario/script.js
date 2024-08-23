//corts   
//muestra los listado de usuarios
$(document).ready(function () {

    const lista = () => {

        $.ajax({
            url: 'http://localhost:8080/usuarios',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                let data = '';
                res.forEach(element => {
                    data += `
                    <tr UsuarioId = ${element.id}>

                        <td>${element.id}</td>
                        <td>${element.nombre}</td>
                        <td>${element.email}</td>
                        <td>${element.prioridad}</td>

                        <td>
                            <button id="btn-details" class="btn btn-warning">Detalles</button>
                        </td>
                        <td>
                            <button id="btn-delete" class="btn btn-danger" >Eliminar</button>
                        </td>
                        <td>
                            <button id="btn-edit" class="btn btn-success">Editar</button>
                        </td>

                    </tr>
                `;
                });

                $('#tbody').html(data);
            }
        })

    }

    const save = () => {
        $('#agregar').on('click', function () {
            const datosUsuarios = {
                nombre: $('#nombre').val(),
                email: $('#email').val(),
                prioridad: $('#prioridad').val()
            }

            $.ajax({
                url: 'http://localhost:8080/usuarios/save',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(datosUsuarios),
                dataType: 'json',

                success: (data) => {
                    lista();
                    limpiar();
                    //console.log('usuario registrado');
                }

            })
        })
    }

    //detalles 

    const detalles = () => {

        $(document).on('click', '#btn-details', function(){
            let btnDetails = $(this)[0].parentElement.parentElement;
            let id = $(btnDetails).attr('UsuarioId');

            //console.log(id);

            $.ajax({
                url : 'http://localhost:8080/usuarios/' + id,
                type : 'GET',
                dataType : 'json',
                success: (res) => {
                    let data =`
                        <strong>Id</strong> ${res.id} <br>
                        <strong>Nombre</strong> ${res.nombre} <br>
                        <strong>Email</strong> ${res.email} <br>
                        <strong>Prioridad</strong> ${res.prioridad} <br>
                        <button id="btn-limpiar" class="btn btn-warning">Limpiar</button>
                    `
                    let usuario = $('#user-details').html(data);
                    $('#btn-limpiar').on('click', ()=>{
                    usuario.html('');
                })

                    
                }
            })

        })
    }
    //rellenar datos en el formulario
    const rellenar = () => {
        $(document).on('click', '#btn-edit', function () {
            let btnEdit = $(this)[0].parentElement.parentElement;
            let id = $(btnEdit).attr('UsuarioId');
            //console.log(id);

            $('#agregar').hide();
            $('#editar').show();

            $.ajax({
                url : 'http://localhost:8080/usuarios/' + id,
                type : 'GET',
                dataType : 'json',
                success: (res)=>{
                    $('#id').val(res.id);
                    $('#nombre').val(res.nombre);
                    $('#email').val(res.email);
                    $('#prioridad').val(res.prioridad);
                }
            })
        })
    }

    //editar user
    const editar = () => {
        $('#editar').on('click', function(){
            const id = $('#id').val();
            $('#agregar').css('display', 'none');
            $('#editar').css('display', 'block');

            const datosUsuarios = {
                id : $('#id').val(),
                nombre : $('#nombre').val(),
                email : $('#email').val(),
                prioridad : $('#prioridad').val()
                
            }
            

            $.ajax({
                url: 'http://localhost:8080/save/' + id,
            contentType: 'application/json',
            type: 'PUT',
            data: JSON.stringify(datosUsuarios),
            dataType: 'json',
            success: (res) => {
                console.log(res)
                $('#editar').css('display', 'none');
                $('#agregar').css('display', 'block');
                
                limpiar();
                lista();
                }

            });
        })
    }

    //eliminar usuario
    const eliminarUsuario = () => {
        $(document).on('click', '#btn-delete', function () {

            if (confirm('Seguro que quieres eliminar?')) {
                let btnDelete = $(this)[0].parentElement.parentElement;
                let id = $(btnDelete).attr('UsuarioId');
                lista();
                lista();
            $.ajax({
                    url: 'http://localhost:8080/usuarios/delete/' + id,
                    type: 'DELETE',
                    dataType: 'json',
                    success: (res) => {
                        lista();
                        lista();
                    }

            });
    }
})
    }

//limpiar inputs

const limpiar = () => {
    $('#nombre').val('');
    $('#email').val('');
    $('#prioridad').val('');
}

//llamadas a funciones
lista();
detalles();
save();
rellenar();
eliminarUsuario();
editar();

})