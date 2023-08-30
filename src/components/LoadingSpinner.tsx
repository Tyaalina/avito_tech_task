import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner: React.FC = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Spin size="large" />
        </div>
    );
};

export default LoadingSpinner;
