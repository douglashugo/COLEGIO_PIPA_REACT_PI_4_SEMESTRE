import React from 'react'
import styles from './Login.module.css'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {


  const[email, setEmail] = useState("")
  const[senha, setSenha] = useState("")
  const[erro, setError] = useState("")


  return (
    <div className={styles.login}>
      <h1>Faça seu login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input type="email" name="email" required placeholder="Seu email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label>
          <span>Senha</span>
          <input type="password" name="senha" required placeholder="Insira uma senha" value={senha} onChange={(e)=>setSenha(e.target.value)}/>
        </label>
        
        <button className='btn'>Entrar</button>
      </form>
    </div>
  )
}

export default Login