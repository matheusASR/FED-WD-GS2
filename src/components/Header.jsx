import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Header = () => {
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()
    const userInfos = sessionStorage.getItem("@USERINFO:MindWell")

    const logout = () => {
        sessionStorage.removeItem("@USERINFO:MindWell")
        toast.success("Usuário deslogado com sucesso!");
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }

    useEffect(() => {
        if (userInfos) {
            const parsedUserInfos = JSON.parse(userInfos)
            setUserInfo(parsedUserInfos)
        }
      }, [userInfos]);

    return (
        <>
            <header className="header__container">
                {userInfos ? (
                    <>
                        <p className="header__username">OLÁ {userInfo.username ? userInfo.username.toUpperCase() : null}</p>
                        <p>{userInfo.email}</p>
                        <button onClick={() => logout()}>Logout</button>
                    </>
                ) : null}
            </header>
        </>
    )
}