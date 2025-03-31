import styled from 'styled-components';

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
`;

export const TooltipText = styled.span`
  visibility: hidden;
  background-color: ${({theme}) => theme.tooltip};
  color: ${({theme}) => theme.text};
  text-align: center;
  padding: 8px 12px;
  border-radius: 6px;
  position: absolute;
  z-index: 9999;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${({theme}) => theme.tooltip} transparent;
  }

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
