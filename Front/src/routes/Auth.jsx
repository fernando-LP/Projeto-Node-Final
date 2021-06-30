import React, { useState } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import { AuthArea, Input, Button, InputArea } from "../styled"
import Swal from "sweetalert2"


const Auth = () => {
    let [email, setEmail] = useState("")
    let [pass, setPass] = useState("")
    let [redirect, setRedirect] = useState(false)
    const handleToken = async () => {
        await axios.post("http://localhost:8080/auth", {
            email,
            pass
        }).then(response => {
            if (response.status === 200)
                Swal.fire({
                    title: 'Sucesso !!!',
                    text: 'Voce ja pode usar o sistema !',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(result => {
                    if (result.isConfirmed) {
                        setRedirect(true)
                    }
                })
            localStorage.setItem("token", response.data)
        })
            .catch(err => {
                alert(err)
            })
    }
    {
        if (redirect) {
            return (
                <Redirect to="/" />
            )
        } else {
            return (
                <AuthArea>
                    <h2>Tela de login</h2>
                    <InputArea>
                        <text>
                         E-mail:
                        </text>
                        <Input type="email" placeholder="Digite seu email" onChange={e => setEmail(e.target.value)} />
                    </InputArea>
                    <InputArea>
                        <text>
                         Senha:
                        </text>
                        <Input type="password" placeholder="Digite sua senha" onChange={e => setPass(e.target.value)} />
                    </InputArea>
                    <Button onClick={handleToken} bgcolor="#0000ff">Entrar</Button>
                </AuthArea>
            )
        }
    }
}

export default Auth;