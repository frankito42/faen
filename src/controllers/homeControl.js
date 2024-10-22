import connectToDatabase from "../../db/conn.js"

export const obtenerFechaHoy = () => {
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const day = String(hoy.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export async function traerPlublicacionesHome() {
    const publicaciones=await connectToDatabase()
    const [resPublicaciones]=await publicaciones.query(
        'SELECT * FROM `publicaciones` order by idP desc limit 3'
      );
      return resPublicaciones
}
export async function listarPublicacionesAdmin() {
    const publicaciones=await connectToDatabase()
    const [resPublicaciones]=await publicaciones.query(
        'SELECT * FROM `publicaciones` order by idP desc'
      );
      return resPublicaciones
}
export async function traerPlublicacion(id) {
    const publicaciones=await connectToDatabase()
    let [resPublicaciones]=await publicaciones.query(
        `SELECT * FROM publicaciones where idP=${id} `
      );
      resPublicaciones=resPublicaciones[0]
      return resPublicaciones
}
export async function insertarPublicacion(params) {
  console.log(params)
  
  try {
    const publicaciones = await connectToDatabase();
    const query = 'INSERT INTO `publicaciones`(`titulo`, `texto`, `direccion_archivo`, `fecha`) VALUES (?, ?, ?, ?)';
    
    await publicaciones.query(query, [params.titulo, params.texto, params.direccionArchivo, obtenerFechaHoy()]);
    
    return "ok";
  } catch (err) {
    console.error('Error al insertar en la base de datos:', err);
    throw err; // O maneja el error según tu lógica de aplicación
  }
 
}
export async function editarPublicacion(params) {
  try {
    const publicaciones = await connectToDatabase();
    const query = 'UPDATE `publicaciones` SET `titulo` = ?, `texto` = ? WHERE `idP` = ?';
    
    await publicaciones.query(query, [
      params.tituloUp, 
      params.textoUp, 
      params.idPxd
    ]);
    
    return "ok";
  } catch (err) {
    console.error('Error al actualizar en la base de datos:', err);
    throw err; // O maneja el error según tu lógica de aplicación
  }
}

export async function loguear(params) {
    const publicaciones=await connectToDatabase()
    let [resPublicaciones]=await publicaciones.query(
        `SELECT * FROM users WHERE user='${params.user}' AND pass='${params.pass}'`
      );
      resPublicaciones=resPublicaciones[0]
      return (resPublicaciones)?resPublicaciones:"mal"
}
export async function eliminarPublicacion(idP) {
  try {
    const publicaciones = await connectToDatabase();
    const query = 'DELETE FROM `publicaciones` WHERE `idP` = ?';
    
    await publicaciones.query(query, [idP]);
    
    return "ok";
  } catch (err) {
    console.error('Error al eliminar en la base de datos:', err);
    throw err; // O maneja el error según tu lógica de aplicación
  }
}



