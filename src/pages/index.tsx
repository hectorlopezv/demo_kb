import Actions from "@/components/Actions";
import ChangeLocale from "@/components/ChangeLocale";
import SchemaBuilder from "@/components/SchemaBuilder";
import TableSchema from "@/components/TableSchema";
import VisualizeResult from "@/components/VisualizeResult";
import useFillInfo from "@/hooks/useFillInfo";
import useTable from "@/hooks/useTable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
export default function Index(props: any) {
  const {
    data,
    result,
    setData,
    setVisualizeResult,
    setresult,
    schemas,
    setSetSchemas,
    table,
    visualizeResult,
  } = useTable();
  const {
    setReset,
    columname,
    columtype,
    decorators,
    setcolumname,
    setDecorators,
    setcolumtype,
    modelName,
    setModelName,
    reset,
    cleanFillInfo,
    options,
  } = useFillInfo();

  const addRowHandler = () => {
    if (columname === "") {
      toast.error("Column name is required");
      return;
    }
    if (decorators === "") {
      toast.error("Decorators is required");
      return;
    }

    //check for duplicate
    if (data.find((row) => row.columnname === columname)) {
      toast.error("Column name already exists");
      return;
    }

    setData((data) => [
      ...data,
      {
        columnname: columname,
        type: columtype,
        decorators: decorators,
      },
    ]);
    cleanFillInfo();
  };
  const addSchemaHandler = () => {
    const modelSchemaName = `${modelName
      .slice(0, 1)
      .toUpperCase()}${modelName.slice(1)}`;
    if (modelName === "") {
      toast.error("Model name is required");
      return;
    }
    if (schemas.find((schema) => schema.includes(modelSchemaName))) {
      toast.error("Model Name already exists");
      return;
    }
    let schema = `model ${modelSchemaName} { `;
    data.map((row) => {
      schema += `${row.columnname} ${row.type} ${row.decorators} \n `;
    });
    schema += `}`;
    setSetSchemas([...schemas, schema]);
    setData([]);
    cleanFillInfo();
  };
  const visualizeSchemaHandler = () => {
    setVisualizeResult((predicate) => !predicate);
  };

  const fileHandler = () => {
    if (result.length > 0) {
      const fileData = JSON.stringify(result);
      const data = new Blob([fileData], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(data);
      link.download = `prisma_schemas_${new Date().toString()}.txt`;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };
  useEffect(() => {
    if (reset) {
      cleanFillInfo();
      setReset(false);
      setSetSchemas([]);
      setresult("");
    }
  }, [
    reset,
    setDecorators,
    setModelName,
    setSetSchemas,
    setReset,
    setcolumname,
    setcolumtype,
    setresult,
    cleanFillInfo,
  ]);
  useEffect(() => {
    let result = ``;
    schemas.map((schema) => {
      result += `${schema} `;
    });

    setresult(result);
  }, [schemas, setresult]);
  return (
    <>
      <div className="text-sm md:text-base lg:text-lg">
        <ChangeLocale />
        <div className="flex gap-5 flex-col items-center justify-center p-4">
          <SchemaBuilder
            columname={columname}
            decorators={decorators}
            setcolumname={setcolumname}
            setDecorators={setDecorators}
            setcolumtype={setcolumtype}
            modelName={modelName}
            options={options}
            setModelName={setModelName}
          />
          <TableSchema data={data} table={table} />
          <Actions
            addSchemaHandler={addSchemaHandler}
            addRowHandler={addRowHandler}
            visualizeSchemaHandler={visualizeSchemaHandler}
            fileHandler={fileHandler}
          />
          <VisualizeResult result={result} visualizeResult={visualizeResult} />
        </div>
      </div>
      <ToastContainer />
    </>
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
