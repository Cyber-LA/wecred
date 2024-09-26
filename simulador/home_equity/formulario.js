document.addEventListener('DOMContentLoaded', function () {
  // Função para aplicar máscara no valor aproximado
  const valorAproxInput = new Cleave('#valor-aprox', {
      numeral: true,
      numeralDecimalMark: ',',
      delimiter: '.',
      numeralThousandsGroupStyle: 'thousand',
      prefix: 'R$ ',
      numeralPositiveOnly: true,
  });

  const sliderEmprestimo = document.getElementById('slider-emprestimo');
  const valorMaximoSpan = document.getElementById('valor-maximo');
  const valorEmprestimoInput = document.getElementById('valor-emprestimo');

  // Valida o valor mínimo do imóvel quando o campo perde o foco (blur)
  document.getElementById('valor-aprox').addEventListener('blur', function () {
      const valorImovel = valorAproxInput.getRawValue(); // Pega o valor sem máscara
      if (valorImovel) {
          const valorImovelFloat = parseFloat(valorImovel.replace(/\D/g, '')); // Remove caracteres não numéricos

          // Verifica se o valor é maior ou igual a 125000
          if (!isNaN(valorImovelFloat) && valorImovelFloat >= 125000) {
              const valorMaximo = valorImovelFloat * 0.6;
              sliderEmprestimo.max = valorMaximo;
              sliderEmprestimo.value = valorMaximo; // Define o valor do slider como o valor máximo
              valorMaximoSpan.innerText = `R$ ${valorMaximo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
              atualizarValorEmprestimo(valorMaximo); // Atualiza o valor do empréstimo com o valor máximo
          } else {
              // Se o valor for menor que 125000, exibe uma mensagem de alerta
              valorMaximoSpan.innerText = 'R$ 0,00';
              sliderEmprestimo.max = 0;
              atualizarValorEmprestimo(0); // Define o valor do empréstimo como 0
              alert('O valor mínimo é R$ 125.000');
          }
      }
  });

  // Atualiza o valor do campo de empréstimo quando o slider é ajustado
  sliderEmprestimo.addEventListener('input', function () {
      atualizarValorEmprestimo(sliderEmprestimo.value);
  });

  // Função para atualizar o valor do empréstimo com base no slider
  function atualizarValorEmprestimo(valor) {
      valorEmprestimoInput.value = `R$ ${parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  }
});