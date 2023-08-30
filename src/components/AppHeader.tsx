import React from 'react';
import { Row, Col } from 'antd';
import { PlayCircleOutlined  } from '@ant-design/icons';

const AppHeader: React.FC = () => {
  return (
    <div style={headerStyles}>
      <Row justify="center" align="middle">
        <Col span={24} style={logoStyles}>
          <PlayCircleOutlined  style={iconStyles} />
          <span style={titleStyles}>Бесплатные Игры</span>
        </Col>
      </Row>
    </div>
  );
};

const headerStyles: React.CSSProperties = {
  backgroundColor: '#F0F2F5', // Light gray background
  color: '#001529', // Dark blue text color
  padding: '16px 0',
  marginBottom: '16px', // Add margin to the bottom
};
const logoStyles: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  display: 'flex', // To align icon and text horizontally
  alignItems: 'center', // Center vertically within the column
  justifyContent: 'center', // Center horizontally within the column
};

const iconStyles: React.CSSProperties = {
  fontSize: '32px',
  marginRight: '8px',
};

const titleStyles: React.CSSProperties = {
  verticalAlign: 'middle',
};

export default AppHeader;