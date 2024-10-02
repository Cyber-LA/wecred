// Máscaras para CPF, Telefone, Data de Nascimento e CEP
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

// Salvar escolha de estado civil no sessionStorage
document.querySelectorAll('input[name="estado-civil"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        sessionStorage.setItem('estadoCivil', radio.value);
    });
});

// Lógica para coleta e envio dos dados
document.getElementById('meu-formulario').addEventListener('submit', function (event) {
    event.preventDefault();

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
        numero: document.getElementById('numero').value,
        estadoCivil: sessionStorage.getItem('estadoCivil')
    };

    let conjugeData = {};
    const conjugeFields = document.querySelector('.form-section:last-child');
    if (conjugeFields && conjugeFields.querySelector('#nome-completo-conjuge')) {
        conjugeData = {
            nomeConjuge: conjugeFields.querySelector('#nome-completo-conjuge').value,
            cpfConjuge: conjugeFields.querySelector('#cpf-conjuge').value,
            dataNascimentoConjuge: conjugeFields.querySelector('#data-nascimento-conjuge').value,
            whatsappConjuge: conjugeFields.querySelector('#whatsapp-conjuge').value
        };
    }

    let escolhas = JSON.parse(sessionStorage.getItem('escolhas')) || [];

    const dadosCompletos = {
        ...formData,
        ...conjugeData,
        escolhasAnteriores: escolhas
    };

    fetch('http://localhost:3000/enviar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCompletos)
    })
        .then((response) => response.text())
        .then((data) => {
            sessionStorage.clear();
            window.location.href = 'success.html';
        })
        .catch((error) => {
            alert('Erro ao enviar o formulário. Tente novamente.');
            console.error('Erro:', error);
        });
});

// Lógica para duplicar o formulário quando "Casado" for selecionado
document.addEventListener('DOMContentLoaded', function () {
    const estadoCivilRadios = document.querySelectorAll('input[name="estado-civil"]');
    const formSections = document.getElementById('form-sections');

    estadoCivilRadios.forEach((radio) => {
        radio.addEventListener('change', function () {
            if (radio.value === 'casado') {
                const newSection = document.createElement('div');
                newSection.classList.add('form-section');
                newSection.innerHTML = `
                    <div class="form-group">
                        <label for="nome-completo-conjuge">Nome Completo (Cônjuge)</label>
                        <input type="text" id="nome-completo-conjuge" name="nome-completo-conjuge" placeholder="Nome completo" required>
                    </div>
                    <div class="form-group">
                        <label for="cpf-conjuge">CPF (Cônjuge)</label>
                        <input type="text" id="cpf-conjuge" name="cpf-conjuge" placeholder="000.000.000-00" maxlength="14" required>
                    </div>
                    <div class="form-group">
                        <label for="data-nascimento-conjuge">Data de Nascimento (Cônjuge)</label>
                        <input type="text" id="data-nascimento-conjuge" name="data-nascimento-conjuge" placeholder="00/00/0000" maxlength="10" required>
                    </div>
                    <div class="form-group">
                        <label for="whatsapp-conjuge">Whatsapp (Cônjuge)</label>
                        <input type="text" id="whatsapp-conjuge" name="whatsapp-conjuge" placeholder="(00) 00000-0000" maxlength="15" required>
                    </div>
                `;
                formSections.appendChild(newSection);

                // Adiciona máscara nos campos do cônjuge
                adicionarMascaraNosCamposConjuge();
            } else {
                if (formSections.children.length > 1) {
                    formSections.removeChild(formSections.lastElementChild);
                }
            }
        });
    });
});

// Função para adicionar as máscaras nos campos do cônjuge
function adicionarMascaraNosCamposConjuge() {
    document.getElementById('cpf-conjuge').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = value.slice(0, 14);
    });

    document.getElementById('whatsapp-conjuge').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
        e.target.value = value.slice(0, 15);
    });

    document.getElementById('data-nascimento-conjuge').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(\d{2})(\d)/, "$1/$2");
        value = value.replace(/(\d{2})(\d)/, "$1/$2");
        e.target.value = value.slice(0, 10);
    });
}
