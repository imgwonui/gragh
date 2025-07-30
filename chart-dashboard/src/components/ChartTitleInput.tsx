import React from 'react';
import styled from 'styled-components';

const TitleInputContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TitleInputHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 1.5rem;
  margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  border-radius: 12px 12px 0 0;
  font-weight: 600;
  font-size: 1.1rem;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  font-family: 'Pretendard', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

interface ChartTitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
}

export const ChartTitleInput: React.FC<ChartTitleInputProps> = ({
  title,
  onTitleChange
}) => {
  return (
    <TitleInputContainer>
      <TitleInputHeader>📈 차트 제목 설정</TitleInputHeader>
      <TitleInput
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="차트 제목을 입력하세요"
      />
    </TitleInputContainer>
  );
};