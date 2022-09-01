import { SpinnerIcon } from "@chakra-ui/icons";
import React from "react";
import { TOTAL_BALLS } from "../../../../global/constants";
import { FillProgress } from "../../styles";
import { StyledBarFill, StyledBarOuter } from "./styles";

const Bar: React.FC<{ balls: number }> = ({ balls }) => {
  const percentage = ((balls / TOTAL_BALLS) * 100).toFixed(2);
  return (
    <StyledBarOuter>
      <StyledBarFill color="pink" percentage={parseInt(percentage)} />
    </StyledBarOuter>
  );
};

export default Bar;
