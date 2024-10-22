document.addEventListener("DOMContentLoaded",async function(event) {
    await listarPublicaciones()
});
async function listarPublicaciones() {
    let response = await fetch('/pedirPublicaciones');
    response = await response.json();
    publicacionesDb=response
	console.log(response)
    dibujarPublicaciones(response)

}
function dibujarPublicaciones(publicaciones) {
    let publicacionesCard=``
    publicaciones.forEach(element => {
        /* console.log(obtenerExtension(element.direccion_archivo)) */
        publicacionesCard+=`
				<div class="col-md-4">
					<div class="fh5co-event">
						<div class="date text-center"><span>${formatearFecha(element.fecha)}</span></div>
						<h3><a onclick="irA(${element.idP})">${element.titulo}</a></h3>
						<p>${truncarTexto(element.texto,30)}</p>
						<p><a onclick="irA(${element.idP})">Seguir leyendo</a></p>
					</div>
				</div>`
    });
    publicaciones=(publicacionesCard=="")?"<div class='col-md-12'><span>Sin publicacions.</span></div>":publicacionesCard
    document.getElementById("listarPublicaciones").innerHTML=publicaciones
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
function formatearFecha(fecha) {
	let f=new Date(fecha);
	const meses = [
	  "Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.",
	  "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic."
	];
  
	const dia = f.getDate();
	const mes = meses[f.getMonth()];
  
	return `${dia} <br> ${mes}`;
  }
  
  function irA(id) {
    localStorage.setItem("n",id)
    location.href="/noticias"
  }