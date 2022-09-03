import { SpinnerIcon } from "@chakra-ui/icons";
import React from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { TOTAL_BALLS } from "../../../../global/constants";
import {
  addNewGaltonBoardSection,
  dropBallFromBucketToNewGaltonBoardSection,
} from "../../galtonSlice";
import {
  FillProgress,
  StyledBucket,
  StyledBucketWrapper,
  StyledInnerBucketContent,
} from "../../styles";

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
        res(1);
      }, 1)
    );
  };

  const dropAllBallsFromBucket = async () => {
    for (let i = 0; i < balls; i++) {
      await dropBall();
      dispatch(
        dropBallFromBucketToNewGaltonBoardSection({
          indexOfSection,
          indexOfBucketToDropBalls,
        })
      );
    }
  };
  return (
    <StyledBucketWrapper>
      <StyledBucket
        onClick={async () => {
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
