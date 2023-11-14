import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "../styles/login.scss"

export const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const users = await fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const usersJSON = await users.json();
    const user = usersJSON.find(
      (u) => u.username === data.username && u.password === data.password
    );
    if (user) {
      toast.success("Usuário logado com sucesso!");
      localStorage.setItem("@AlertAir:username", user.username);
      setTimeout(() => {
        navigate("/menu");
      }, 2000);
    } else {
      toast.error(
        "Nome de usuário ou senha está incorreto ou você ainda não possui cadastro."
      );
      reset();
    }
  };

  return (
    <>
      <Header />
      <main className="main__container__login">
        <form onSubmit={handleSubmit(onSubmit)} className="login__form">
          <h2 className="login__title">Login</h2>
          <input
            type="text"
            placeholder="Nome de Usuário"
            {...register("username", { required: true })}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            {...register("password", { required: true })}
            required
          />
          <div className="div__bttns__login">
            <button className="login__btn__login__page" type="submit">
              Entrar
            </button>
            <Link className="register__link__login__page" to="/register">
              <button className="register__btn__login__page">Cadastrar</button>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};
