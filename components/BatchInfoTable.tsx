import { Batch } from "@/lib/db-context";
import { Box } from "./ui/box";
import { Table, TableBody, TableData, TableHead, TableRow } from "./ui/table";

const tableHeadClasses =
  "bg-background-50 border-0 border-solid border-r border-outline-200 font-medium";

const BatchInfoTable = ({ batch }: { batch: Batch }) => {
  const tableData = [
    {
      label: "Initial Volume",
      value: batch?.initialVolume,
    },
    {
      label: "Final Volume",
      value: batch?.finalVolume,
    },
    {
      label: "ABV",
      value: batch?.abv,
    },
    {
      label: "Rating",
      value:
        "★".repeat(batch?.rating ?? 0) + "☆".repeat(5 - (batch?.rating ?? 0)), // TODO: make a rating component and also replace the rating package.
    },
  ];

  return (
    <Box className="border border-solid border-outline-200 rounded-lg overflow-hidden w-full">
      <Table className="w-full">
        <TableBody>
          {tableData.map((item, index) => {
            const isLast = index === tableData.length - 1;
            return (
              <TableRow key={item.label} className={isLast ? "border-b-0" : ""}>
                <TableHead className={tableHeadClasses}>{item.label}</TableHead>
                <TableData>{item.value}</TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default BatchInfoTable;
