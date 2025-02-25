let amigos = [];

function adicionarAmigo() {
  const inputNome = document.getElementById('amigo');
  const nomes = inputNome.value.trim();

  if (nomes === "") {
    alert("insira pelo menos um nome!");
    return;
  }

  const nomesArray = nomes.split(",").map(nome => nome.trim()).filter(nome => nome !== "");

  if (nomesArray.length === 0) {
    alert("insira pelo menos um nome válido!");
    return;
  }

  amigos.push(...nomesArray);
  atualizarLista();
  inputNome.value = "";
}

function atualizarLista() {
  const listaAmigos = document.getElementById('listaAmigos');
  listaAmigos.innerHTML = '';

  amigos.forEach((nome, index) => {
    // Cria o elemento <li> que conterá o nome e o botão com ícone
    const item = document.createElement('li');

    // Cria um elemento para exibir o nome
    const nameSpan = document.createElement('span');
    nameSpan.textContent = nome;

    // Cria o botão de remover
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.addEventListener('click', () => {
      removerAmigo(index);
    });

    // Cria o elemento de imagem que servirá como ícone
    const iconImg = document.createElement('img');
    iconImg.src = 'assets/lixo_icon.png';
    iconImg.alt = 'Ícone de remover';
    iconImg.className = 'icon-remove';

    // Adiciona o ícone dentro do botão
    removeButton.appendChild(iconImg);

    // Adiciona o nome e o botão ao item da lista
    item.appendChild(nameSpan);
    item.appendChild(removeButton);

    // Adiciona o item na lista de amigos
    listaAmigos.appendChild(item);
  });
}

function removerAmigo(index) {
  amigos.splice(index, 1);
  atualizarLista();
}

// Função para embaralhar a lista (algoritmo Fisher-Yates)
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Função para sortear a lista completa com mensagem extra
function sortearAmigo() {
  if (amigos.length < 2) {
    alert('Por favor, adicione pelo menos 2 amigos para realizar o sorteio!');
    return;
  }

  let sorteados = shuffle([...amigos]);

  // Ajuste para garantir que nenhum amigo se sorteie a si mesmo
  for (let i = 0; i < amigos.length; i++) {
    if (amigos[i] === sorteados[i]) {
      if (i === amigos.length - 1) {
        [sorteados[i], sorteados[i - 1]] = [sorteados[i - 1], sorteados[i]];
      } else {
        [sorteados[i], sorteados[i + 1]] = [sorteados[i + 1], sorteados[i]];
      }
    }
  }

  let resultados = [];
  for (let i = 0; i < amigos.length; i++) {
    resultados.push({ sorteador: amigos[i], sorteado: sorteados[i] });
  }

  exibirResultado(resultados);
}

// Exibe os resultados do sorteio completo com uma mensagem extra
function exibirResultado(resultados) {
  const resultadoLista = document.getElementById('resultado');
  resultadoLista.innerHTML = '';

  const header = document.createElement('li');
  header.textContent = 'Confira os resultados do sorteio do seu Amigo Secreto!';
  header.style.fontWeight = 'bold';
  resultadoLista.appendChild(header);

  resultados.forEach(resultado => {
    const item = document.createElement('li');
    item.textContent = `${resultado.sorteador} → ${resultado.sorteado}`;
    resultadoLista.appendChild(item);
  });
}

// Função para sortear apenas um amigo e exibir uma mensagem
function sortearUmAmigo() {
  if (amigos.length < 1) {
    alert("Adicione pelo menos um amigo para sortear!");
    return;
  }

  const index = Math.floor(Math.random() * amigos.length);
  const sorteado = amigos[index];

  const resultadoLista = document.getElementById('resultado');
  resultadoLista.innerHTML = '';
  const item = document.createElement('li');
  item.textContent = `O amigo secreto sorteado é: ${sorteado}`;
  item.style.fontWeight = 'bold';
  item.style.fontSize = '20px';
  resultadoLista.appendChild(item);
}

// Função para reiniciar o sorteio (limpa as listas e o array)
function reiniciarSorteio() {
  amigos = [];
  document.getElementById('amigo').value = "";
  document.getElementById('listaAmigos').innerHTML = "";
  document.getElementById('resultado').innerHTML = "";
  alert("Sorteio reiniciado!!");
}