const abrir = document.getElementById('abrir');
const abrir2 = document.getElementById('abrir2');
const fechar = document.getElementById('fechar');
const modal = document.getElementById('modal');

function abrirModal() {
  modal && modal.classList.add('ativo');
}

abrir && abrir.addEventListener('click', abrirModal);
abrir2 && abrir2.addEventListener('click', abrirModal);

fechar && fechar.addEventListener('click', () => {
  modal && modal.classList.remove('ativo');
});

modal && modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('ativo');
  }
});