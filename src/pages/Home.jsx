import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import "../styles/home.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [content, setContent] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    const authentication = () => {
      const user = sessionStorage.getItem("@USERINFO:MindWell")
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
    authentication()
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
                <h1>{content.title}</h1>
                <p className="solution__text">{content.text}</p>
              </section>
              <section className="section__button">
                <button className="button__more__infos">
                  Mais informações
                </button>
              </section>
            </section>
          )}
          {content && ( 
            <section className="home__div1__section2">
              <div className="divs__section">
                <h2>{content.description}</h2>
                <p></p>
              </div>
              <div className="divs__section">
                <h2>{content.does}</h2>
                <p></p>
              </div>
              <div className="divs__section">
                <h2>{content.works}</h2>
                <p></p>
              </div>
            </section>
          )}
        </div>
        {content && ( 
          <div className="home__div2">
            <h1>Vantagens</h1>
            <section className="home__section__pros">
              <div className="divs__section__pros">
                <h2>01</h2>
                <p>{content.pros[0]}</p>
              </div>
              <div className="divs__section__pros">
                <h2>02</h2>
                <p>{content.pros[1]}</p>
              </div>
              <div className="divs__section__pros">
                <h2>03</h2>
                <p>{content.pros[2]}</p>
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
};
