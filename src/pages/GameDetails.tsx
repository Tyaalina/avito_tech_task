import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Button, Typography, Divider, Row, Col, Descriptions, Carousel, Card, Space, Alert } from 'antd';
import { fetchGameDetails } from '../services/api';
import { formatDate } from '../utils/dateUtils';
import placeholderImage from './../components/images/unloaded.png';
import LoadingSpinner from '../components/LoadingSpinner';
import AppHeader from '../components/AppHeader';

const { Title, Text } = Typography;

const GameDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [gameDetails, setGameDetails] = useState<any>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const details = await fetchGameDetails(id!);
                localStorage.setItem(`gameDetails${id}`, JSON.stringify(details));
                setTimeout(function(){localStorage.removeItem(`gameDetails${id}`);}, 5 * 60 * 1000);
                setGameDetails(details);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };
        if(localStorage.getItem(`gameDetails${id}`)) {
            setGameDetails(JSON.parse(localStorage.getItem(`gameDetails${id}`)!))
            setLoading(false);
        } else {
            fetchData();
        }
    }, [id]);

    const renderScreenshotCarousel = () => {
        if (!gameDetails?.screenshots || gameDetails.screenshots.length === 0) {
            return null;
        }

        return (
            <Carousel autoplay>
                {gameDetails.screenshots.map((screenshot: any) => (
                    <div key={screenshot.id}>
                        <img src={screenshot.image} alt={`Screenshot ${screenshot.id}`} style={{ width: '100%' }} />
                    </div>
                ))}
            </Carousel>
        );
    };

    const getData = (data: any) => {
        if (data) return data;
        return <Alert message="Данные недоступны" type="error" showIcon />;
    }

    const renderSystemRequirements = () => {
        if (!gameDetails?.minimum_system_requirements || gameDetails.minimum_system_requirements.length === 0) {
            return null;
        }
        return <Card title="Минимальные системные требования">
            <Descriptions bordered column={1} layout="horizontal">
                <Descriptions.Item label="OS">{getData(gameDetails?.minimum_system_requirements?.os)}</Descriptions.Item>
                <Descriptions.Item label="Processor">{getData(gameDetails?.minimum_system_requirements?.processor)}</Descriptions.Item>
                <Descriptions.Item label="Memory">{getData(gameDetails?.minimum_system_requirements?.memory)}</Descriptions.Item>
                <Descriptions.Item label="Graphics">{getData(gameDetails?.minimum_system_requirements?.graphics)}</Descriptions.Item>
                <Descriptions.Item label="Storage">{getData(gameDetails?.minimum_system_requirements?.storage)}</Descriptions.Item>
            </Descriptions>
        </Card>
    }

    return (
        <>
            <AppHeader />
            <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
                {loading ? (
                    <LoadingSpinner></LoadingSpinner>
                ) : (
                    <>
                        <Button onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
                            Назад
                        </Button>
                        <Title level={2}>{gameDetails?.title}</Title>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <Card>
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <img
                                        src={gameDetails?.thumbnail || placeholderImage}
                                        alt="Game Poster"
                                        style={{ width: '100%', maxWidth: '400px', marginRight: '16px' }}
                                    />
                                    <Text>{gameDetails?.description}</Text>
                                </div>
                            </Card>
                            <Card title={"Информация"} >
                                {loading ? (
                                    <Spin size="large" />
                                ) : (
                                    <>
                                        <Descriptions bordered column={1} layout="horizontal">
                                            <Descriptions.Item label="Release Date">
                                                <Text>{formatDate(gameDetails?.release_date)}</Text>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Publisher">{gameDetails?.publisher}</Descriptions.Item>
                                            <Descriptions.Item label="Developer">{gameDetails?.developer}</Descriptions.Item>
                                            <Descriptions.Item label="Genre">{gameDetails?.genre}</Descriptions.Item>
                                        </Descriptions>
                                    </>
                                )}
                            </Card>

                            {renderScreenshotCarousel()}

                            {renderSystemRequirements()}
                        </Space>
                    </>
                )}
            </div>
        </>
    );
};

export default GameDetails;
