import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';


// DB conexión
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/dbsistema";
mongoose
    .connect(dbUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(mongoose => {
        console.log("Connecting to DB on port 27017");
    })
    .catch(err => {
        console.log(err);
    });

const app = express();

// Middlewares (funciones que se ejecutan antes de las rutas)
// morgan - permite ver por consola las petione que vienen del navegador o app cliente
app.use(morgan('dev'));
// cors - permite realizar peticiones remotas a nuestro servidor, diferente clientes
app.use(cors());
// express-json  y express.urlencoded -analiza y permite solicitudes entrantes json a traves del método post 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.static, configuracion de ruta para archivos estáticos públicos, despliega por defecto index.html
app.use(express.static(path.join(__dirname, "public")));

// Establecemos las rutas
app.use('/api', router);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});