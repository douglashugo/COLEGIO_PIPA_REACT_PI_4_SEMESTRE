import { useRef } from 'react';
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import "./Navbar-adm.css";


function NavbarAdm() {
    const navRef = useRef();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > -100) { // Ajuste o valor conforme necessário para definir a posição de deslocamento
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

    return (
        <header className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <h3 className='logo'>Colégio <span>Pipa</span></h3>
            <nav ref={navRef}>
                <a href="/" title="Ir para a página de Início">Início </a>
                <a href="/posts/create" title="Criar um novo post">Novo Post</a>
                <a href="#" title="Ver o Dashboard">Gerenciar Post</a>
                <a href="/register/create" title="Cadastrar Responsáveis">Cadastrar usuários</a>
                <a href="/dashboard-users" title="Gerenciar Responsáveis">Gerenciar usuários</a>
                <a href="#" title="Sair">Sair</a>
                <button
                    type='button' 
                    title="Fechar menu"
                    className='nav-btn nav-close-btn' 
                    onClick={showNavbar}
                >
                  <FaTimes/>   
                </button>
            </nav>
            <button
                type='button' 
                 title='Abrir menu'
                className='nav-btn' 
                onClick={showNavbar}
            >
              <FaBars />  
            </button>
        </header>
    );
};

export default NavbarAdm;