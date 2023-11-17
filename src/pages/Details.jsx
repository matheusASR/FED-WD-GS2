import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import "../styles/details.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const Details = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const authentication = () => {
      const user = sessionStorage.getItem("@USERINFO:MindWell");
      if (!user) {
        navigate("/");
      }
    };
    async function fetchContents() {
      try {
        const response = await fetch("http://localhost:5000/patientData", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          const contents = await response.json();
          setPatientData(contents);
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
      <main className="main__details__container">
        <Link className="example__title" to="/home">Home</Link>
        <h1 className="example__title">EXEMPLO DO SOFTWARE:</h1>
        <div className="div__details__container">
          <h2 className="patient__data__title">DADOS DO PACIENTE</h2>
          <p className="patient__data__date">SELECIONE O DIA: 15/11/2023</p>
          <table className="patient-table">
            <thead>
              <tr>
                <th>Horas</th>
                <th>Batimento Cardíaco (bpm)</th>
                <th>Temperatura (°C)</th>
                <th>Pressão Sanguínea (mmHg)</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map((data, index) => (
                <tr key={index}>
                  <td>{data.hour}</td>
                  <td>{data.heartRate}</td>
                  <td>{data.temperature}</td>
                  <td>{data.bloodPressure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="div__details__container2">
            <p className="patient__data__title">Detectamos uma anormalidade diante dos padrões de seu batimento cardíaco e sua pressão sanguínea as 14:00 do dia 15/11/2023</p>
            <p className="patient__data__date">Nos informe o que ocorreu neste momento para analisarmos as situações em que não se sente bem:</p>
            <input  className="situation__textarea" type="textarea" />
        </div>
      </main>
    </>
  );
};
