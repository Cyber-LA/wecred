const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o pacote CORS
const app = express();
const port = 3000;
const host = "localhost";

// Middleware para habilitar CORS
app.use(cors());

// Middleware para processar os dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar o transporte de e-mail com o Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'juunioor.romano@gmail.com', // Seu e-mail
    pass: 'vinm adep vpto tsod', // Sua senha de e-mail (ou chave de aplicação)
  },
});

// Função para formatar as escolhas anteriores em HTML
function formatarEscolhasHTML(escolhas) {
  return escolhas.map((escolha, index) => {
    if (typeof escolha === 'object') {
      return `
        <h4>Opção ${index + 1}:</h4>
        <ul>
          ${Object.entries(escolha).map(([chave, valor]) => `<li><strong>${chave}:</strong> ${valor}</li>`).join('')}
        </ul>
      `;
    } else {
      return `<p><strong>Opção ${index + 1}:</strong> ${escolha}</p>`;
    }
  }).join('');
}

// Rota para o envio de e-mail
app.post('/enviar-email', (req, res) => {
  const {
    nome,
    cpf,
    dataNascimento,
    whatsapp,
    cep,
    estado,
    cidade,
    bairro,
    rua,
    numero,
    estadoCivil,
    nomeConjuge,
    cpfConjuge,
    dataNascimentoConjuge,
    whatsappConjuge,
    escolhasAnteriores
  } = req.body;

  // Formatando as escolhas anteriores para inclusão no e-mail
  const escolhasFormatadasHTML = escolhasAnteriores ? formatarEscolhasHTML(escolhasAnteriores) : '<p>Nenhuma escolha anterior.</p>';

  // Configuração do e-mail a ser enviado
  const mailOptions = {
    from: 'juunioor.romano@gmail.com', // Seu endereço de e-mail
    to: 'junior1991_5@hotmail.com', // E-mail de destino
    subject: 'Dados do Formulário - Simulador WeCred',
    html: `
      <h3>Dados do Formulário Principal:</h3>
      <p><strong>Nome Completo:</strong> ${nome}</p>
      <p><strong>CPF:</strong> ${cpf}</p>
      <p><strong>Data de Nascimento:</strong> ${dataNascimento}</p>
      <p><strong>Whatsapp:</strong> ${whatsapp}</p>
      <p><strong>CEP:</strong> ${cep}</p>
      <p><strong>Estado:</strong> ${estado}</p>
      <p><strong>Cidade:</strong> ${cidade}</p>
      <p><strong>Bairro:</strong> ${bairro}</p>
      <p><strong>Rua:</strong> ${rua}</p>
      <p><strong>Número:</strong> ${numero}</p>
      <p><strong>Estado Civil:</strong> ${estadoCivil}</p>

      ${nomeConjuge ? `
      <h3>Dados do Cônjuge:</h3>
      <p><strong>Nome Completo (Parceiro):</strong> ${nomeConjuge}</p>
      <p><strong>CPF (Parceiro):</strong> ${cpfConjuge}</p>
      <p><strong>Data de Nascimento (Parceiro):</strong> ${dataNascimentoConjuge}</p>
      <p><strong>Whatsapp (Parceiro):</strong> ${whatsappConjuge}</p>
      ` : ''}

      <h3>Escolhas Anteriores:</h3>
      ${escolhasFormatadasHTML}
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
app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});