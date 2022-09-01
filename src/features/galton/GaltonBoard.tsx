import React, { Fragment, useEffect, useState } from "react";
import { Heading, Spinner } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Bucket from "./components/Bucket";
import {
  dropBallToBucket,
  getGaltonBoardSections,
  getHistogramOfFirstGaltonBoardSection,
  saveHistogramOfFirstGaltonBoard,
} from "./galtonSlice";
import { StyledBucketsWrapper, StyledGaltonBoardWrapper } from "./styles";
import { TOTAL_BALLS } from "../../global/constants";
import Histogram from "./components/histogram/Histogram";
import GaltonBoardSection from "./components/galtonBoardSection/GaltonBoardSection";

interface IGaltonBoard {}

const GaltonBoard: React.FC<IGaltonBoard> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const galtonBoardSections = useAppSelector(getGaltonBoardSections);
  const histogramOfFirstGaltonBoard = useAppSelector(
    getHistogramOfFirstGaltonBoardSection
  );

  const dispatch = useAppDispatch();

  const dropBall = () => {
    return new Promise((res, rej) =>
      setTimeout(() => {
        res(dispatch(dropBallToBucket()));
      }, 1)
    );
  };

  const startFirstGaltonBoardSection = async () => {
    setIsLoading(true);
    await Promise.all(
      Array(TOTAL_BALLS)
        .fill({})
        .map(async () => {
          await dropBall();
        })
    );
    dispatch(saveHistogramOfFirstGaltonBoard());
    setIsLoading(false);
  };

  useEffect(() => {
    startFirstGaltonBoardSection();

    return () => {};
  }, []);

  return (
    <StyledGaltonBoardWrapper>
      <Heading>Galton Board Stack</Heading>
      {isLoading && (
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
      {!isLoading && (
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
