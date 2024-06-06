import logo from './logo.svg';
import {useEffect, useState} from 'react'
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // Objeto produto
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  //UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retono_convertido => setProdutos(retono_convertido));
  }, [] /*garante a requisicao uma vez*/);

  return (
    <div>
      <Formulario botao={btnCadastrar}/>
      <Tabela vetor={produtos}/>
    </div>
  );
}

export default App;
