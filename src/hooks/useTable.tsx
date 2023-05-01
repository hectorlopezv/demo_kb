import { SchemaType } from "@/utils";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const useTable = () => {
  const { t } = useTranslation("common");
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
  const [visualizeResult, setVisualizeResult] = useState(true);
  const [schemas, setSetSchemas] = useState<string[]>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableExpanding: true,
  });

  return {
    table,
    data,
    setData,
    result,
    setresult,
    visualizeResult,
    setVisualizeResult,
    schemas,
    setSetSchemas,
  };
};
export default useTable;
