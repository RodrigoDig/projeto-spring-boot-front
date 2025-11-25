import React from "react";
import "./cadastro.css";
import { Link } from "react-router-dom";
import Footer from "../../components/rodape/footer";

import {toast} from 'react-toastify';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../connection/apiService";

export default function Cadastro() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nameProduct: "",
    description:"",
    producer:"",
    price:0,
    stock:0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    try{

      const product ={
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

      await ApiService.product.createProduct(product);

      toast.success("Produto cadastrado com sucesso!");
      navigate("/lista");
    }
    catch (error){
      if(error.response && error.response.status === 400){
        const errors = error.response.data;

        Object.values(errors).forEach((msg) => toast.error(msg));
      }
      else{
        toast.error("Erro ao cadastrar produto.");
      }
    }
  };

  return (
    <>
      <article className="topo-cadastro">
        <main className="conteudo-cadastro">
          <form onSubmit={handleSubmit}>
            <h1>Incluir novo produto</h1>

            <div>
              <label>Produto:</label>
              <input type="text" id="nome" name="nameProduct" value={formData.nameProduct} onChange={handleChange} />
            </div>

            <div>
              <label>Fabricante:</label>
              <input type="text" id="fabricante" name="producer" value={formData.producer} onChange={handleChange}  />
            </div>

            <div>
              <label>Preço:</label>
              <input type="number" id="preco" name="price" value={formData.price} onChange={handleChange} />
            </div>

            <div>
              <label>Quantidade em estoque:</label>
              <input type="number" id="estoque" name="stock" value={formData.stock}  onChange={handleChange} />
            </div>

            <div className="descricao">
              <label>Descrição:</label>
              <textarea type="text" id="descricao" name="description" value={formData.description} onChange={handleChange} ></textarea>
            </div>

            <button type="submit">Enviar</button>            
            
          </form>
        </main>
      </article>
      <Footer />
    </>
  );
}
