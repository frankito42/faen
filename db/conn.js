import mysql from 'mysql2/promise';

async function connectToDatabase() {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '', // Asegúrate de agregar tu contraseña si tienes una
            database: 'colegio',
        });
        console.log('Conexión exitosa a la base de datos');
        return conn;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}

export default connectToDatabase