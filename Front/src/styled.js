import styled from "styled-components"

export const Page = styled.div`
    width:100%;
    padding:20px;
    background-color:#EFEFEA;
    padding:10px 500px;
    display:flex;
    flex-direction:column;
    background-color:#BC8F8F	
    ;
`

export const UserArea = styled.div`

    width: 35%;
    display:flex;
    background-color:#FFF;
    padding:5px;
    margin-top:15px;
    flex-direction:column;
    align-items:center;
    border:1px solid black;
`

export const FooterArea = styled.div`
    width:60%;
    display:flex;
    flex-direction:row;
    justify-content:center;
    
`

export const Button = styled.button`
    width:100px;
    height:35px;
    border:1px solid black;
    color:#fff;
    margin-right:10px;
    background-color:${(props) => props.bgcolor};
    cursor:pointer;
`
export const AuthArea = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:#EE8262;
`

export const Input = styled.input`
    width:93%;
    height:25px;
    margin-left:10px;
    border:none;
`

export const InputArea = styled.div`
    align-items:center;
    width:55%;
    height:px;
    margin-bottom:25px;
    border:1px solid #000;
    display:flex;
    flex-direction:row;
    padding-left:10px;
    background-color:white;
`

export const ButtonContainer = styled.div`
    justify-content: left;
    width: 50%;
    display: flex; 
`
export const Img = styled.img`
    width:30px;
    height:20px;
    margin-right:10px;
`