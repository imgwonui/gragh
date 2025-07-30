import React, { useState } from 'react';
import styled from 'styled-components';
import { DataPoint } from '../types';

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

const TableHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: #f8fafc;
`;

const TableRow = styled.tr`
  &:hover {
    background: #f1f5f9;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
`;

const TableHeader2 = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #334155;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
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

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  font-size: 1.2rem;
  min-width: auto;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const AddRowContainer = styled.div`
  padding: 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const AddRowForm = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
`;

interface DataTableProps {
  data: DataPoint[];
  onDataChange: (data: DataPoint[]) => void;
  title: string;
}

export const DataTable: React.FC<DataTableProps> = ({ data, onDataChange, title }) => {
  const [newRow, setNewRow] = useState({ name: '', value: '', innerValue: '' });

  const handleCellChange = (id: string, field: keyof DataPoint, value: string | number) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onDataChange(updatedData);
  };

  const handleAddRow = () => {
    if (newRow.name && newRow.value) {
      const newDataPoint: DataPoint = {
        id: Date.now().toString(),
        name: newRow.name,
        value: parseFloat(newRow.value) || 0,
        innerValue: parseFloat(newRow.innerValue) || 0
      };
      onDataChange([...data, newDataPoint]);
      setNewRow({ name: '', value: '', innerValue: '' });
    }
  };

  const handleDeleteRow = (id: string) => {
    onDataChange(data.filter(item => item.id !== id));
  };

  return (
    <TableContainer>
      <TableHeader>{title}</TableHeader>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeader2>이름</TableHeader2>
            <TableHeader2>전체 값</TableHeader2>
            <TableHeader2>내부 값</TableHeader2>
            <TableHeader2>작업</TableHeader2>
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Input
                  value={item.name}
                  onChange={(e) => handleCellChange(item.id, 'name', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => handleCellChange(item.id, 'value', parseFloat(e.target.value) || 0)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.innerValue || 0}
                  onChange={(e) => handleCellChange(item.id, 'innerValue', parseFloat(e.target.value) || 0)}
                />
              </TableCell>
              <TableCell>
                <DeleteButton onClick={() => handleDeleteRow(item.id)}>
                  🗑️
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      <AddRowContainer>
        <AddRowForm>
          <Input
            placeholder="항목 이름"
            value={newRow.name}
            onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
          />
          <Input
            type="number"
            placeholder="전체 값"
            value={newRow.value}
            onChange={(e) => setNewRow({ ...newRow, value: e.target.value })}
          />
          <Input
            type="number"
            placeholder="내부 값"
            value={newRow.innerValue}
            onChange={(e) => setNewRow({ ...newRow, innerValue: e.target.value })}
          />
          <Button onClick={handleAddRow}>추가</Button>
        </AddRowForm>
      </AddRowContainer>
    </TableContainer>
  );
};