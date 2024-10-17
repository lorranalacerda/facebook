let selectedImage = null;

function atualizarImagem() {
    const image = document.getElementById('postImage').files[0];

    if (image) {
        selectedImage = URL.createObjectURL(image);
    }
}

function post() {
    const content = document.getElementById('postContent').value;
    const feed = document.getElementById('feed');
  

    if (!content && !selectedImage) {
        alert("Por favor, insira algo para postar.");
        return;
    }

    const postElement = document.createElement('div');
    postElement.className = 'post';

    if (content) {
        const textElement = document.createElement('p');
        textElement.innerText = content;
        postElement.appendChild(textElement);
    }

    if (selectedImage) {
        const img = document.createElement('img');
        img.src = selectedImage;
        img.style.maxWidth = '100%';
        postElement.appendChild(img);
        selectedImage = null;
    }

    const removebotao = document.createElement('button');
    removebotao.className = 'remove-button';
    removebotao.innerText = 'Apagar';
    removebotao.onclick = function() {
        feed.removeChild(postElement);
    };
    postElement.appendChild(removebotao);

    // reações
    const reações = document.createElement('div');
    reações.className = 'reações';
    reações.innerHTML = `
    
        <span class="reaction like" data-reaction="Curtir">&#128077</span>
        <span class="reaction love" data-reaction="Amei">&#128420</span>
        <span class="reaction haha" data-reaction="Haha">&#128513</span>
        <span class="reaction wow" data-reaction="Uau">&#128558</span>
        <span class="reaction sad" data-reaction="Triste">&#128546</span>
        <span class="reaction angry" data-reaction="Grr">&#128548</span>
    `;
    postElement.appendChild(reações); // Adiciona a barra de reações ao post

    // Adiciona o espaço para exibir a reação selecionada
    const selectedReaction = document.createElement('div');
    selectedReaction.className = 'selected-reaction';
    selectedReaction.innerText = 'Selecione uma reação!'; // Mensagem padrão
    postElement.appendChild(selectedReaction);

    // Adiciona a funcionalidade de reações
    const reactions = reações.querySelectorAll('.reaction');
    reactions.forEach(reaction => {
        reaction.addEventListener('click', function() {
            reactions.forEach(r => r.classList.remove('selected')); // Remove a seleção das outras reações
            this.classList.add('selected'); // Destaca a reação clicada
            const reactionName = this.getAttribute('data-reaction');
            selectedReaction.innerText = `Você reagiu com: ${reactionName}`; // Mostra a reação selecionada
        });
    });


 
    feed.prepend(postElement);
    document.getElementById('postContent').value = '';
    document.getElementById('postImage').value = '';
}
