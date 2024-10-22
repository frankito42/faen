document.addEventListener("DOMContentLoaded",async function(event) {
    console.log("hola")
    await listarPublicacion()
});
async function listarPublicacion() {
    /* console.log(obtenerIdDesdeUrl()) */
    let response = await fetch('noticia/'+localStorage.getItem("n"));
    response = await response.json();
	console.log(response)
    dibujarPublicacion(response)

}
function obtenerIdDesdeUrl() {
    const parametros = new URLSearchParams(location.search);
    return parametros.get('id'); // Devuelve el ID (como cadena)
  }
  function dibujarPublicacion(publicaciones) {
    let descarga=""
    if(publicaciones.direccion_archivo){
        descarga=`  <div onclick="descargar('archivos/${publicaciones.direccion_archivo}')" style="user-select: none;background: rgb(245 245 245);cursor: pointer;border-radius: 5px;">
                        <div style="padding: 1%;" class="row">
                            <div class="col-md-12">
                                <img style="width: 10%;" src="images/circulo.png">
                                <span>${obtenerNombre(publicaciones.direccion_archivo)}</span>

                            </div>
                        </div>
                    </div>`
    }
    let publicacionesCard=`
				<div class="col-md-12 ">
				<div class="text-center">
					<span>Novedades sobre nuestra universidad</span>
					<h2>${publicaciones.titulo}</h2>
				</div>
				<p>${publicaciones.texto}</p>
                ${descarga}
			</div>`
  
    publicaciones=(publicacionesCard=="")?"<div class='col-md-12'><span>Sin publicacions.</span></div>":publicacionesCard
    document.getElementById("noticia").innerHTML=publicaciones
}
function obtenerNombre(nombreArchivo) {
    const partes = nombreArchivo.split('/');
    return partes.pop(); // Obtiene la última parte (la extensión)
   
}
function descargar(direccion) {
    // Simula una descarga (reemplaza con la lógica real)
    window.open(direccion, '_blank');
}