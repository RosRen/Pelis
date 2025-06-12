window.onload = () => {
  const form = document.getElementById('formularioBusqueda');
  const busqueda = document.getElementById('busquedaPelicula');
  const resultado = document.getElementById('resultado');
  const urlApi = 'https://api.themoviedb.org/3/search/movie?';
  const apikey = '4b3de637d05b9e75046c247fde1a8dcd';
  const idioma = 'es-MX';

  form.addEventListener('submit', e => {
    e.preventDefault();
    const pelicula = busqueda.value.trim();
    if (pelicula) {
      buscarPelicula(pelicula);
    }
  });

  async function buscarPelicula(pelicula) {
    resultado.innerHTML = '<p>Cargando...</p>';
    try {
      const response = await fetch(`${urlApi}api_key=${apikey}&query=${pelicula}&language=${idioma}`);
      if (!response.ok) throw new Error('Error en la búsqueda');
      const data = await response.json();
      mostrarPeliculas(data.results);
    } catch (error) {
      resultado.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

function mostrarPeliculas(movies) {
  if (movies.length === 0) {
    resultado.innerHTML = '<p>No se encontró ninguna película.</p>';
    return;
  }
  resultado.innerHTML = movies.map(pelicula => {
    const posterPath = pelicula.poster_path;
    const posterUrl = posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : 'https://via.placeholder.com/500x750?text=Sin+Imagen';

    return `
      <div>
        <img src="${posterUrl}" alt="Poster de ${pelicula.title}" style="width:200px; height:auto;"/>
        <h3>${pelicula.title}</h3>
        <p>${pelicula.overview || 'Sin descripción.'}</p>
      </div>
    `;
  }).join('');
}
}
