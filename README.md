# wecred
wecred site

# Configuração do Ambiente e Execução do Servidor

## Requisitos

- Node.js instalado (versão recomendada: 14.x ou superior)
- Conta de e-mail configurada no serviço que será usado (o código atual utiliza Hotmail, mas pode ser ajustado para outros serviços de e-mail)

## Passos para configurar e rodar o projeto

### 1. Clonar o Repositório

Clone o repositório para sua máquina local ou baixe os arquivos necessários.

```bash
git clone <link-do-repositorio>
cd <nome-do-diretorio>
```
### 2. Instalar as Dependências

Antes de rodar o projeto, certifique-se de ter o Node.js instalado. Você pode verificar se o Node está instalado rodando:

```bash
node -v
```

Instale as dependências necessárias do projeto. Na raiz do projeto, execute o comando:

```bash
npm install
```

Isso irá instalar os seguintes pacotes:

- express: Framework web para Node.js.
- nodemailer: Biblioteca para envio de e-mails.
- body-parser: Middleware para processar dados do corpo das requisições.
- cors: Middleware para habilitar o CORS (Cross-Origin Resource Sharing).

### 3. Configuração do Serviço de E-mail

Atualize as credenciais de e-mail no arquivo server.js

`const transporter = nodemailer.createTransport({
  service: 'hotmail', // ou outro serviço de e-mail (Gmail, Yahoo, etc.)
  auth: {
    user: 'seu-email@hotmail.com', // Substitua pelo seu e-mail
    pass: 'sua-senha', // Substitua pela sua senha de e-mail
  },
});`

Se estiver usando outro serviço de e-mail (como Gmail ou Yahoo), substitua 'hotmail' pelo nome do serviço correto e ajuste as credenciais.

### 4. Executar o Servidor

Para rodar o servidor localmente, execute o seguinte comando na raiz do projeto:

```bash
node server.js
```

O servidor estará rodando no endereço:

[http://localhost:3000](http://localhost:3000)

### Solução de Problemas de Autenticação com Serviços de E-mail

Caso você enfrente problemas de autenticação ao enviar o e-mail, siga estas instruções:

**Gmail**

Se estiver usando Gmail e receber um erro de autenticação relacionado a "senha de aplicativo", siga os passos abaixo:

- Habilite a verificação em duas etapas na sua conta Google.
- Gere uma senha de aplicativo em https://myaccount.google.com/security na seção "Senhas de aplicativos".
- Use essa senha no lugar da senha normal no seu código.

**Hotmail/Outlook**

Se estiver usando Hotmail/Outlook, pode ser necessário ativar uma senha de aplicativo ou usar OAuth2 para autenticação.



