import useTable from "@/hooks/useTable";

const VisualizeResult = () => {
  const { result, visualizeResult } = useTable();
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
