import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

export const LogoIcon = styled.img`
  width: 300px;
  height: 150px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 240px;
    height: 240px;
  }
`;

export const TextContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.size.md};
`;

export const MainText = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.primary};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const ButtonContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.size.md};
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  border: 2px solid transparent;
  border-radius: 8px;
  padding: ${({ theme }) => `${theme.size.sm} ${theme.size.lg}`};
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.primary};
    border: 2px solid ${({ theme }) => theme.color.primary};
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 18px;
    font-size: 13px;
  }
`;

export const PersonImage = styled.img`
  width: 90%;
  height: auto;
  object-fit: contain;
`;

export const ImageContainer = styled.div`
  margin-top: ${({ theme }) => theme.size.sm};
  max-width: 210px;
  width: 100%;
`;
