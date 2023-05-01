const VisualizeResult = ({
  result,
  visualizeResult,
}: {
  result: string;
  visualizeResult: boolean;
}) => {
  return (
    <>
      {visualizeResult && result.length > 0 ? (
        <div>
          <span>{JSON.stringify(result, null, "\n")}</span>
        </div>
      ) : null}
    </>
  );
};
export default VisualizeResult;
