import React from 'react';
import { TooltipContainer, TooltipText } from './tooltip.styles';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipText>{text}</TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
