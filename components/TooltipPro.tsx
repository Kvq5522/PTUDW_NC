import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface tooltipProps {
  children: React.ReactNode;
  description: string;
  classname?: string;
}

const TooltipPro = (props: tooltipProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild className={props.classname}>{props.children}</TooltipTrigger>
        <TooltipContent>{props.description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipPro;
