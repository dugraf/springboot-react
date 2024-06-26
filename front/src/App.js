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

  // Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem)
      }
      else {
        setProdutos([...produtos, retorno_convertido])
        alert('Produto cadastrado com sucesso!')
        limparFormulario()
      }
    })
  }

  // Alterar produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem)
      }
      else {
        alert('Produto alterado com sucesso!')
        let vetorTemp = [...produtos]
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo
        })

        vetorTemp[indice] = objProduto
        setProdutos(vetorTemp)
        limparFormulario()
      }
    })
  }

  // Remover produto
  const remover = () => {
    fetch('http://localhost:8080/remover/' +objProduto.codigo, {
      method: 'delete',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      alert(retorno_convertido.mensagem)
      let vetorTemp = [...produtos]
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo
      })

      vetorTemp.splice(indice, 1)
      setProdutos(vetorTemp)
      limparFormulario();
    })
  }

  // Limpar formulario
  const limparFormulario = () => {
    setObjProduto(produto)
    setBtnCadastrar(true)
  }

  // Selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice])
    setBtnCadastrar(false)
  }

  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} cancelar={limparFormulario} obj={objProduto} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
