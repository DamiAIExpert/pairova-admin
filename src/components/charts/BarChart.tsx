'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export type BarChartProps = {
  labels: string[];
  values: number[];
  datasetLabel?: string;
  color?: string;            // e.g. '#0F172A'
  height?: number;           // px
};

export default function BarChart({
  labels,
  values,
  datasetLabel = 'User Engagements',
  color = '#0F172A',
  height = 260,
}: BarChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data: values,
        backgroundColor: color,
        borderRadius: 6,
        barThickness: 22,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { display: false },
      tooltip: { intersect: false },
    },
    scales: {
      x: {
        grid: { color: '#F1F5F9' },
        ticks: { color: '#64748B', font: { size: 11 } },
      },
      y: {
        grid: { color: '#E5E7EB' },
        ticks: { color: '#94A3B8', font: { size: 11 }, stepSize: 500 },
        min: 0,
        suggestedMax: Math.max(...values) + 400,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  );
}