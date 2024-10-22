let user
let modalNewPublicacion = document.getElementById("newPublicacion")
let modalNewP = new mdb.Modal(modalNewPublicacion)
let modalEdit = new mdb.Modal(document.getElementById("modalEdit"))
let modalEliminar = new mdb.Modal(document.getElementById("eliminarP"))
let publicacionesDb
   
document.addEventListener('DOMContentLoaded', async ()=>{
    // Tu código aquí

    document.getElementById("cerrarSesion").addEventListener("click",()=>{
        localStorage.clear()
        location.href="/login"
    })
    /* SALUDA AL USUARIO */
    saludar()
    /* LISTA TODAS LAS PUBLICACIONES */
    await listarPublicaciones()
    /* GUARDAR PUBLICACION */
    document.getElementById('nuevaPublicacion').addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        modalNewP.hide()
        await guardarPublicacion()
        
    });
    document.getElementById('formEdit').addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        modalEdit.hide()
        await updatePublicacion()
        
    });




});


function saludar() {
    user=JSON.parse(localStorage.getItem("user"))
    // Display a success toast, with a title
    toastr.info("Biendenido! "+`<span style="font-weight: bold;">${user.user}</span>`)
}

async function updatePublicacion() {
    let formData = new FormData(document.getElementById('formEdit')); // Captura los datos del formulario  
    let response = await fetch('/update', {
        method: 'PUT',
        body: formData,
    });
    response = await response.json();
    if(response!="ok"){
        // Display an error toast, with a title
        toastr.error(response, 'Error!')
        setTimeout(() => {
            modalEdit.show()
        }, 500);
    }else{
        toastr.success("Se edito una publicacion.", 'Exito!')
        document.getElementById('formEdit').reset()
        await listarPublicaciones()

    }

}
async function guardarPublicacion() {
    let formData = new FormData(document.getElementById('nuevaPublicacion'));
    console.log(document.getElementById("archivo").files[0])
    
    let response = await fetch('/insertar', {
        method: 'POST',
        body: formData,
    });
    response = await response.json();
    if(response!="ok"){
        // Display an error toast, with a title
        toastr.error(response, 'Error!')
        setTimeout(() => {
            modalNewP.show()
        }, 500);
    }else{
        toastr.success("Se guardo la publicacion con exito.", 'Exito!')
        document.getElementById('nuevaPublicacion').reset()
        await listarPublicaciones()

    }

}

async function listarPublicaciones() {
    let response = await fetch('/listarPublicacionesAdmin');
    response = await response.json();
    publicacionesDb=response
    dibujarPublicaciones(response)

}
function dibujarPublicaciones(publicaciones) {
    let publicacionesCard=``
    console.log(publicaciones)
    publicaciones.forEach(element => {
        console.log(element.fecha)
        publicacionesCard+=`
        <div class="col-md-4 mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${element.titulo}</h5>
                    <p class="card-text">${truncarTexto(element.texto,30)}</p>
                    <div class="card-footer text-muted text-center">${convertirFecha(element.fecha)}</div>
                    <div onclick="descargar('archivos/${element.direccion_archivo}')" data-mdb-ripple-init style="user-select: none;background: rgb(245 245 245);cursor: pointer;" class="card-footer p-2 rounded mb-2">
                        <div class="row">
                            <div class="col-3">
                                <img class="w-100" src="images/circulo.png">
                            </div>
                            <div class="col-9 d-flex flex-row align-items-center">
                                <span>${obtenerNombre(element.direccion_archivo)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <button type="button" onclick="mostrarModalEliminar(${element.idP})" class="btn btn-danger w-50" data-mdb-ripple-init>Eliminar</button>
                        <button type="button" onclick="abrirModalEdit(${element.idP})" class="btn btn-info w-50" data-mdb-ripple-init>Editar</button>
                    </div>
                </div>
            </div>
        </div>    
        `
    });
    publicaciones=(publicacionesCard=="")?"<div class='col-md-12'><span>Sin publicacions.</span></div>":publicacionesCard
    document.getElementById("listarPublicaciones").innerHTML=publicaciones
}
function obtenerExtension(nombreArchivo) {
    const partes = nombreArchivo.split('.');
    return partes.pop(); // Obtiene la última parte (la extensión)
   
}
function obtenerNombre(nombreArchivo) {
    const partes = nombreArchivo.split('/');
    return partes.pop(); // Obtiene la última parte (la extensión)
   
}
function descargar(direccion) {
    // Simula una descarga (reemplaza con la lógica real)
    window.open(direccion, '_blank');
}
function truncarTexto(texto, limitePalabras) {
    const palabras = texto.split(' ');
    if (palabras.length > limitePalabras) {
        const textoTruncado = palabras.slice(0, limitePalabras).join(' ') + '...';
        return textoTruncado;
    } else {
        return texto; // No es necesario truncar
    }
}
const convertirFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
function abrirModalEdit(id) {
    modalEdit.show()
    let publicacionEditar = publicacionesDb.find((x) => x.idP === id);
    document.getElementById("idPxd").value=id
    document.getElementById("tituloUp").value=publicacionEditar.titulo
    document.getElementById("textoUp").value=publicacionEditar.texto
}

async function mostrarModalEliminar(id) {
    modalEliminar.show()
    localStorage.setItem("idEliminar",id)
}
async function eliminarPublicacion() {
    modalEliminar.hide()
    let response = await fetch('/delete',{
        method:"delete",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({id:localStorage.getItem("idEliminar")}),
    });
    response = await response.json();
    if(response!="ok"){
        toastr.error(response, 'Error!')
    }else{
        toastr.success("Se elimino una publicacion.", 'Exito!')
        await listarPublicaciones()
    }
}
