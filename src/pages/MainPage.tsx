import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Select, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import GameCard from '../components/GameCard';
import { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure } from '../store/games/gamesSlice'; // Import Redux actions and selectors
import { RootState } from '../store/configureStore'; // Assuming you have a RootState type defined
import { fetchGames } from '../services/api';
import AppHeader from '../components/AppHeader';
const { Option } = Select;
const MainPage: React.FC = () => {
    const dispatch = useDispatch(); // Use useDispatch to dispatch actions
    const games = useSelector((state: RootState) => state.games.games); // Use useSelector to get games from the Redux store
    const loading = useSelector((state: RootState) => state.games.loading); // Get loading state
    const error = useSelector((state: RootState) => state.games.error); // Get error state

    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [sortingOption, setSortingOption] = useState('releaseDate');

    useEffect(() => {
        // Dispatch the fetchGamesStart action
        dispatch(fetchGamesStart());

        const fetchData = async () => {
            try {
                const gamesData = await fetchGames(selectedPlatform, selectedGenre, sortingOption);
                // Dispatch the fetchGamesSuccess action with fetched data
                dispatch(fetchGamesSuccess(gamesData));
            } catch (error) {
                // Dispatch the fetchGamesFailure action with error message
                dispatch(fetchGamesFailure('Failed to fetch games'));
            }
        };

        fetchData();
    }, [dispatch, selectedPlatform, selectedGenre, sortingOption]);


    return (
        <div>
            <AppHeader />
            <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
                <Row justify="center">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <Card title="Платформа">
                                <Select
                                    placeholder="Платформа"
                                    value={selectedPlatform}
                                    onChange={(value) => setSelectedPlatform(value)}
                                    style={{ width: '100%' }}
                                >
                                    <Option value="pc">Персональный компьютер</Option>
                                    <Option value="browser">Браузер</Option>
                                    <Option value="all">Все</Option>
                                </Select>
                            </Card>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <Card title="Жанр">
                                <Select
                                    placeholder="Select Genre"
                                    value={selectedGenre}
                                    onChange={(value) => setSelectedGenre(value)}
                                    style={{ width: '100%' }}
                                >
                                    <Option value="mmorpg">ММОРПГ</Option>
                                    <Option value="shooter">Шутер</Option>
                                    <Option value="strategy">Стратегия</Option>
                                    <Option value="moba">МОБА</Option>
                                    <Option value="racing">Гонки</Option>
                                    <Option value="sports">Спорт</Option>
                                    <Option value="social">Социальные</Option>
                                    <Option value="sandbox">Песочница</Option>
                                    <Option value="open-world">Открытый мир</Option>
                                    <Option value="survival">Выживание</Option>
                                    <Option value="pvp">PvP</Option>
                                    <Option value="pve">PvE</Option>
                                    <Option value="pixel">Пиксельные</Option>
                                    <Option value="voxel">Воксельные</Option>
                                    <Option value="zombie">Зомби</Option>
                                    <Option value="turn-based">Пошаговые</Option>
                                    <Option value="first-person">От первого лица</Option>
                                    <Option value="third-person">От третьего лица</Option>
                                    <Option value="top-down">Сверху вниз</Option>
                                    <Option value="tank">Танковые</Option>
                                    <Option value="space">Космос</Option>
                                    <Option value="sailing">Парусные</Option>
                                    <Option value="side-scroller">Side-Scroller</Option> {/* No direct translation */}
                                    <Option value="superhero">Супергерои</Option>
                                    <Option value="permadeath">Постоянная смерть</Option>
                                    <Option value="card">Карточные</Option>
                                    <Option value="battle-royale">Королевская битва</Option>
                                    <Option value="mmo">ММО</Option>
                                    <Option value="mmofps">ММОФПС</Option>
                                    <Option value="mmotps">ММОТПС</Option>
                                    <Option value="3d">3D</Option>
                                    <Option value="2d">2D</Option>
                                    <Option value="anime">Аниме</Option>
                                    <Option value="fantasy">Фэнтези</Option>
                                    <Option value="sci-fi">Научная фантастика</Option>
                                    <Option value="fighting">Файтинг</Option>
                                    <Option value="action-rpg">Экшн RPG</Option>
                                    <Option value="action">Экшн</Option>
                                    <Option value="military">Военные</Option>
                                    <Option value="martial-arts">Боевые искусства</Option>
                                    <Option value="flight">Леталки</Option>
                                    <Option value="low-spec">Слабые системные требования</Option>
                                    <Option value="tower-defense">Защита башни</Option>
                                    <Option value="horror">Хоррор</Option>
                                    <Option value="mmorts">ММОСТ</Option>
                                </Select>
                            </Card>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <Card title="Сортировка">
                                <Radio.Group value={sortingOption} onChange={(e) => setSortingOption(e.target.value)}>
                                    <Radio.Button value="releaseDate">Дата выпуска</Radio.Button>
                                    <Radio.Button value="popularity">Популярность</Radio.Button>
                                    {/* Add more sorting options if needed */}
                                </Radio.Group>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    {games.map((game) => (
                        <Col key={game.id} xs={24} sm={12} md={8} lg={6}>
                            <GameCard game={game} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default MainPage;
