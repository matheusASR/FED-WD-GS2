import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "../styles/register.scss"

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const users = await fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const usersJSON = await users.json();
    const userFound = usersJSON.find((u) => u.username === formData.username);
    if (userFound) {
      toast.error("Já há um usuário com este nome. Tente outro.");
    } else {
      await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      toast.success("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      <Header />
      <main className="main__container__register">
        <form onSubmit={handleSubmit(onSubmit)} className="register__form">
          <h2 className="register__title">Cadastro</h2>
          <input
            type="text"
            placeholder="Nome de Usuário"
            {...register("username")}
            required
          />
          <input
            type="email"
            placeholder="Email do Usuário"
            {...register("email")}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            {...register("password")}
            required
          />
          <div className="div__bttns__register">
            <button className="register__btn__register__page" type="submit">
              Cadastrar
            </button>
            <Link className="login__link__register__page" to="/">
              <button className="login__btn__register__page">Voltar</button>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};
