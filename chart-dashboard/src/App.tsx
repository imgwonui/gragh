import React, { useState } from 'react';
import styled from 'styled-components';
import { DataTable } from './components/DataTable';
import { ComboDataTables } from './components/ComboDataTables';
import { ChartComponent } from './components/ChartComponent';
import { ChartTitleInput } from './components/ChartTitleInput';
import { DataPoint } from './types';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
`;

const MainContent = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  width: 95%;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const initialData: DataPoint[] = [
  { id: '1', name: '10건 이하', value: 15, innerValue: 5 },
  { id: '2', name: '11~50건', value: 23, innerValue: 8 },
  { id: '3', name: '51~100건', value: 18, innerValue: 12 },
  { id: '4', name: '101~300건', value: 12, innerValue: 7 },
  { id: '5', name: '301~500건', value: 8, innerValue: 3 },
  { id: '6', name: '501~1000건', value: 5, innerValue: 2 },
  { id: '7', name: '1000건 초과', value: 3, innerValue: 1 }
];

const initialBarData: DataPoint[] = [
  { id: '1', name: '10건 이하', value: 15 },
  { id: '2', name: '11~50건', value: 23 },
  { id: '3', name: '51~100건', value: 18 },
  { id: '4', name: '101~300건', value: 12 },
  { id: '5', name: '301~500건', value: 8 },
  { id: '6', name: '501~1000건', value: 5 },
  { id: '7', name: '1000건 초과', value: 3 }
];

const initialLineData: DataPoint[] = [
  { id: '1', name: '10건 이하', value: 180 },
  { id: '2', name: '11~50건', value: 720 },
  { id: '3', name: '51~100건', value: 1350 },
  { id: '4', name: '101~300건', value: 2400 },
  { id: '5', name: '301~500건', value: 3200 },
  { id: '6', name: '501~1000건', value: 3750 },
  { id: '7', name: '1000건 초과', value: 4500 }
];

function App() {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [barData, setBarData] = useState<DataPoint[]>(initialBarData);
  const [lineData, setLineData] = useState<DataPoint[]>(initialLineData);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie' | 'area' | 'combo' | 'double-bar'>('bar');
  const [colorScheme, setColorScheme] = useState<'purple-blue' | 'orange' | 'violet'>('purple-blue');
  const [designTheme, setDesignTheme] = useState<'modern' | 'neon' | 'pastel' | 'dark' | 'minimal'>('modern');
  const [chartStyle, setChartStyle] = useState<'classic' | 'rounded' | 'sharp' | 'wave' | 'gradient' | 'neon-glow'>('classic');
  const [barMeaning, setBarMeaning] = useState<string>('회사 수');
  const [lineMeaning, setLineMeaning] = useState<string>('발송 건수');
  const [chartTitle, setChartTitle] = useState<string>('데이터 차트');
  const [fontSize, setFontSize] = useState<number>(12);

  const handleBarDataChange = (newBarData: DataPoint[]) => {
    setBarData(newBarData);
    
    // 막대 데이터 변경시 선 데이터 동기화
    const syncedLineData = newBarData.map(barItem => {
      const existingLineItem = lineData.find(lineItem => lineItem.id === barItem.id);
      return existingLineItem ? 
        { ...existingLineItem, name: barItem.name } : 
        { id: barItem.id, name: barItem.name, value: 0 };
    });
    
    // 삭제된 항목 제거
    const filteredLineData = syncedLineData.filter(lineItem => 
      newBarData.some(barItem => barItem.id === lineItem.id)
    );
    
    setLineData(filteredLineData);
  };

  const handleLineDataChange = (newLineData: DataPoint[]) => {
    setLineData(newLineData);
  };

  return (
    <AppContainer>
      <Header>
        <Title>📊 보고서용 그래프 생성기</Title>
        <Subtitle>큼하하</Subtitle>
      </Header>
      
      <MainContent>
        <GridContainer>
          <Section>
            <ChartTitleInput
              title={chartTitle}
              onTitleChange={setChartTitle}
            />
            {chartType === 'combo' ? (
              <ComboDataTables
                barData={barData}
                lineData={lineData}
                onBarDataChange={handleBarDataChange}
                onLineDataChange={handleLineDataChange}
                barMeaning={barMeaning}
                lineMeaning={lineMeaning}
                onBarMeaningChange={setBarMeaning}
                onLineMeaningChange={setLineMeaning}
              />
            ) : (
              <DataTable
                data={data}
                onDataChange={setData}
                title="📝 데이터 테이블"
              />
            )}
          </Section>
          
          <Section>
            <ChartComponent
              data={data}
              barData={barData}
              lineData={lineData}
              title="📈 데이터 차트"
              chartTitle={chartTitle}
              chartType={chartType}
              onChartTypeChange={setChartType}
              colorScheme={colorScheme}
              onColorSchemeChange={setColorScheme}
              designTheme={designTheme}
              onDesignThemeChange={setDesignTheme}
              chartStyle={chartStyle}
              onChartStyleChange={setChartStyle}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              barMeaning={barMeaning}
              lineMeaning={lineMeaning}
            />
          </Section>
        </GridContainer>
      </MainContent>
    </AppContainer>
  );
}

export default App;
