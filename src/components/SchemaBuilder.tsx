import useFillInfo from "@/hooks/useFillInfo";
import { useTranslation } from "next-i18next";
import { useId } from "react";
import Select from "react-select";
const SchemaBuilder = () => {
  const { t } = useTranslation("common");
  const {
    columname,
    decorators,
    setcolumname,
    setDecorators,
    setcolumtype,
    modelName,
    options,
    setModelName,
  } = useFillInfo();

  return (
    <>
      <div className="flex gap-2 flex-wrap w-full items-center justify-center">
        <div className="p-1 flex flex-col gap-1 w-full md:w-2/5 lg:w-3/5">
          <label htmlFor="modelName" className="text-center">
            {t("modelName")}
          </label>
          <input
            aria-label="Model Name"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            onChange={(e) => setModelName(e.target.value)}
            value={modelName}
            id="modelName"
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap w-full tems-center justify-center">
        <div className="flex gap-2 items-center justify-center flex-wrap w-full md:w-2/5 lg:w-3/5">
          <div className="p-1 flex flex-col gap-1 w-full">
            <label htmlFor="columnName" className="text-center">
              {t("columnName")}
            </label>
            <input
              aria-label="Column Name"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              onChange={(e) => setcolumname(e.target.value)}
              value={columname}
              id="columnName"
            />
          </div>
          <div className="p-1 flex flex-col gap-1 w-full">
            <div className="text-center">{t("type")}</div>
            <Select
              instanceId={useId()}
              aria-label="select types"
              options={options}
              placeholder={t("select")}
              onChange={(e) =>
                setcolumtype(e?.value as "number" | "string" | "boolean")
              }
              styles={{
                container: (base) => ({
                  ...base,

                  height: "42px",
                }),
                control: (base) => ({
                  ...base,

                  height: "42px",
                }),
              }}
            />
          </div>
          <div className="p-1 flex flex-col gap-1 w-full">
            <label htmlFor="decorators" className="text-center">
              {t("decorators")}
            </label>
            <input
              aria-label="Decorators"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              onChange={(e) => setDecorators(e.target.value)}
              value={decorators}
              id="decorators"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SchemaBuilder;
