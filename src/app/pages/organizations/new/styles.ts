import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: anchor-center;
  padding: 24px;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: ${props => props.theme.formUserBackground};
  border-radius: 8px;
  padding: 24px;
`;

export const Title = styled.h1`
  color: ${props => props.theme.text};
  margin-bottom: 24px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const InputGroupSmall = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const Label = styled.label`
  color: ${props => props.theme.text};
  font-size: 14px;
`;

export const Input = styled.input`
  width: 95%;
  padding: 12px;
  background-color: ${props => props.theme.formUserInput};
  border: 1px solid ${props => props.theme.formUserBorder};
  border-radius: 10px;
  color: #8FB0CC;
  font-size: 14px;

  &::placeholder {
    color: #A0A0A0;
  }

  &:focus {
    outline: none;
    border-color: #1D9BF0;
  }
`;

export const InputSmall = styled.input`
  width: 90%;
  padding: 12px;
  background-color: ${props => props.theme.formUserInput};
  border: 1px solid ${props => props.theme.formUserBorder};
  border-radius: 6px;
  color: #8FB0CC;
  font-size: 14px;

  &::placeholder {
    color: #A0A0A0;
  }

  &:focus {
    outline: none;
    border-color: #1D9BF0;
  }
`;

export const InputRow = styled.div`
  display: flex;
  gap: 16px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1D9BF0;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background-color: #1A8CD8;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  top: 80px;
  left: 24px;
  z-index: 1;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  .icon {
    color: ${({ theme }) => theme.arrowBack};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`;
