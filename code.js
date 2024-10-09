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
 
    feed.prepend(postElement);
    document.getElementById('postContent').value = '';
    document.getElementById('postImage').value = '';
}
