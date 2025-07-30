import React from 'react';
import styled from 'styled-components';
import { DataTable } from './DataTable';
import { DataPoint } from '../types';

const ComboTablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TableSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeaningInputContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const MeaningInputHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 1.5rem;
  margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  border-radius: 12px 12px 0 0;
  font-weight: 600;
  font-size: 1.1rem;
`;

const MeaningInputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const MeaningInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MeaningLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const MeaningInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

interface ComboDataTablesProps {
  barData: DataPoint[];
  lineData: DataPoint[];
  onBarDataChange: (data: DataPoint[]) => void;
  onLineDataChange: (data: DataPoint[]) => void;
  barMeaning: string;
  lineMeaning: string;
  onBarMeaningChange: (meaning: string) => void;
  onLineMeaningChange: (meaning: string) => void;
}

export const ComboDataTables: React.FC<ComboDataTablesProps> = ({
  barData,
  lineData,
  onBarDataChange,
  onLineDataChange,
  barMeaning,
  lineMeaning,
  onBarMeaningChange,
  onLineMeaningChange
}) => {
  return (
    <ComboTablesContainer>
      <MeaningInputContainer>
        <MeaningInputHeader>📋 그래프 의미 설정</MeaningInputHeader>
        <MeaningInputGrid>
          <MeaningInputGroup>
            <MeaningLabel>막대그래프 의미</MeaningLabel>
            <MeaningInput
              value={barMeaning}
              onChange={(e) => onBarMeaningChange(e.target.value)}
              placeholder="예: 실제 매출, 현재 값 등"
            />
          </MeaningInputGroup>
          <MeaningInputGroup>
            <MeaningLabel>선그래프 의미</MeaningLabel>
            <MeaningInput
              value={lineMeaning}
              onChange={(e) => onLineMeaningChange(e.target.value)}
              placeholder="예: 목표 매출, 예상 값 등"
            />
          </MeaningInputGroup>
        </MeaningInputGrid>
      </MeaningInputContainer>

      <TableSection>
        <DataTable
          data={barData}
          onDataChange={onBarDataChange}
          title={`📊 막대 데이터 (${barMeaning})`}
        />
      </TableSection>
      
      <TableSection>
        <DataTable
          data={lineData}
          onDataChange={onLineDataChange}
          title={`📈 선 데이터 (${lineMeaning})`}
        />
      </TableSection>
    </ComboTablesContainer>
  );
};