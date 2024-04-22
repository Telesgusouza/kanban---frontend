import { ReactNode, useEffect } from "react"
import { IToken } from "../../Config/interface";
import { useNavigate } from "react-router-dom";

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
                    
                    navigate("/registerAndLogin", {replace: true});
                    
                } else {
                    navigate("/", {replace: true});
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