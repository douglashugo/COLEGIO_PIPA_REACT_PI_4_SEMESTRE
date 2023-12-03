import React, { useState, useEffect } from 'react';
import styles from "./Dashboard.module.css";

import { Link } from 'react-router-dom';
// import { getPublicacoes, deletarPublicacao } from './api';  backend

//hooks
//import { useAuthValue } from "../../contexts/AuthContext";
import { useFetchDocuments } from  '../../hooks/useFetchDocuments';



const Dashboard = () => {

   // const {user} = useAuthValue();
   // const uid = user.uid;

    const {documents: posts, loading} = useFetchDocuments("posts", null); // colocar uid para validar

    const deleteDocument = (id) =>{
        //funcao delete
    }

    return (
        <div className={styles.dashboard}>
          <h2>Dashboard | Gerencie seu conteúdo</h2>
          {posts && posts.length === 0 ? (
            <div className={styles.noposts}>
              <p>Ainda não existem publicações</p>
              <Link to="/posts/create" className="btn">
                Crie um aviso ou dica 
              </Link>
            </div>
          ) : (
            <div className={styles.post_header}>
              <span>Título</span>
              <span></span>
            </div>
          )}
    
          {posts &&
            posts.map((post) => (
              <div className={styles.post_row} key={post.id}>
                <p>{post.title}</p>
                <div className={styles.actions}>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link to={`/posts/edit/${post.id}`} className="btn btn-outline"> 
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      );
    };
    
    export default Dashboard;