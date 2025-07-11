import React, {useEffect,useState} from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";

function ActualizarUsuario(){
    const {id} = useParams();
    const [id_usuario,setIdUsuario] = useState("");
    const [dv,setDv] = useState("");
    const [nombres,setNombres] = useState("");
    const [apellidos,setApellidos] = useState("");
    const [email,setEmail] = useState("");
    const [celular,setCelular] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        obtenerDatosUsuario();
    },[]);
    const obtenerDatosUsuario = async () => {
        const response = await axios.get(`http://159.223.103.211/api/usuario/${id}`);
        const usuario = response.data[0];
        setIdUsuario(usuario.id_usuario);
        setDv(usuario.dv);
        setNombres(usuario.nombres);
        setApellidos(usuario.apellidos);
        setEmail(usuario.email);
        setCelular(usuario.celular);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const usuarioActualizado = { nombres, apellidos, email, celular };
            await axios.patch(`http://159.223.103.211/api/usuario/${id}`, usuarioActualizado);
            navigate("/usuarios");
        }catch(error) {
            console.log(error);
        }  
    };
    return (
        <div className="container">
            <h1>Actualizar Usuario</h1>
            <hr></hr>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>RUT</label>
                    <input type="text" className="form-control" value={id_usuario} onChange={(e) => setIdUsuario(e.target.value)} disabled ></input>
                </div>
                <div className="form-group">
                    <label>DV</label>
                    <input type="text" className="form-control" value={dv} onChange={(e) => setDv(e.target.value)} disabled ></input>
                </div>
                <div className="form-group">
                    <label>NOMBRES</label>
                    <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>APELLIDOS</label>
                    <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>EMAIL</label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>CELULAR</label>
                    <input type="text" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-primary">Actualizar Usuario</button>
            </form>
        </div>
    );
}
export default ActualizarUsuario;