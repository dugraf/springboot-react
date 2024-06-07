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
  const [objProduto, setObjProduto] = useState(produto);

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retono_convertido => setProdutos(retono_convertido));
  }, [] /*garante a requisicao uma vez*/);

  // Obtendo os dados do formulario
  const aoDigitar = (e) => {
    setObjProduto({.../*valor que esta contendo o objeto produto: nome, marca*/objProduto, [e.target.name]:e.target.value})
  }

  return (
    <div>
      <p>{JSON.stringify(objProduto)}</p>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar}/>
      <Tabela vetor={produtos}/>
    </div>
  );
}

export default App;
