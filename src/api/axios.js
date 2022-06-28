import axios from "axios";

const PORT = 5000;     // puerto donde se ejecuta el servidor backend
export default axios.create({
    baseURL: `http://localhost:${PORT}`,
});

/* IMPORTAREMOS ESTE ARCHIVOS EN LOS OTROS ARCHIVOS QUE NECESITE AXIOS */