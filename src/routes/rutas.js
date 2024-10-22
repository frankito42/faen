import {Router} from "express"
import { editarPublicacion,
    traerPlublicacionesHome,
    traerPlublicacion,
    loguear,
    listarPublicacionesAdmin,
    insertarPublicacion,
    eliminarPublicacion } from "../controllers/homeControl.js"
import multer from 'multer';
import { dirname, join } from "path";
const router=Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/archivos/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nombres de archivos únicos
    }
  });
  const upload = multer({ storage: storage });




router.get("/",async (req,res)=>{
    res.render("index")
})
router.get("/pedirPublicaciones",async (req,res)=>{
    
    res.json(await traerPlublicacionesHome())
})
router.get("/contact",(req,res)=>{
    res.render("contact")
})
router.get("/noticias",(req,res)=>{
    res.render("noticias")
})
router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/noticia/:id",async (req,res)=>{
    /* console.log(req.params.id) */
    res.json(await traerPlublicacion(req.params.id))
})
router.post("/loguear",async (req,res)=>{
    console.log(req.body)
    res.json(await loguear(req.body)) 
})
router.get("/admin",async (req,res)=>{
    res.render("admin")
})
router.post("/insertar",upload.single('archivo'),async (req,res)=>{
    /* console.log(req.body) */
    const archivo = req.file;

    // Guarda la ruta completa del archivo
    const archivoPath = archivo.filename;
    req.body.direccionArchivo=archivoPath
    const respuesta=await insertarPublicacion(req.body)
    console.log(respuesta)
    res.json(respuesta)
})
router.put("/update",upload.none(),async (req,res)=>{
    console.log(req.body)
    const respuesta=await editarPublicacion(req.body)
    console.log(respuesta)
    res.json(respuesta)
})
router.delete("/delete",upload.none(),async (req,res)=>{
    console.log(req.body.id)
    
    res.json(await eliminarPublicacion(req.body.id))
})
router.get("/listarPublicacionesAdmin",async (req,res)=>{
    res.json(await listarPublicacionesAdmin())
})

export default router