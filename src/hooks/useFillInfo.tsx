import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
const useFillInfo = () => {
  const { t } = useTranslation("common");
  const [columname, setcolumname] = useState("");
  const [columtype, setcolumtype] = useState<"number" | "string" | "boolean">(
    "number"
  );
  const [modelName, setModelName] = useState("");
  const [decorators, setDecorators] = useState("");

  const [reset, setReset] = useState(false);
  const options = useMemo(() => {
    return [
      { value: "number", label: t("number") ?? "" },
      { value: "string", label: t("string") ?? "" },
      { value: "boolean", label: t("boolean") ?? "" },
    ];
  }, [t]);
  const cleanFillInfo = () => {
    setModelName("");
    setcolumname("");
    setcolumtype("number");
    setDecorators("");
  };
  return {
    columname,
    setcolumname,
    columtype,
    setcolumtype,
    modelName,
    setModelName,
    decorators,
    setDecorators,
    reset,
    options,
    cleanFillInfo,
    setReset,
  };
};
export default useFillInfo;
