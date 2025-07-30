import React, { useRef } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  LabelList
} from 'recharts';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { DataPoint } from '../types';

const ChartContainer = styled.div<{ theme: ChartTheme }>`
  background: ${props => props.theme.backgroundColor};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadow};
  padding: 1.5rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const ChartHeaderTitle = styled.h2<{ textColor: string }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.textColor};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChartTypeSelector = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.75rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ColorSchemeSelector = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.75rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

const DesignThemeSelector = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.75rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ChartStyleSelector = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.75rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FontSizeSelector = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.75rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 720px;
  margin-top: 0;
  position: relative;
`;

const ChartTitle = styled.h2<{ textColor: string }>`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Pretendard', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.textColor};
  margin: 0;
  z-index: 10;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
`;

const ChartOnlyWrapper = styled.div<{ theme: ChartTheme }>`
  width: 100%;
  height: 720px;
  background: ${props => props.theme.backgroundColor};
  border-radius: 12px;
  padding: 1.5rem;
`;

const DownloadButton = styled.button`
  padding: 0.25rem 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const COLORS = [
  '#667eea', '#764ba2', '#f093fb', '#f5576c',
  '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
  '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3',
  '#7a5af8'
];

type ColorScheme = 'purple-blue' | 'orange' | 'violet';

type DesignTheme = 'modern' | 'neon' | 'pastel' | 'dark' | 'minimal';

type ChartStyle = 'classic' | 'rounded' | 'sharp' | 'wave' | 'gradient' | 'neon-glow';

type FontSize = 'small' | 'medium' | 'large' | 'extra-large';

interface ChartStyleConfig {
  name: string;
  barRadius: [number, number, number, number];
  lineType: 'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter';
  lineStroke: number;
  dotSize: number;
  glowEffect: boolean;
  gradientType: 'linear' | 'radial' | 'multi';
  pieShape: 'full' | 'donut' | 'semi';
}

const CHART_STYLES: Record<ChartStyle, ChartStyleConfig> = {
  classic: {
    name: '클래식',
    barRadius: [8, 8, 0, 0],
    lineType: 'monotone',
    lineStroke: 2,
    dotSize: 4,
    glowEffect: false,
    gradientType: 'linear',
    pieShape: 'donut'
  },
  rounded: {
    name: '둥근형',
    barRadius: [25, 25, 0, 0],
    lineType: 'monotone',
    lineStroke: 4,
    dotSize: 8,
    glowEffect: false,
    gradientType: 'linear',
    pieShape: 'donut'
  },
  sharp: {
    name: '각진형',
    barRadius: [0, 0, 0, 0],
    lineType: 'linear',
    lineStroke: 3,
    dotSize: 6,
    glowEffect: false,
    gradientType: 'linear',
    pieShape: 'full'
  },
  wave: {
    name: '웨이브',
    barRadius: [15, 15, 0, 0],
    lineType: 'monotone',
    lineStroke: 5,
    dotSize: 10,
    glowEffect: false,
    gradientType: 'radial',
    pieShape: 'donut'
  },
  gradient: {
    name: '그라데이션',
    barRadius: [20, 20, 0, 0],
    lineType: 'monotone',
    lineStroke: 4,
    dotSize: 8,
    glowEffect: false,
    gradientType: 'multi',
    pieShape: 'donut'
  },
  'neon-glow': {
    name: '네온글로우',
    barRadius: [12, 12, 0, 0],
    lineType: 'monotone',
    lineStroke: 6,
    dotSize: 12,
    glowEffect: true,
    gradientType: 'radial',
    pieShape: 'donut'
  }
};

interface ChartTheme {
  name: string;
  backgroundColor: string;
  gridColor: string;
  textColor: string;
  tooltipStyle: any;
  barColors: {
    'purple-blue': [string, string];
    'orange': [string, string];
    'violet': [string, string];
  };
  lineColor: string;
  areaOpacity: number;
  shadow: string;
}

const CHART_THEMES: Record<DesignTheme, ChartTheme> = {
  modern: {
    name: '모던',
    backgroundColor: 'white',
    gridColor: '#e2e8f0',
    textColor: '#64748b',
    tooltipStyle: {
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    barColors: {
      'purple-blue': ['#667eea', '#764ba2'],
      'orange': ['#ffa726', '#ffcc80'],
      'violet': ['#7a5af8', '#a855f7']
    },
    lineColor: '#ef4444',
    areaOpacity: 0.8,
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  neon: {
    name: '네온',
    backgroundColor: '#0f0f23',
    gridColor: '#1a1a3e',
    textColor: '#a78bfa',
    tooltipStyle: {
      backgroundColor: '#1e1e3f',
      border: '1px solid #7c3aed',
      borderRadius: '8px',
      boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)',
      color: '#a78bfa'
    },
    barColors: {
      'purple-blue': ['#8b5cf6', '#3b82f6'],
      'orange': ['#f59e0b', '#ef4444'],
      'violet': ['#7a5af8', '#a855f7']
    },
    lineColor: '#10b981',
    areaOpacity: 0.6,
    shadow: '0 0 20px rgba(139, 92, 246, 0.3)'
  },
  pastel: {
    name: '파스텔',
    backgroundColor: '#fefce8',
    gridColor: '#fde047',
    textColor: '#65a30d',
    tooltipStyle: {
      backgroundColor: '#fef3c7',
      border: '1px solid #fde047',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(251, 191, 36, 0.2)',
      color: '#65a30d'
    },
    barColors: {
      'purple-blue': ['#c084fc', '#93c5fd'],
      'orange': ['#fbbf24', '#fb923c'],
      'violet': ['#7a5af8', '#c084fc']
    },
    lineColor: '#ec4899',
    areaOpacity: 0.5,
    shadow: '0 4px 6px -1px rgba(251, 191, 36, 0.2)'
  },
  dark: {
    name: '다크',
    backgroundColor: '#1f2937',
    gridColor: '#374151',
    textColor: '#d1d5db',
    tooltipStyle: {
      backgroundColor: '#111827',
      border: '1px solid #4b5563',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      color: '#d1d5db'
    },
    barColors: {
      'purple-blue': ['#6366f1', '#8b5cf6'],
      'orange': ['#f97316', '#fb923c'],
      'violet': ['#7a5af8', '#a855f7']
    },
    lineColor: '#06b6d4',
    areaOpacity: 0.7,
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
  },
  minimal: {
    name: '미니멀',
    backgroundColor: '#ffffff',
    gridColor: '#f1f5f9',
    textColor: '#1e293b',
    tooltipStyle: {
      backgroundColor: '#ffffff',
      border: '1px solid #cbd5e1',
      borderRadius: '4px',
      boxShadow: 'none',
      color: '#1e293b'
    },
    barColors: {
      'purple-blue': ['#334155', '#475569'],
      'orange': ['#0f172a', '#1e293b'],
      'violet': ['#7a5af8', '#334155']
    },
    lineColor: '#0f172a',
    areaOpacity: 0.3,
    shadow: 'none'
  }
};

interface ChartComponentProps {
  data: DataPoint[];
  barData?: DataPoint[];
  lineData?: DataPoint[];
  title: string;
  chartTitle: string;
  chartType: 'bar' | 'line' | 'pie' | 'area' | 'combo' | 'double-bar';
  onChartTypeChange: (type: 'bar' | 'line' | 'pie' | 'area' | 'combo' | 'double-bar') => void;
  colorScheme: ColorScheme;
  onColorSchemeChange: (scheme: ColorScheme) => void;
  designTheme: DesignTheme;
  onDesignThemeChange: (theme: DesignTheme) => void;
  chartStyle: ChartStyle;
  onChartStyleChange: (style: ChartStyle) => void;
  fontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
  barMeaning?: string;
  lineMeaning?: string;
}

export const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  barData,
  lineData,
  title,
  chartTitle,
  chartType,
  onChartTypeChange,
  colorScheme,
  onColorSchemeChange,
  designTheme,
  onDesignThemeChange,
  chartStyle,
  onChartStyleChange,
  fontSize,
  onFontSizeChange,
  barMeaning,
  lineMeaning
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const chartOnlyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (chartOnlyRef.current) {
      try {
        const canvas = await html2canvas(chartOnlyRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
        });
        
        const link = document.createElement('a');
        link.download = `chart-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('다운로드 중 오류 발생:', error);
      }
    }
  };
  const getFontSize = (size: FontSize) => {
    switch (size) {
      case 'small': return '10px';
      case 'medium': return '12px';
      case 'large': return '16px';
      case 'extra-large': return '20px';
      default: return '12px';
    }
  };

  const renderChart = (): React.ReactElement => {
    const theme = CHART_THEMES[designTheme];
    const style = CHART_STYLES[chartStyle];
    const fontSizeValue = getFontSize(fontSize);
    const chartData = data.map(item => ({
      name: item.name,
      value: item.value,
      innerValue: item.innerValue || 0
    }));

    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
              height={100}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
            />
            <Tooltip contentStyle={theme.tooltipStyle} />
            <Bar 
              dataKey="value" 
              fill={`url(#barGradient-${designTheme}-${colorScheme}-${chartStyle})`} 
              radius={style.barRadius}
              style={style.glowEffect ? { filter: 'drop-shadow(0 0 8px currentColor)' } : {}}
            >
              <LabelList dataKey="value" position="top" style={{ fill: theme.textColor, fontSize: fontSizeValue, fontWeight: '600' }} />
            </Bar>
            <defs>
              {style.gradientType === 'linear' && (
                <>
                  <linearGradient id={`barGradient-${designTheme}-purple-blue-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['purple-blue'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['purple-blue'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-orange-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['orange'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['orange'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-violet-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['violet'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['violet'][1]} />
                  </linearGradient>
                </>
              )}
              {style.gradientType === 'radial' && (
                <>
                  <radialGradient id={`barGradient-${designTheme}-purple-blue-${chartStyle}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme.barColors['purple-blue'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['purple-blue'][1]} />
                  </radialGradient>
                  <radialGradient id={`barGradient-${designTheme}-orange-${chartStyle}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme.barColors['orange'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['orange'][1]} />
                  </radialGradient>
                  <radialGradient id={`barGradient-${designTheme}-violet-${chartStyle}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme.barColors['violet'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['violet'][1]} />
                  </radialGradient>
                </>
              )}
              {style.gradientType === 'multi' && (
                <>
                  <linearGradient id={`barGradient-${designTheme}-purple-blue-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['purple-blue'][0]} />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor={theme.barColors['purple-blue'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-orange-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['orange'][0]} />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor={theme.barColors['orange'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-violet-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['violet'][0]} />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor={theme.barColors['violet'][1]} />
                  </linearGradient>
                </>
              )}
            </defs>
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
              height={100}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
            />
            <Tooltip contentStyle={theme.tooltipStyle} />
            <Line 
              type={style.lineType} 
              dataKey="value" 
              stroke={theme.lineColor} 
              strokeWidth={style.lineStroke}
              dot={{ fill: theme.lineColor, strokeWidth: 2, r: style.dotSize }}
              activeDot={{ r: style.dotSize + 2, fill: theme.barColors[colorScheme][0] }}
              style={style.glowEffect ? { filter: 'drop-shadow(0 0 6px currentColor)' } : {}}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
              height={100}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
            />
            <Tooltip contentStyle={theme.tooltipStyle} />
            <Area 
              type={style.lineType} 
              dataKey="value" 
              stroke={theme.lineColor} 
              fill={`url(#areaGradient-${designTheme}-${chartStyle})`}
              strokeWidth={style.lineStroke}
              style={style.glowEffect ? { filter: 'drop-shadow(0 0 6px currentColor)' } : {}}
            />
            <defs>
              {style.gradientType === 'linear' && (
                <linearGradient id={`areaGradient-${designTheme}-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.lineColor} stopOpacity={theme.areaOpacity} />
                  <stop offset="100%" stopColor={theme.lineColor} stopOpacity={0.1} />
                </linearGradient>
              )}
              {style.gradientType === 'radial' && (
                <radialGradient id={`areaGradient-${designTheme}-${chartStyle}`} cx="50%" cy="0%" r="100%">
                  <stop offset="0%" stopColor={theme.lineColor} stopOpacity={theme.areaOpacity} />
                  <stop offset="100%" stopColor={theme.lineColor} stopOpacity={0.1} />
                </radialGradient>
              )}
              {style.gradientType === 'multi' && (
                <linearGradient id={`areaGradient-${designTheme}-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.lineColor} stopOpacity={theme.areaOpacity} />
                  <stop offset="50%" stopColor={theme.barColors[colorScheme][0]} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={theme.lineColor} stopOpacity={0.1} />
                </linearGradient>
              )}
            </defs>
          </AreaChart>
        );

      case 'pie':
        const pieColors = designTheme === 'neon' ? 
          ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#7a5af8'] :
          designTheme === 'pastel' ?
          ['#c084fc', '#93c5fd', '#86efac', '#fbbf24', '#fb923c', '#f9a8d4', '#7a5af8'] :
          designTheme === 'dark' ?
          ['#6366f1', '#8b5cf6', '#06b6d4', '#f97316', '#ef4444', '#ec4899', '#7a5af8'] :
          COLORS;
        
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={style.pieShape === 'full' ? 0 : style.pieShape === 'donut' ? 60 : 40}
              paddingAngle={chartStyle === 'sharp' ? 0 : 2}
              dataKey="value"
              startAngle={style.pieShape === 'semi' ? 180 : 0}
              endAngle={style.pieShape === 'semi' ? 0 : 360}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={pieColors[index % pieColors.length]}
                  style={style.glowEffect ? { filter: 'drop-shadow(0 0 4px currentColor)' } : {}}
                />
              ))}
            </Pie>
            <Tooltip contentStyle={theme.tooltipStyle} />
            <Legend 
              wrapperStyle={{ fontSize: '14px', color: theme.textColor }}
            />
          </PieChart>
        );

      case 'combo':
        const comboData = (barData && lineData) ? 
          barData.map(barItem => {
            const lineItem = lineData.find(lineItem => lineItem.name === barItem.name);
            return {
              name: barItem.name,
              barValue: barItem.value,
              lineValue: lineItem ? lineItem.value : 0
            };
          }) : chartData.map(item => ({ name: item.name, barValue: item.value, lineValue: item.value }));

        return (
          <ComposedChart data={comboData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
              height={100}
              interval={0}
            />
            <YAxis 
              yAxisId="bar"
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
            />
            <YAxis 
              yAxisId="line"
              orientation="right"
              tick={{ fontSize: 12, fill: theme.lineColor }}
              axisLine={{ stroke: theme.lineColor }}
            />
            <Tooltip contentStyle={theme.tooltipStyle} />
            <Bar 
              yAxisId="bar"
              dataKey="barValue" 
              fill={`url(#barGradient-${designTheme}-${colorScheme}-${chartStyle})`} 
              radius={style.barRadius} 
              name={barMeaning || '막대'}
            >
              <LabelList dataKey="barValue" position="top" style={{ fill: theme.textColor, fontSize: fontSizeValue, fontWeight: '600' }} />
            </Bar>
            <Line 
              yAxisId="line"
              type={style.lineType} 
              dataKey="lineValue" 
              stroke={theme.lineColor} 
              strokeWidth={style.lineStroke}
              dot={{ fill: theme.lineColor, strokeWidth: 2, r: style.dotSize }}
              activeDot={{ r: style.dotSize + 2, fill: theme.barColors[colorScheme][1] }}
              name={lineMeaning || '선'}
            >
              <LabelList 
                dataKey="lineValue" 
                position="top" 
                offset={15}
                style={{ fill: '#000000', fontSize: fontSizeValue, fontWeight: '600' }} 
              />
            </Line>
            <Legend 
              wrapperStyle={{ fontSize: '14px', color: theme.textColor, paddingTop: '0px', marginTop: '0px' }}
            />
            <defs>
              {style.gradientType === 'linear' && (
                <>
                  <linearGradient id={`barGradient-${designTheme}-purple-blue-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['purple-blue'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['purple-blue'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-orange-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['orange'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['orange'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-violet-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['violet'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['violet'][1]} />
                  </linearGradient>
                </>
              )}
              {style.gradientType === 'radial' && (
                <>
                  <radialGradient id={`barGradient-${designTheme}-purple-blue-${chartStyle}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme.barColors['purple-blue'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['purple-blue'][1]} />
                  </radialGradient>
                  <radialGradient id={`barGradient-${designTheme}-orange-${chartStyle}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme.barColors['orange'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['orange'][1]} />
                  </radialGradient>
                  <radialGradient id={`barGradient-${designTheme}-violet-${chartStyle}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme.barColors['violet'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['violet'][1]} />
                  </radialGradient>
                </>
              )}
              {style.gradientType === 'multi' && (
                <>
                  <linearGradient id={`barGradient-${designTheme}-purple-blue-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['purple-blue'][0]} />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor={theme.barColors['purple-blue'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-orange-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['orange'][0]} />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor={theme.barColors['orange'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-violet-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['violet'][0]} />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor={theme.barColors['violet'][1]} />
                  </linearGradient>
                </>
              )}
            </defs>
          </ComposedChart>
        );

      case 'double-bar':
        const doubleBarData = chartData.map(item => ({
          name: item.name,
          outerValue: item.value - item.innerValue,
          innerValue: item.innerValue,
          totalValue: item.value
        }));
        
        return (
          <BarChart data={doubleBarData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
              height={100}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: fontSizeValue, fill: theme.textColor }}
              axisLine={{ stroke: theme.gridColor }}
            />
            <Tooltip 
              contentStyle={theme.tooltipStyle}
              formatter={(value, name) => {
                if (name === 'outerValue') return [value, '외부 값'];
                if (name === 'innerValue') return [value, '내부 값'];
                return [value, name];
              }}
            />
            <Bar 
              dataKey="outerValue" 
              stackId="stack"
              fill={`url(#barGradient-${designTheme}-${colorScheme}-${chartStyle})`} 
              radius={[0, 0, style.barRadius[2], style.barRadius[3]]}
            >
              <LabelList 
                dataKey="outerValue" 
                position="center" 
                style={{ fill: '#ffffff', fontSize: fontSizeValue, fontWeight: '600' }} 
              />
            </Bar>
            <Bar 
              dataKey="innerValue" 
              stackId="stack"
              fill={theme.barColors[colorScheme === 'purple-blue' ? 'orange' : colorScheme === 'orange' ? 'violet' : 'purple-blue'][0]} 
              radius={[style.barRadius[0], style.barRadius[1], 0, 0]}
            >
              <LabelList 
                dataKey="innerValue" 
                position="center" 
                style={{ fill: '#ffffff', fontSize: fontSizeValue, fontWeight: '600' }} 
              />
              <LabelList 
                dataKey="totalValue" 
                position="top" 
                style={{ fill: theme.textColor, fontSize: fontSizeValue, fontWeight: '600' }} 
              />
            </Bar>
            <defs>
              {style.gradientType === 'linear' && (
                <>
                  <linearGradient id={`barGradient-${designTheme}-purple-blue-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['purple-blue'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['purple-blue'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-orange-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['orange'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['orange'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-violet-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['violet'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['violet'][1]} />
                  </linearGradient>
                </>
              )}
              {style.gradientType === 'radial' && (
                <>
                  <radialGradient id={`barGradient-${designTheme}-purple-blue-${chartStyle}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme.barColors['purple-blue'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['purple-blue'][1]} />
                  </radialGradient>
                  <radialGradient id={`barGradient-${designTheme}-orange-${chartStyle}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme.barColors['orange'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['orange'][1]} />
                  </radialGradient>
                  <radialGradient id={`barGradient-${designTheme}-violet-${chartStyle}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={theme.barColors['violet'][0]} />
                    <stop offset="100%" stopColor={theme.barColors['violet'][1]} />
                  </radialGradient>
                </>
              )}
              {style.gradientType === 'multi' && (
                <>
                  <linearGradient id={`barGradient-${designTheme}-purple-blue-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['purple-blue'][0]} />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor={theme.barColors['purple-blue'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-orange-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['orange'][0]} />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor={theme.barColors['orange'][1]} />
                  </linearGradient>
                  <linearGradient id={`barGradient-${designTheme}-violet-${chartStyle}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.barColors['violet'][0]} />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor={theme.barColors['violet'][1]} />
                  </linearGradient>
                </>
              )}
            </defs>
          </BarChart>
        );

      default:
        return <div>차트 타입을 선택해주세요</div>;
    }
  };

  return (
    <ChartContainer theme={CHART_THEMES[designTheme]} ref={chartRef}>
      <ChartHeader>
        <ChartHeaderTitle textColor={CHART_THEMES[designTheme].textColor}>{title}</ChartHeaderTitle>
        <ControlsContainer>
          <ChartTypeSelector
            value={chartType}
            onChange={(e) => onChartTypeChange(e.target.value as 'bar' | 'line' | 'pie' | 'area' | 'combo' | 'double-bar')}
          >
            <option value="bar">막대 차트</option>
            <option value="line">선 차트</option>
            <option value="area">영역 차트</option>
            <option value="pie">원형 차트</option>
            <option value="combo">막대+선 차트</option>
            <option value="double-bar">이중막대 차트</option>
          </ChartTypeSelector>
          
          <DesignThemeSelector
            value={designTheme}
            onChange={(e) => onDesignThemeChange(e.target.value as DesignTheme)}
          >
            {Object.entries(CHART_THEMES).map(([key, theme]) => (
              <option key={key} value={key}>{theme.name}</option>
            ))}
          </DesignThemeSelector>

          <ChartStyleSelector
            value={chartStyle}
            onChange={(e) => onChartStyleChange(e.target.value as ChartStyle)}
          >
            {Object.entries(CHART_STYLES).map(([key, style]) => (
              <option key={key} value={key}>{style.name}</option>
            ))}
          </ChartStyleSelector>
          
          {(chartType === 'bar' || chartType === 'combo' || chartType === 'double-bar') && (
            <ColorSchemeSelector
              value={colorScheme}
              onChange={(e) => onColorSchemeChange(e.target.value as ColorScheme)}
            >
              <option value="purple-blue">보라-파랑</option>
              <option value="orange">오렌지</option>
              <option value="violet">바이올렛</option>
            </ColorSchemeSelector>
          )}
          
          <FontSizeSelector
            value={fontSize}
            onChange={(e) => onFontSizeChange(e.target.value as FontSize)}
          >
            <option value="small">글씨 작게</option>
            <option value="medium">글씨 보통</option>
            <option value="large">글씨 크게</option>
            <option value="extra-large">글씨 매우크게</option>
          </FontSizeSelector>
          
          <DownloadButton onClick={handleDownload}>📥 이미지 다운로드</DownloadButton>
        </ControlsContainer>
      </ChartHeader>
      <ChartWrapper>
        {chartTitle && (
          <ChartTitle textColor={CHART_THEMES[designTheme].textColor}>
            {chartTitle}
          </ChartTitle>
        )}
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </ChartWrapper>
      
      {/* 다운로드용 숨겨진 차트 */}
      <ChartOnlyWrapper 
        ref={chartOnlyRef} 
        theme={CHART_THEMES[designTheme]}
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
      >
        {chartTitle && (
          <ChartTitle textColor={CHART_THEMES[designTheme].textColor}>
            {chartTitle}
          </ChartTitle>
        )}
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </ChartOnlyWrapper>
    </ChartContainer>
  );
};