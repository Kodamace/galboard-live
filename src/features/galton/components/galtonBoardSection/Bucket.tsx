import { SpinnerIcon } from "@chakra-ui/icons";
import React from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { BALL_SIZE, TOTAL_BALLS } from "../../../../global/constants";
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

  // This gets added to the job task que
  // !IMPORTANT the outer async it only gets added to the job task queue once
  // This is important because javascript has the ability to jump in and out side of async and generator functions
  // What happens in this case is js jumps in and out of function when the drop ball function is completed

  // Click dorp all once then it gets added to the queue and then runs what is inside it which is another async function
  //The async function then gets added to the queue as well and js will jump out of the dropAllBallsFromBucket function

  // QUEUE A
  // Queue 1
  // dropAllBallsFromBucket
  //  rest of synchronous code  but gets called multiple times within the same queue
  // QUEUE 2
  // dropBall
  // dropBall
  // dropBall
  // dropBall

  // JS WILL JUMP BETWEEN BOTH THESE

  // SEPARATE QUEUE B
  // Queue 1
  // dropAllBallsFromBucket
  //  rest of synchronous code  but gets called multiple times within the same queue
  // QUEUE 2
  // dropBall
  // dropBall
  // dropBall
  // dropBall
  // Code after drop ball does not get added to dropBalls queue
  // But the rest of the code below dropBall will belong same queue PARENT async function dropAllBallsFromBucket
  async function dropAllBallsFromBucket() {
    for (let i = 0; i < balls; i++) {
      // Promise
      await dropBall();
      dispatch(
        dropBallFromBucketToNewGaltonBoardSection({
          indexOfSection,
          indexOfBucketToDropBalls,
        })
      );
      // Gets added to the task queue
      // This Job task queues
      // setTimeout(() => {
      //   dispatch(
      //     dropBallFromBucketToNewGaltonBoardSection({
      //       indexOfSection,
      //       indexOfBucketToDropBalls,
      //     })
      //   );
      // }, 1);
      // passing a callback to set time out
      // it will take the call back and add it to the job task queue get executed differently to synchronous code
      // This will create 100s of setTimeouts and the call backs in the set time out their execution will get deferred to th job task queue
      // Which means the js runtime engine will only execute when it gets to a certain jobtask queue
      // What happens with a promise vs set time out
    }
  }
  const bucketHeight = showBallsMode ? (TOTAL_BALLS / 100) * 2 : 240;
  const ballsView = Math.floor(ballSize === 5 ? balls : balls / (ballSize / 2));
  const bucketHeightPercentage = showBallsMode
    ? (balls / bucketHeight) * ballSize
    : // : (balls / bucketHeight) * 100;
      (balls / (bucketHeight * 5)) * 100;
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
