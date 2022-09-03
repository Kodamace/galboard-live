import React, { useEffect } from "react";
import { Heading, Spinner } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  dropBallForFirstHistoGramToBucket,
  getGaltonBoardSections,
  getHistogramOfFirstGaltonBoardSection,
} from "./galtonSlice";
import { StyledGaltonBoardWrapper } from "./styles";
import { TOTAL_BALLS } from "../../global/constants";
import Histogram from "./components/histogram/Histogram";
import GaltonBoardSection from "./components/galtonBoardSection/GaltonBoardSection";
let firstRender = true;

interface IGaltonBoard {}

const GaltonBoard: React.FC<IGaltonBoard> = () => {
  const galtonBoardSections = useAppSelector(getGaltonBoardSections);
  const histogramOfFirstGaltonBoard = useAppSelector(
    getHistogramOfFirstGaltonBoardSection
  );

  const dispatch = useAppDispatch();

  const dropBall = () => {
    return new Promise((res, rej) =>
      setTimeout(() => {
        res(1);
      }, 1)
    );
  };

  const startFirstGaltonBoardSection = async () => {
    for (let i = 0; i < TOTAL_BALLS; i++) {
      await dropBall();
      dispatch(dropBallForFirstHistoGramToBucket());
    }
  };

  useEffect(() => {
    if (firstRender) {
      startFirstGaltonBoardSection();
      firstRender = false;
    }
    return () => {};
  });

  return (
    <StyledGaltonBoardWrapper>
      <Heading>Galton Board Stack</Heading>
      {histogramOfFirstGaltonBoard.status === "loading" && (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Heading>Loading histogram...</Heading>
        </>
      )}
      {histogramOfFirstGaltonBoard.status !== "loading" && (
        <Histogram histogramOfFirstGaltonBoard={histogramOfFirstGaltonBoard} />
      )}
      {galtonBoardSections.map((galtonBoardSection, galtonBoardIndex) => {
        return (
          <GaltonBoardSection
            key={galtonBoardIndex}
            data={galtonBoardSection}
            galtonBoardIndex={galtonBoardIndex}
          />
        );
      })}
    </StyledGaltonBoardWrapper>
  );
};

export default GaltonBoard;
