import React, { useState } from 'react';
import { Card } from 'antd';
import { Game } from '../store/games/gamesSlice';
import placeholderImage from './images/unloaded.png';
import { Link } from 'react-router-dom';

interface GameCardProps {
    game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
    //const history = useHistory();
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    return (
        <Link to={"game/" + game.id}>
            <Card
                hoverable
                cover={
                    <img
                        alt={game.title}
                        src={imageError ? placeholderImage : game.thumbnail}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        style={{
                            display: imageLoading ? 'none' : 'block',
                        }}
                    />
                }
            >
                <Card.Meta title={game.title} description={`Дата выпуска: ${game.releaseDate}`} />
            </Card>
        </Link>
    )
};


export default GameCard;