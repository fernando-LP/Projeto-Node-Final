import React, { useEffect, useState } from "react"
import axios from "axios"
import axiosConfig from "../services/token"
import { UserArea, Button, ButtonContainer, InputArea, FooterArea } from "../styled"
import { Page } from "../styled"
import { Link } from "react-router-dom"
import TextInput from "../components/TextInput"
import BackButton from "../components/BackButton"
import Swal from "sweetalert2"

const Comentario = (props) => {
    let [comentarios, setComentarios] = useState([])
    let [idUsuario, setIdUsuario] = useState(null)
    let [idTarefa, setIdTarefa] = useState(null)
    let [desc, setDesc] = useState("")
    let [newDesc, setNewDesc] = useState("")
    let [newIdUsuario, setNewIdUsuario] = useState("")
    const handleGetComentarios = () => {
        setComentarios([])
        axios.get("http://localhost:8080/comentarios", axiosConfig)
            .then(response => {
                if (response.status === 200) {
                    setComentarios(response.data)
                } else {
                    console.log(`Err: ${response.statusText}`)
                }
            })
            .catch(err => {
                alert(err)
            })
    }
    const handleDeleteComentario = (id) => {
        Swal.fire({
            title: "Você tem certeza disso?",
            text: "Tudo que estiver relacionado a esse comentário será deletado também",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Deletar",
            confirmButtonColor: "#ff0000",
            cancelButtonText: "Cancelar"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`http://localhost:8080/comentario/${id}`, axiosConfig)
                        .then((response) => {
                            if (response.status === 200) {
                                Swal.fire("Removido com sucesso", "O comentário selecionado foi removido", "success")
                                    .then(() => {
                                        handleGetComentarios()
                                    })
                            }
                        })
                }
            })
    }
    const handlePutComentario = (id) => {
        axios.put(`http://localhost:8080/comentario/${id}`, {
            id_usuario: newIdUsuario,
            descricao: newDesc
        }, axiosConfig)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire("Atualizar com sucesso", "O comentário foi atualizado com sucesso", "success")
                        .then(() => handleGetComentarios())
                }
            })
    }
    const handlePostComentario = () => {
        axios.post("http://localhost:8080/comentario", {
            id_usuario: idUsuario,
            id_tarefa: idTarefa,
            descricao: desc
        }, axiosConfig)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire("Cadastro com sucesso", "O comentário foi cadastrado com sucesso", "success")
                        .then(() => handleGetComentarios())
                } else {
                    alert("Erro ao inserir")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(handleGetComentarios, [])
    return (
        <Page>
            <h2><Link to="/"><BackButton /></Link>Lista de comentários</h2>
            <a href="#cadastro"><Button style={{ width: 120 }} bgcolor="#8B4513	">Novo comentário</Button></a>
            <div id="cadastro">
                <h2>Cadastro de novo comentário</h2>
                <form>
                    <InputArea>

                        <text>
                            Usuário:
                        </text>
                        <TextInput id="id-usuario" type="number" placeholder="Digite o id do usuario" onChange={e => setIdUsuario(e.target.value)} />           
                       </InputArea>

                    <InputArea>
                        <text>
                            Tarefa:
                        </text>
                        <TextInput id="id_tarefa" type="number" placeholder="Digite o id da tarefa" onChange={e => setIdTarefa(e.target.value)} />
                    </InputArea>
                    <InputArea>
                        <text>
                            Descrição:
                        </text>
                        <TextInput id="descricao" type="text" placeholder="Digite a descricao" onChange={e => setDesc(e.target.value)} />
                    </InputArea>
                    <ButtonContainer>
                        <Button bgcolor="#9AC0CD" onClick={e => {
                            e.preventDefault()
                            handlePostComentario()
                        }}>Cadastrar</Button>
                    </ButtonContainer>

                </form>
            </div>
            <div id="atualizar">
                <h2>Atualizar comentário</h2>
                <form>
                    <InputArea>
                        <text>
                            Usuário:
                        </text>
                        <TextInput id="novo-idusuario" type="text" placeholder="Digite o id do usuario" value={newIdUsuario} onChange={e => setNewIdUsuario(e.target.value)} />
                    </InputArea>
                    <InputArea>
                        <text>
                            Descrição:
                        </text>
                        <TextInput id="nova-descricao" type="text" placeholder="Digite a descricao" value={newDesc} onChange={e => setNewDesc(e.target.value)} />
                    </InputArea>
                    <ButtonContainer>
                        <Button bgcolor="#9AC0CD" type="submit" value="Atualizar" onClick={e => {
                            e.preventDefault()
                            let id = parseInt(document.getElementById("novo-idusuario").className)
                            handlePutComentario(id)
                        }}>Atualizar</Button>
                    </ButtonContainer>
                </form>
            </div>
            
            {comentarios.map((comen, index) => {
                return <UserArea key={index}>
                    <h2>Descrição: {comen.descricao.toLowerCase()}</h2>
                    <div>
                        <p>Id usuário: {comen.id_usuario}</p>
                        <p>Id tarefa: {comen.id_tarefa}</p>
                    </div>
                    <FooterArea>
                        <Button bgcolor="#8B0000" onClick={() => handleDeleteComentario(comen.id)}>Excluir</Button>
                        <a href="#atualizar"><Button bgcolor="#43CD80" onClick={() => {
                            document.getElementById("novo-idusuario").className = `${comen.id}`
                            setNewDesc(`${comen.descricao}`)
                            setNewIdUsuario(comen.id_usuario)
                        }}>Atualizar</Button></a>
                    </FooterArea>
                </UserArea>
            })}
            
        </Page >
    )
}

export default Comentario