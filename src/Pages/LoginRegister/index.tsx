import * as Styled from "./styled";

import imgEye from '../../assets/icons/eye.svg';
import imgNoEye from '../../assets/icons/no-eye.svg';
import { useState } from "react";
import axios, { AxiosError } from "axios";
import base_url from "../../Config/BaseUrl";
import { toast } from "react-toastify";
import { DocumentData } from "../../Config/interface";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [togglePassword, setTogglePassword] = useState<boolean>(false);
    const [toggleForm, setToggleForm] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        try {
            const urlFinal = toggleForm ? "register" : "login";

            console.log("/api/v1/auth/" + urlFinal);

            const token: DocumentData | null = await axios.post(base_url + "/api/v1/auth/" + urlFinal, {
                login: email,
                password: password
            });

            if (token) {
                toast.success(`${toggleForm ? "registrado" : "logado"} com sucesso! `);
                localStorage.setItem("authentication", JSON.stringify({token: token.data.token}))
            }

            navigate("/", {replace: true});

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError = error;

                if (axiosError.response && axiosError.response.status === 409) {

                    toast.error("Conta já existe");
                    console.error('Erro com status:', axiosError.response.status);
                }

                if (axiosError.response && axiosError.response.status === 400) {

                    toast.error("Conta não existe");
                    console.error('Erro com status:', axiosError.response.status);
                }

            }
        } finally {
            setLoading(false);
        }

    }

    return (
    
        <Styled.Container>
            <article>
                <form onSubmit={handleSubmit}>
                
                    <h1 > {toggleForm ? "Cadastro" : "Login"} </h1>

                    <Styled.Label htmlFor="Email">
                        Email
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" />
                    </Styled.Label>

                    <Styled.Label htmlFor="Password">
                        Senha
                        <Styled.Password>
                            <input type={togglePassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" />
                            {togglePassword ? <img onClick={() => setTogglePassword(false)} src={imgNoEye} alt="icone da senha" /> : <img onClick={() => setTogglePassword(true)} src={imgEye} alt="icone da senha" />}
                            
                        </Styled.Password>
                    </Styled.Label>

                    <button type="submit" > {loading ? <Spinner /> : (<>{toggleForm ? "Criar conta" : "Entrar"}</>)}  </button>

                </form>
                {toggleForm ? 
                <p> Já tem conta? <span onClick={() => setToggleForm(false)}>Entre</span></p> 
                : <p> Ainda não tem conta, <span onClick={() => setToggleForm(true)}>crie sua conta</span></p>}
            </article>
        </Styled.Container>
        
    );
}