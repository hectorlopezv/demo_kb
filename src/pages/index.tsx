import Actions from "@/components/Actions";
import ChangeLocale from "@/components/ChangeLocale";
import SchemaBuilder from "@/components/SchemaBuilder";
import TableSchema from "@/components/TableSchema";
import VisualizeResult from "@/components/VisualizeResult";
import useFillInfo from "@/hooks/useFillInfo";
import useTable from "@/hooks/useTable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback, useEffect } from "react";
export default function Index(props: any) {
  const { data, result, setData, setVisualizeResult, setresult } = useTable();
  const {
    setclean,
    columname,
    columtype,
    decorators,
    setcolumname,
    setDecorators,
    setcolumtype,
    modelName,
    setModelName,
    setSetSchemas,
    schemas,
    clean,
  } = useFillInfo();
  const addRowHandler = useCallback(() => {
    setData((data) => [
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
  }, [
    columname,
    columtype,
    decorators,
    setData,
    setDecorators,
    setcolumname,
    setcolumtype,
  ]);
  const addSchemaHandler = useCallback(() => {
    let schema = `model ${modelName.slice(0, 1).toUpperCase()}${modelName.slice(
      1
    )}{ `;
    data.map((row) => {
      schema += `${row.columnname} ${row.type} ${row.decorators}\n `;
    });
    schema += `}`;
    setSetSchemas([...schemas, schema]);
    setData([]);
  }, [data, modelName, schemas, setData, setSetSchemas]);
  const visualizeSchemaHandler = () => {
    setVisualizeResult((predicate) => !predicate);
  };

  const fileHandler = useCallback(() => {
    if (result.length > 0) {
      const fileData = JSON.stringify(result);
      const data = new Blob([fileData], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(data);
      link.download = `prisma_schemas_${new Date().toString()}.txt`;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }, [result]);
  useEffect(() => {
    if (clean) {
      setcolumname("");
      setcolumtype("number");
      setModelName("");
      setDecorators("");
      setSetSchemas([]);
      setclean(false);
      setresult("");
    }
  }, [
    clean,
    setDecorators,
    setModelName,
    setSetSchemas,
    setclean,
    setcolumname,
    setcolumtype,
    setresult,
  ]);
  useEffect(() => {
    let result = ``;
    schemas.map((schema) => {
      result += `${schema} `;
    });
    setresult(result);
  }, [schemas, setresult]);
  return (
    <div className="text-sm md:text-base lg:text-lg">
      <ChangeLocale />
      <div className="flex gap-5 flex-col items-center justify-center p-4">
        <SchemaBuilder />
        <TableSchema />
        <Actions
          addSchemaHandler={addSchemaHandler}
          addRowHandler={addRowHandler}
          visualizeSchemaHandler={visualizeSchemaHandler}
          fileHandler={fileHandler}
        />
        <VisualizeResult />
      </div>
    </div>
  );
}

export async function getStaticProps({ locale = "en" }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
