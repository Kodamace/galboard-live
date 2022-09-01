import { SpinnerIcon } from "@chakra-ui/icons";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { TOTAL_BALLS } from "../../../global/constants";
import {
  addNewGaltonBoardSection,
  dropBallFromBucketToNewGaltonBoardSection,
} from "../galtonSlice";
import {
  FillProgress,
  StyledBucket,
  StyledBucketWrapper,
  StyledInnerBucketContent,
} from "../styles";

interface IBucket {
  balls: number;
  indexOfSection: number;
  indexOfBucketToDropBalls: number;
}

const Bucket: React.FC<IBucket> = ({
  balls,
  indexOfSection,
  indexOfBucketToDropBalls,
}) => {
  const dispatch = useAppDispatch();

  const percentage = ((balls / TOTAL_BALLS) * 100).toFixed(2);

  const dropBall = async () => {
    await new Promise((res, rej) =>
      setTimeout(() => {
        dispatch(
          dropBallFromBucketToNewGaltonBoardSection({
            indexOfSection,
            indexOfBucketToDropBalls,
          })
        );
      }, 1)
    );
  };

  const dropAllBallsFromBucket = async () => {
    const promiseArray = Array(TOTAL_BALLS)
      .fill({})
      .map(async () => {
        await dropBall();
      });

    await Promise.all(promiseArray);
  };
  return (
    <StyledBucketWrapper>
      <StyledBucket
        onClick={() => {
          if (balls === 0) return;
          dispatch(
            addNewGaltonBoardSection({
              bucketsBalls: balls,
              indexOfSection,
            })
          );
          dropAllBallsFromBucket();
        }}
      >
        <StyledInnerBucketContent>
          <div>
            <SpinnerIcon /> {balls}
          </div>
          <FillProgress percentage={parseInt(percentage)} />
        </StyledInnerBucketContent>
      </StyledBucket>
      {percentage} %
    </StyledBucketWrapper>
  );
};

export default Bucket;
