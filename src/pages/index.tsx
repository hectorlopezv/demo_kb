import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useId, useMemo, useState } from "react";
import { AiOutlineDownload, AiOutlinePlusCircle } from "react-icons/ai";
import Select from "react-select";
export default function Index(props: any) {
  const [columname, setcolumname] = useState("");
  const [columtype, setcolumtype] = useState<"number" | "string" | "boolean">(
    "number"
  );
  const [modelName, setModelName] = useState("");
  const [decorators, setDecorators] = useState("");
  const [schemas, setSetSchemas] = useState<string[]>([]);
  const [clean, setclean] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");
  const changeTo = router.locale === "en" ? "es" : "en";
  const options = useMemo(() => {
    return [
      { value: "number", label: t("number") ?? "" },
      { value: "string", label: t("string") ?? "" },
      { value: "boolean", label: t("boolean") ?? "" },
    ];
  }, [t]);
  type SchemaType = {
    columnname: string;
    type: "number" | "string" | "boolean";
    decorators: string;
  };

  const defaultData: SchemaType[] = [];

  const columnHelper = createColumnHelper<SchemaType>();

  const columns = [
    columnHelper.accessor("columnname", {
      header: () => t("columnName"),
      footer: () => null,
      cell: (info: { getValue: () => any }) => info.getValue(),
    }),

    columnHelper.accessor("type", {
      header: () => t("type"),
      footer: () => null,
      cell: (info: { getValue: () => any }) => info.getValue(),
    }),
    columnHelper.accessor("decorators", {
      header: () => t("decorators"),
      footer: () => null,
      cell: (info: { getValue: () => any }) => info.getValue(),
    }),
  ];
  const [data, setData] = useState(() => [...defaultData]);
  const [result, setresult] = useState(``);
  const [visualizeResult, setVisualizeResult] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableExpanding: true,
  });

  const addRowHandler = () => {
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
  };
  const addSchemaHandler = () => {
    let schema = `model ${modelName.slice(0, 1).toUpperCase()}${modelName.slice(
      1
    )}{ `;
    data.map((row) => {
      schema += `${row.columnname} ${row.type} ${row.decorators}\n `;
    });
    schema += `}`;
    setSetSchemas([...schemas, schema]);
    setData([]);
  };
  const visualizeSchemaHandler = () => {
    setVisualizeResult((predicate) => !predicate);
  };
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
  }, [clean]);
  useEffect(() => {
    let result = ``;
    schemas.map((schema) => {
      result += `${schema} `;
    });
    setresult(result);
  }, [schemas]);

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

  return (
    <div className="text-sm md:text-base lg:text-lg">
      <Head>
        <title>My page title</title>
      </Head>
      <div className="pl-2 pt-6">
        <Link
          href="/"
          locale={changeTo}
          className="border px-1 py-2 rounded border-black"
        >
          <button>{t("change_locale")}</button>
        </Link>
      </div>
      <div className="flex gap-5 flex-col items-center justify-center p-4">
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

        <div className="flex items-center justify-center mt-5">
          {data.length > 0 ? (
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
        <div className="flex gap-8 items-center justify-center flex-wrap">
          <div>
            <button onClick={() => setclean(true)}>
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
        {visualizeResult && result.length > 0 ? (
          <div>
            <span>{JSON.stringify(result)}</span>
          </div>
        ) : null}
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
