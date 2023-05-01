import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';
import { toast } from 'react-toastify';

function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "dabc8bae9eb4e7d3432142d09844c9a2",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/", { replace: true });
                    return;
                })
        }
        loadFilme();

        return () => {

        }

    }, [id, navigate]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@filmes");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmes) => filmes.id === filme.id);

        if(hasFilme){
            toast.warn("Esse filme ja se encontra na lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@filmes", JSON.stringify(filmesSalvos))
        toast.success("Filmes salvo com sucesso")
    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h2>Carregando...</h2>
            </div>
        )
    }
    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                alt={filme.title}
            />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target='blank' rel='external'>Trailer</a>
                </button>
            </div>

        </div>
    )
}

export default Filme;