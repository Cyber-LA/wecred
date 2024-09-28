// Máscaras para CPF, Telefone, Data de Nascimento e CEP (mantido como no arquivo original)
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value.slice(0, 14);
});

document.getElementById('whatsapp').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value.slice(0, 15);
});

document.getElementById('data-nascimento').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    e.target.value = value.slice(0, 10);
});

document.getElementById('cep').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value;
    if (value.length === 9) {
        buscarEnderecoPorCEP(value.replace("-", ""));
    }
});

function buscarEnderecoPorCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('estado').value = data.uf;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('rua').value = data.logradouro;
            } else {
                alert('CEP não encontrado.');
                limparCamposEndereco();
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP. Tente novamente.');
            limparCamposEndereco();
        });
}

function limparCamposEndereco() {
    document.getElementById('estado').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('rua').value = '';
}

// Função para coletar os dados do sessionStorage e enviar junto com os dados do formulário
document.getElementById('meu-formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Coleta os dados do formulário atual
    const formData = {
        nome: document.getElementById('nome-completo').value,
        cpf: document.getElementById('cpf').value,
        dataNascimento: document.getElementById('data-nascimento').value,
        whatsapp: document.getElementById('whatsapp').value,
        cep: document.getElementById('cep').value,
        estado: document.getElementById('estado').value,
        cidade: document.getElementById('cidade').value,
        bairro: document.getElementById('bairro').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value
    };

    // Recupera os dados armazenados nas páginas anteriores (sessionStorage)
    let escolhas = JSON.parse(sessionStorage.getItem('escolhas')) || [];

    // Combina os dados do formulário atual com os dados anteriores
    const dadosCompletos = {
        ...formData,
        escolhasAnteriores: escolhas
    };

    // Envia os dados usando fetch
    fetch('https://wecredassessoria.com.br:21096/enviar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCompletos)
    })
    .then(response => response.text())
    .then(data => {
        
        sessionStorage.clear(); // Limpa o sessionStorage após o envio

        // Após o envio com sucesso, redireciona para a página de confirmação
        window.location.href = 'success.html';
    })
    .catch(error => {
        alert('Erro ao enviar o formulário. Tente novamente.');
        console.error('Erro:', error);
    });
});