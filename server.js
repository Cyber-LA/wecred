const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o pacote CORS
const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para processar os dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar o transporte de e-mail com o Nodemailer
const transporter = nodemailer.createTransport({
  service: 'hotmail', // ou outro serviço de e-mail
  auth: {
    user: 'teste@hotmail.com', // seu e-mail
    pass: 'teste', // sua senha de e-mail
  },
});

// Rota para o envio de e-mail
app.post('/enviar-email', (req, res) => {
  const { nome, cpf, dataNascimento, whatsapp, cep, estado, cidade, bairro, rua, numero } = req.body;

  // Configuração do e-mail a ser enviado
  const mailOptions = {
    from: 'teste@hotmail.com', // Seu endereço de e-mail
    to: 'teste@hotmail.com', // E-mail de destino
    subject: 'Dados do Formulário',
    text: `
      Nome Completo: ${nome}
      CPF: ${cpf}
      Data de Nascimento: ${dataNascimento}
      Whatsapp: ${whatsapp}
      CEP: ${cep}
      Estado: ${estado}
      Cidade: ${cidade}
      Bairro: ${bairro}
      Rua: ${rua}
      Número: ${numero}
    `,
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar o e-mail:', error);
      res.status(500).send('Erro ao enviar o e-mail.');
    } else {
      console.log('E-mail enviado:', info.response);
      res.send('E-mail enviado com sucesso!');
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
