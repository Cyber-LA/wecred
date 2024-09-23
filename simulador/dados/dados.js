// Função para aplicar máscara de CPF
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value.slice(0, 14); // Limitar a 14 caracteres
});

// Função para aplicar máscara de telefone
document.getElementById('whatsapp').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value.slice(0, 15); // Limitar a 15 caracteres
});

// Função para aplicar máscara de data de nascimento
document.getElementById('data-nascimento').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    e.target.value = value.slice(0, 10); // Limitar a 10 caracteres
});

// Função para aplicar máscara de CEP e buscar endereço automaticamente
document.getElementById('cep').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Aplica a máscara do CEP
    e.target.value = value; // Atualiza o valor com a máscara aplicada

    if (value.length === 9) { // Se o CEP estiver completo (8 dígitos + hífen)
        buscarEnderecoPorCEP(value.replace("-", "")); // Remove o hífen para buscar
    }
});

// Função para buscar o endereço pelo CEP usando a API ViaCEP
function buscarEnderecoPorCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('estado').value = data.uf;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('rua').value = data.logradouro;
                habilitarEdicaoCampos(); // Habilitar edição dos campos após o preenchimento
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

// Função para habilitar a edição dos campos após o preenchimento
function habilitarEdicaoCampos() {
    document.getElementById('estado').readOnly = false;
    document.getElementById('cidade').readOnly = false;
    document.getElementById('bairro').readOnly = false;
    document.getElementById('rua').readOnly = false;
}

// Função para limpar os campos de endereço
function limparCamposEndereco() {
    document.getElementById('estado').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('rua').value = '';
}

document.getElementById('meu-formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Coleta os dados do formulário
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

    // Envia os dados usando fetch
    fetch('http://localhost:3000/enviar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert('Formulário enviado com sucesso!');
    })
    .catch(error => {
        alert('Erro ao enviar o formulário. Tente novamente.');
        console.error('Erro:', error);
    });
});
