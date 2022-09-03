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
  showBallsMode: any;
  ballSize: number;
}

const Bucket: React.FC<IBucket> = ({
  balls,
  indexOfSection,
  indexOfBucketToDropBalls,
  showBallsMode,
  ballSize,
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

  async function dropAllBallsFromBucket() {
    for (let i = 0; i < balls; i++) {
      await dropBall();
      dispatch(
        dropBallFromBucketToNewGaltonBoardSection({
          indexOfSection,
          indexOfBucketToDropBalls,
        })
      );
    }
  }
  const bucketHeight = showBallsMode ? (TOTAL_BALLS / 100) * 2 : 240;
  const ballsView = Math.floor(ballSize === 5 ? balls : balls / (ballSize / 2));
  const bucketHeightPercentage = showBallsMode
    ? (balls / bucketHeight) * ballSize
    : (balls / (bucketHeight * 5)) * 100;
  return (
    <StyledBucketWrapper>
      <StyledBucket
        height={bucketHeight}
        showBallsMode={showBallsMode}
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
          <div style={{ position: "sticky", top: 0 }}>
            <SpinnerIcon /> {balls}
          </div>
          {!showBallsMode && (
            <FillProgress percentage={bucketHeightPercentage} />
          )}
          <div
            style={{
              width: "150px",
              display: "flex",
              flexWrap: "wrap-reverse",
            }}
          >
            {showBallsMode && (
              <>
                {Array(ballsView)
                  .fill(
                    <span
                      style={{
                        width: ballSize,
                        height: ballSize,
                        backgroundColor: "purple",
                        borderRadius: 33,
                      }}
                    />
                  )
                  .map((ball) => ball)}
              </>
            )}
          </div>
        </StyledInnerBucketContent>
      </StyledBucket>
      {percentage} %
    </StyledBucketWrapper>
  );
};

export default Bucket;
