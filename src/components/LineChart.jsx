import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }
 
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    const unixTime =coinHistory?.data?.history[i].timestamp;
    const date = new Date(unixTime*1000);
 coinTimestamp.push(date.toLocaleDateString("en-US"));
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      yAxes: {
        display: true,
        ticks: {
            beginAtZero: true,
          },
      },
      xAxes: {
        time: {
            parser: 'YYYY-MM-DD HH:mm:ss',
            unit: 'minute',
            displayFormats: {
                'minute': 'YYYY-MM-DD HH:mm:ss',
                'hour': 'YYYY-MM-DD HH:mm:ss'
            }
        },
      },
    },
  };
  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-Typography.Title">
          {coinName} Price Chart
        </Typography.Title>
        <Col className="chart-container">
          <Typography.Title level={5} className="chart-Typography.Title">
            {coinHistory?.data?.change}
          </Typography.Title>
          <Typography.Title level={5} className="chart-Typography.Title">
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;


