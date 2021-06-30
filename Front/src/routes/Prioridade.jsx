import React, { useEffect, useState } from "react"
import { Page, UserArea, Button, ButtonContainer, InputArea, FooterArea } from "../styled"
import axios from "axios"
import axiosConfig from "../services/token"
import { Link } from 'react-router-dom'
import TextInput from "../components/TextInput"
import BackButton from "../components/BackButton"
import Swal from "sweetalert2"

const Prioridade = () => {
    let [prioridades, setPrioridades] = useState([])
    let [desc, setDesc] = useState("")
    let [newDesc, setNewDesc] = useState("")
    const handleGetPrioridades = () => {
        setPrioridades([])
        axios.get("http://localhost:8080/prioridades", axiosConfig)
            .then(response => {
                if (response.status === 200) {
                    setPrioridades(response.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handlePostPrioridade = () => {
        axios.post("http://localhost:8080/prioridade", {
            descricao: desc
        }, axiosConfig)
            .then(response => {
                if (response.status === 200)
                    Swal.fire("Cadastro com sucesso", "A prioridade foi cadastrada com sucesso", "success")
                        .then(() => {
                            handleGetPrioridades()
                        })
                else
                    alert("Erro ao inserir")
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handlePutPrioridade = id => {
        axios.put(`http://localhost:8080/prioridade/${id}`, {
            descricao: newDesc
        }, axiosConfig)
            .catch(err => {
                console.log(err)
            })
        Swal.fire("Atualizado com sucesso", "A prioridade foi atualizada", "success")
            .then(() => {
                handleGetPrioridades()
            })
    }
    const handleDeletePrioridade = id => {
        Swal.fire({
            title: "Você tem certeza disso?",
            text: "Tudo que estiver relacionado a essa prioridade será deletado também",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Deletar",
            confirmButtonColor: "#ff0000",
            cancelButtonText: "Cancelar"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`http://localhost:8080/prioridade/${id}`, axiosConfig)
                        .then((response) => {
                            if (response.status === 200) {
                                Swal.fire("Removido com sucesso", "A prioridade selecionada foi removida", "success")
                                    .then(() => {
                                        handleGetPrioridades()
                                    })
                            }
                        })
                }
            })
    }
    useEffect(handleGetPrioridades, [])
    return (
        <Page>
            <h2><Link to="/"><BackButton /></Link>Lista de prioridades</h2>
            <a href="#cadastro"><Button bgcolor="#8B4513" style={{ width: 120 }}>Nova prioridade</Button></a>
            <div id="cadastro">
                <h2>Cadastro de prioridade</h2>
                <form>
                    <InputArea>
                        <text>
                            Descrição:
                        </text>
                        <TextInput id="desc" type="text" placeholder="Digite a descrição" onChange={e => setDesc(e.target.value)} />
                    </InputArea>
                    <ButtonContainer>
                        <Button bgcolor="#9AC0CD" onClick={(e) => {
                            e.preventDefault()
                            handlePostPrioridade()
                        }}>Cadastrar</Button>
                    </ButtonContainer>
                </form>
            </div>
            <div id="atualizar">
                <h2>Atualizar prioridade</h2>
                <form>
                    <InputArea>
                        <text>
                        Descrição:
                        </text>
                        <TextInput id="nova-desc" type="text" placeholder="Digite a descrição" value={newDesc} onChange={e => setNewDesc(e.target.value)} />
                    </InputArea>
                    <ButtonContainer>
                        <Button bgcolor="#9AC0CD" onClick={e => {
                            e.preventDefault()
                            let id = parseInt(document.getElementById("nova-desc").className)
                            handlePutPrioridade(id)
                        }}>Atualizar</Button>
                    </ButtonContainer>
                </form>
            </div>
            {prioridades.map((prioridade, index) => {
                return <UserArea key={index}>
                    <h2>Descrição: {prioridade.descricao.toLowerCase()}</h2>
                    <FooterArea>
                        <Button bgcolor="#8B0000" onClick={() => handleDeletePrioridade(prioridade.id)}>Excluir</Button>
                        <a href="#atualizar"><Button bgcolor="#43CD80" onClick={() => {
                            document.getElementById("nova-desc").className = `${prioridade.id}`
                            setNewDesc(`${prioridade.descricao}`)
                        }}>Atualizar</Button></a>
                    </FooterArea>
                </UserArea>
            })}
            
        </Page >
    )
}

export default Prioridade