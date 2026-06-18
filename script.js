// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares obrigatórios para APIs modernas
app.use(cors()); // Permite requisições vindas do arquivo HTML frontal
app.use(express.json({ limit: '10mb' })); // Suporta JSON e uploads Base64

// Banco de Dados fictício na memória RAM do Servidor
let bancoUsuarios = [];
let bancoDenuncias = [];

// Função de Sanitização no Servidor (Proteção Backend contra Injeção de Código)
function limparInput(texto) {
    if (typeof texto !== 'string') return '';
    return texto.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

// ROTA 1: Cadastrar Usuário Consciente
app.post('/api/usuarios', (req, res) => {
    const { nome, email, perfil } = req.body;
    
    if (!nome || !email || !perfil) {
        return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
    }

    const novoUsuario = {
        id: 'usr_' + Date.now(),
        nome: limparInput(nome),
        email: limparInput(email),
        perfil: perfil,
        criadoEm: new Date().toLocaleString('pt-BR')
    };

    bancoUsuarios.push(novoUsuario);
    res.status(201).json({ msg: "Usuário gravado no servidor!", usuario: novoUsuario });
});

// ROTA 2: Listar Usuários Cadastrados
app.get('/api/usuarios', (req, res) => {
    res.json(bancoUsuarios);
});

// ROTA 3: Registrar Denúncia Fictícia Pedagógica
app.post('/api/denuncias', (req, res) => {
    const { tipo, descricao, imagem } = req.body;

    const novaDenuncia = {
        ticket: 'TK-' + Math.floor(1000 + Math.random() * 9000),
        tipo: tipo,
        descricao: limparInput(descricao),
        imagem: imagem || "Nenhuma",
        data: new Date().toLocaleString('pt-BR')
    };

    bancoDenuncias.push(novaDenuncia);
    res.status(201).json({ msg: "Denúncia processada pelo servidor!", denuncia: novaDenuncia });
});

// Inicialização do Servidor de Redes
app.listen(PORT, () => {
    console.log(`🚀 Servidor de Cidadania Digital rodando em http://localhost:${PORT}`);
});

