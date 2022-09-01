import { Heading } from "@chakra-ui/react";
import React from "react";
import { TOTAL_BALLS } from "../../../../global/constants";
import { IGaltonBoardSection } from "../../galtonSlice";
import Bar from "./Bar";
import BarLeftSide from "./BarLeftSide";
import {
  StyledBarContent,
  StyledBarsOuter,
  StyledBarWrapper,
  StyledHistogram,
} from "./styles";

const Histogram: React.FC<{
  histogramOfFirstGaltonBoard: IGaltonBoardSection;
}> = ({ histogramOfFirstGaltonBoard }) => {
  return (
    <StyledHistogram>
      <Heading>Histogram Of First Galton Board</Heading>

      <Heading size="sm">Balls Spread out in buckets</Heading>
      {histogramOfFirstGaltonBoard.buckets.reduce(
        (acc, curr) => (acc += curr.balls),
        0
      )}
      <StyledBarWrapper>
        <BarLeftSide />
        <StyledBarsOuter>
          <StyledBarContent>
            <tr>
              {histogramOfFirstGaltonBoard.buckets.map(({ balls }, i) => (
                <Bar key={i} balls={balls} />
              ))}
            </tr>
            <tr>
              {histogramOfFirstGaltonBoard.buckets.map(({ balls }, i) => (
                <td key={i} align="center">
                  {((balls / TOTAL_BALLS) * 100).toFixed(2)}
                </td>
              ))}
            </tr>
          </StyledBarContent>
        </StyledBarsOuter>
      </StyledBarWrapper>
      <Heading textAlign="center" size="sm">
        Percentage %
      </Heading>
    </StyledHistogram>
  );
};

export default Histogram;
