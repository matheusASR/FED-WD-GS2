import { Header } from "../components/Header";
import "../styles/home.scss"

export const Home = () => {
  return (
    <>
      <Header />
      <main className="main__home__container">
        <div className="home__div1">
          <section className="home__div1__section1">
            <figure>
              <img className="solution__image" src="https://revolucao.etc.br/wp-content/uploads/2019/12/Sa%C3%BAde.png" alt="solution__image" />
            </figure>
            <section className="section__title">
              <h1>Título da solução</h1>
              <p className="solution__text">Texto sobre a solução (de 20 a 30 palavras)</p>
            </section>
            <section className="section__button">
                <button className="button__more__infos">Mais informações</button>
            </section>
          </section>
          <section className="home__div1__section2">
            <div className="divs__section">
              <h2>O que é a Solução?</h2>
              <p></p>
            </div>
            <div className="divs__section">
              <h2>O que ela fará?</h2>
              <p></p>
            </div>
            <div className="divs__section">
              <h2>Como funcionará?</h2>
              <p></p>
            </div>
          </section>
        </div>
        <div className="home__div2">
            <h1>Vantagens</h1>
            <section className="home__section__pros">
                <div className="divs__section__pros">
                    <h2>01</h2>
                    <p></p>
                </div>
                <div className="divs__section__pros">
                    <h2>02</h2>
                    <p></p>
                </div>
                <div className="divs__section__pros">
                    <h2>03</h2>
                    <p></p>
                </div>
            </section>
        </div>
      </main>
    </>
  );
};
