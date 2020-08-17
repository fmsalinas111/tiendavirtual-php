var tableRoles; // se agrega un evento  
document.addEventListener('DOMContentLoaded', function() {

    tableRoles = $('#tableRoles').DataTable({ /*ID de la tabla*/
        "aProcessing": true,
        "aServerside": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax": {
            "url": " " + base_url + "/Roles/getRoles", // agrege el /
            "dataSrc": ""
        },
        "columns": [
            { "data": "idrol" },
            { "data": "nombrerol" },
            { "data": "descripcion" },
            { "data": "status" },
            { "data": "options" }
        ],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [
            [0, "desc"]
        ]
    });

    //Nuevo Rol
    var formRol = document.querySelector("#formRol");
    formRol.onsubmit = function(e) {
        e.preventDefault(); //previene q se recarge la pagina 

        var strNombre = document.querySelector('#txtNombre').value;
        var strDescripcion = document.querySelector('#txtDescripcion').value;
        var intStatus = document.querySelector('#listStatus').value;
        if (strNombre == '' || strDescripcion == '' || intStatus == '') {
            swal("Atencion", "Todos los campos del formulario son obligatorios ", "error");
            return false;
        }
        //detecta el navegador 
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url + '/Roles/setRol';
        var formData = new FormData(formRol);
        request.open("POST", ajaxUrl, true);
        request.send(formData); // envia los datos
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var obData = JSON.parse(request.responseText);
                if (obData.status) {
                    $('#modalFormRol').modal("hide");
                    formRol.reset();
                    swal("Roles de usuario", obData.msg, "success");
                    tableRoles.ajax.reload(function() {
                        //fntEditRol();
                        //fntDelRol();
                        //fntPermisos();
                    });
                } else {
                    swal("Error", obData.msg, "error");
                }
            }
        }
    }


});


$('#tableRoles').DataTable();



function openModal() {
    document.querySelector('#idRol'.value = ""); //limpia las cajas de texto del formulario de nuevo
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector(' #btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector(' #btnText').innerHTML = "Guardar";
    document.querySelector(' #titleModal').innerHTML = "Nuevo Rol";
    document.querySelector(' #formRol').reset(); //reseta el formulario
    $('#modalFormRol').modal('show');
}

//carga  load cuando cargue todo el documento
window.addEventListener('load', function() {
    fntEditRol();
}, false);


//se asigna a cada uno de los botones de editar el formulario 
function fntEditRol() {
    var btnEditRol = document.querySelectorAll(".btnEditRol");
    btnEditRol.forEach(function(btnEditRol) {
        btnEditRol.addEventListener('click', function() {

            document.querySelector('#titleModal').innerHTML = "Actualizar Rol";
            document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
            document.querySelector(' #btnActionForm').classList.replace("btn-primary", "btn-info");
            document.querySelector('#btnText').innerHTML = "Actualizar";

            $('#modalFormRol').modal('show');

        });
    });

}