import { Link } from "react-router-dom";
import Footer from "../../components/rodape/footer";
import "./lista.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../connection/apiService";
import { toast } from "react-toastify";
import Modal from "../../components/modal/modal";

export default function Lista() {
  const [produtos, setProdutos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);

  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const response = await ApiService.product.getProduct();
      setProdutos(response);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }
  useEffect(() => { 
    fetchProducts();
  }, []);

  function openModal(product){
    setProdutoToDelete(product);
    setModalOpen(true); 
  }

  async function confirmDelete(){
    try{
      await ApiService.product.deleteProduct(produtoToDelete);

      toast.success("Produto excluído com sucesso!");

      fetchProducts();

      setModalOpen(false);
    } catch (error){
      toast.error("Erro ao excluir produto.");
      console.error("Erro ao excluir produto:", error);
    }
  }




  return (
    <article className="topo-lista">

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        OnConfirm={confirmDelete}
      />

      <div className="lista-container">
        <h1 className="titulo-lista">Lista de Produtos</h1>

        <table className="tabela-lista">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Fabricante</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nameProduct}</td>
                <td>{p.producer}</td>
                <td>{p.price}</td>
                <td>
                  {p.stock}
                  {p.stock <= 3 && (
                    <span className="alerta-estoque">Estoque baixo</span>
                  )}
                </td>
                <td>{p.description}</td>
                <td>
                  <Link to={`/editar/${p.id}`}>
                    <button className="btn-alterar">Alterar</button>    
                  </Link>
                  <button className="btn-excluir" onClick={() => openModal(p)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <button onClick={() => navigate("/cadastro")} className="add-produto-btn">Incluir novo produto</button>

      </div>
      <Footer />
    </article>
  );
}
