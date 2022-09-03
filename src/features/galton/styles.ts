import styled from "styled-components";

export const StyledGaltonBoardWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledBucketsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid;
`;
export const StyledBucketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledBucket = styled.div<{
  showBallsMode: boolean;
  height: number;
}>`
  height: ${({ height }) => height}px;
  width: 100px;
  border: 1px solid;
  display: flex;
  align-items: flex-end;
  margin: 0px 8px;
  border-radius: 0px 0px 12px 12px;
  overflow: hidden;
  :hover {
    cursor: pointer;
    border-color: turquoise;
    width: 105px;
  }
`;

export const FillProgress = styled.div<{ percentage: number }>`
  height: ${({ percentage }) => percentage}px;
  width: 100%;
  border-collapse: collapse;
  background-color: purple;
  border-left: 1px solid;
  border-right: 1px solid;
  text-align: center;
`;

export const StyledInnerBucketContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
