import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "../table/useSortedTable";

const Table = ({ caption, data, columns }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      <table  className="min-w-full leading-normal">
        <caption>{caption}</caption>
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};

export default Table;
