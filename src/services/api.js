import axios from 'axios';

// Base da URL : https://api.themoviedb.org/3/
// URL : /movie/now_playing?api_key=dabc8bae9eb4e7d3432142d09844c9a2&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;