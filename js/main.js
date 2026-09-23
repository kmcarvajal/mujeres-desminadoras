// Las interacciones del mapa estan pendientes.


const pagina = document.querySelector('.site-main');

if (pagina) {
  const url = encodeURIComponent(
    pagina.dataset.shareUrl || location.href
  );

  const enlaces = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}`,
    whatsapp: `https://wa.me/?text=${url}`
  };

  pagina.querySelectorAll('[data-red]').forEach(link => {
    link.href = enlaces[link.dataset.red];
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}