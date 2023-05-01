import './index.css';

import { Link } from 'react-router-dom';

export default function Header(){
    return (
        <header>
            <Link to="/" className='logo'> Prime Flix </Link>
            <Link to="/favoritos" className='favoritos'> Meus filmes </Link>
        </header>
    )
}