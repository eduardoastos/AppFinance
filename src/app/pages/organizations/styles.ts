import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  overflow-x: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  color: ${props => props.theme.text};
  margin: 0;
`;

export const AddButton = styled.button`
width: 205px;
  height: 45px;
  background-color: #1D9BF0;
  color: white;
  border-radius: 10px;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1A8CD8;
  }
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.usersDivBackground};
  padding: 16px;
  border-radius: 10px;
  color: ${props => props.theme.text};
  font-size: 16px;
  font-weight: 500;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: opacity 0.2s;

  .icon {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const EditButton = styled(IconButton)`
  color: #1D9BF0;
`;

export const DeleteButton = styled(IconButton)`
  color: #F91880;
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

export const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const DeleteModalContent = styled.div`
  background-color: ${({theme}) => theme.deleteModalBackground};
  border-radius: 8px;
  border: 1px solid ${({theme}) => theme.deleteModalBorder};
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  h3 {
    color: ${({theme}) => theme.error};
    margin-bottom: 16px;
  }
  
  p {
    margin-bottom: 24px;
    line-height: 1.5;
  }
`;

export const DeleteModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.border};
  background-color: ${({theme}) => theme.backgroundCancelButtonDeleteModal};
  color: ${({theme}) => theme.text};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({theme}) => theme.hoverCancelButtonDeleteModal};
  }
`;

export const ConfirmButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: ${({theme}) => theme.backgroundConfirmButtonDeleteModal};
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({theme}) => theme.hoverConfirmButtonDeleteModal};
  }
`;