import React from "react";
import "./cadastro.css";
import { Link } from "react-router-dom";
import Footer from "../../components/rodape/footer";

import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../connection/apiService";

export default function Cadastro() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nameProduct: "",
    description: "",
    producer: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await ApiService.product.getProductById(id);
          setFormData(response);
        } catch (er) {
          toast.error("Erro ao buscar produto.");
          console.error(er);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const product = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      if (id) {
        await ApiService.product.updateProduct(id, product);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await ApiService.product.createProduct(product);
        toast.success("Produto cadastrado com sucesso!");
      }
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data;

        Object.values(errors).forEach((msg) => toast.error(msg));
      } else {
        toast.error("Erro ao cadastrar produto.");
      }
    }
  };

  return (
    <>
      <article className="topo-cadastro">
        <main className="conteudo-cadastro">
          <form onSubmit={handleSubmit}>
            <h1>{id ? "Editar produto" : "Incluir novo produto"}</h1>

            <div>
              <label>Produto:</label>
              <input
                type="text"
                id="nome"
                name="nameProduct"
                value={formData.nameProduct}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Fabricante:</label>
              <input
                type="text"
                id="fabricante"
                name="producer"
                value={formData.producer}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Preço:</label>
              <input
                type="number"
                id="preco"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Quantidade em estoque:</label>
              <input
                type="number"
                id="estoque"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Descrição:</label>
              <textarea
                type="text"
                id="descricao"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit">{id ? "Atualizar" : "Cadastrar"}</button>
            {id != null ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate("/");
                }}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate("/");
                }}
              >
                Voltar
              </button>
            )}
          </form>
        </main>
      </article>
      <Footer />
    </>
  );
}
