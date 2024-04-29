import { ReactNode, useEffect } from "react"
import { IToken } from "../../Config/interface";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "../../Config/BaseUrl";

interface IProps {
    children: ReactNode
}


export default function RedirectRoute({children}: IProps) {

    const navigate = useNavigate();

    useEffect(() => {

        async function getAuth() {
            const auth = localStorage.getItem("authentication");

            if(auth) {

                const token: IToken = JSON.parse(auth);

                if (token?.token == "" || auth === null) {
                    
                    navigate("/registerandlogin", {replace: true});
                    
                } else {
                    await axios.get(`${base_url}/api/v1/auth/recoverData`, {
                        headers: {
                            'Authorization': `Bearer ${token.token}`
                        }
                    }).then(() => {
                        navigate("/", {replace: true}); 
                    }).catch(e => {
                        console.error(e);
                        navigate("/registerandlogin", {replace: true});
                    })
                    
                }
            }


        }

        getAuth();

    }, [])

    return (
        <>
            {children}
        </>
    )
}