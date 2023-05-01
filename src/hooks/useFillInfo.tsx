import { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
const useFillInfo = () => {
  const { t } = useTranslation("common");
  const [columname, setcolumname] = useState("");
  const [columtype, setcolumtype] = useState<"number" | "string" | "boolean">(
    "number"
  );
  const [modelName, setModelName] = useState("");
  const [decorators, setDecorators] = useState("");
  const [schemas, setSetSchemas] = useState<string[]>([]);
  const [clean, setclean] = useState(false);
  const options = useMemo(() => {
    return [
      { value: "number", label: t("number") ?? "" },
      { value: "string", label: t("string") ?? "" },
      { value: "boolean", label: t("boolean") ?? "" },
    ];
  }, [t]);
  return {
    columname,
    setcolumname,
    columtype,
    setcolumtype,
    modelName,
    setModelName,
    decorators,
    setDecorators,
    schemas,
    setSetSchemas,
    clean,
    options,
    setclean,
  };
};
export default useFillInfo;
