import mysql from 'mysql2/promise';

async function connectToDatabase() {
    try {
        const conn = await mysql.createConnection({
            host: '64.37.50.234',
            user: 'info825_faenapp',
            password: '$Mai6JT#F[j=', // Asegúrate de agregar tu contraseña si tienes una
            database: 'info825_faenapp',
        });
        console.log('Conexión exitosa a la base de datos');
        return conn;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}

export default connectToDatabase