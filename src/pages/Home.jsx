import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import "../styles/home.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {
  const [content, setContent] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const authentication = () => {
      const user = sessionStorage.getItem("@USERINFO:MindWell");
      if (!user) {
        navigate("/");
      }
    };
    async function fetchContents() {
      try {
        const response = await fetch("http://localhost:5000/contents", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          const contents = await response.json();
          setContent(contents);
        } else {
          toast.error("Erro ao buscar conteúdo");
        }
      } catch (error) {
        toast.error("Erro na requisição: " + error);
      }
    }
    authentication();
    fetchContents();
  }, [navigate]);

  return (
    <>
      <Header />
      <main className="main__home__container">
        <div className="home__div1">
          {content && (
            <section className="home__div1__section1">
              <figure>
                <img
                  className="solution__image"
                  src="https://s3-sa-east-1.amazonaws.com/iclinic-mkt/blog/2016/04/wearables-na-medicina-fitness.jpg"
                  alt="solution__image"
                />
              </figure>
              <section className="section__title">
                <h1 className="content__title">{content.title}</h1>
                <p className="solution__text">{content.text}</p>
              </section>
              <section className="section__button">
                <Link to="/details">
                  <button className="button__more__infos">
                    Mais informações
                  </button>
                </Link>
              </section>
            </section>
          )}
          {content && (
            <section className="home__div1__section2">
              <div className="divs__section">
                <h2 className="divs__section__title">O QUE É A SOLUÇÃO?</h2>
                <p className="divs__section__text">{content.description}</p>
              </div>
              <div className="divs__section">
                <h2 className="divs__section__title">O QUE ELA FARÁ?</h2>
                <p className="divs__section__text">{content.does}</p>
              </div>
              <div className="divs__section">
                <h2 className="divs__section__title">COMO FUNCIONARÁ?</h2>
                <p className="divs__section__text">{content.works}</p>
              </div>
            </section>
          )}
        </div>
        {content && (
          <div className="home__div2">
            <h1 className="pros__title">VANTAGENS</h1>
            <section className="home__section__pros">
              <div className="divs__section__pros">
                <h2 className="div__pros__title">01 {content.pros[0].title.toUpperCase()}</h2>
                <p className="div__pros__text">{content.pros[0].description}</p>
              </div>
              <div className="divs__section__pros">
                <h2 className="div__pros__title">02 {content.pros[1].title.toUpperCase()}</h2>
                <p className="div__pros__text">{content.pros[1].description}</p>
              </div>
              <div className="divs__section__pros">
                <h2 className="div__pros__title">03 {content.pros[2].title.toUpperCase()}</h2>
                <p className="div__pros__text">{content.pros[2].description}</p>
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
};
