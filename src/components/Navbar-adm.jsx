import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import "./Navbar-adm.css";


function NavbarAdm() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

    return (
        <header>
            <h3 className='logo'>Colégio <span>Pipa</span></h3>
            <nav ref={navRef}>
                <a href="#" title="Ir para a página de Início">Início </a>
                <a href="#" title="Criar um novo post">Novo Post</a>
                <a href="#" title="Ver o Dashboard">Dashboard</a>
                <a href="#" title="Cadastrar Responsáveis">Cadastrar usuários</a>
                <a href="#" title="Gerenciar Responsáveis">Gerenciar usuários</a>
                <a href="#" title="Editar cadastro">Editar cadastro</a>
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