import useFillInfo from "@/hooks/useFillInfo";
import useTable from "@/hooks/useTable";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { AiOutlineDownload, AiOutlinePlusCircle } from "react-icons/ai";
interface ActionI {
  addSchemaHandler: () => void;
  addRowHandler: () => void;
  visualizeSchemaHandler: () => void;
  fileHandler: () => void;
}
const Actions: FC<ActionI> = ({
  addSchemaHandler,
  addRowHandler,
  visualizeSchemaHandler,
  fileHandler,
}) => {
  const { t } = useTranslation("common");
  const {
    columname,
    columtype,
    decorators,
    setcolumname,
    setDecorators,
    setcolumtype,
    setReset,
  } = useFillInfo();
  const { data, setData } = useTable();
  return (
    <div className="flex gap-8 items-center justify-center flex-wrap">
      <div>
        <button onClick={() => setReset(true)}>
          <div className="flex flex-col items-center justify-center">
            <p className="min-w-max">{t("reset")}</p>
            <AiOutlinePlusCircle size={24} />
          </div>
        </button>
      </div>
      <div>
        <button onClick={addSchemaHandler}>
          <div className="flex flex-col items-center justify-center">
            <p className="min-w-max">{t("add_schema")}</p>
            <AiOutlinePlusCircle size={24} />
          </div>
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setData([
              ...data,
              {
                columnname: columname,
                type: columtype,
                decorators: decorators,
              },
            ]);
            setcolumname("");
            setcolumtype("number");
            setDecorators("");
          }}
        >
          <div
            className="flex flex-col items-center justify-center"
            onClick={addRowHandler}
          >
            <p>{t("add_row")}</p>
            <AiOutlinePlusCircle size={24} />
          </div>
        </button>
      </div>

      <div>
        <button onClick={visualizeSchemaHandler}>
          <div className="flex flex-col items-center justify-center">
            <p className="min-w-max">{t("visualize_result")}</p>
            <AiOutlinePlusCircle size={24} />
          </div>
        </button>
      </div>

      <div>
        <button onClick={fileHandler}>
          <div className="flex flex-col items-center justify-center">
            <p className="min-w-max">{t("download")}</p>
            <AiOutlineDownload size={24} />
          </div>
        </button>
      </div>
    </div>
  );
};
export default Actions;
