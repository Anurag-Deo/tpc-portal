const TableBody = ({ tableData, columns }) => {
    return (
      <tbody>
        {tableData.map((data) => {
          return (
            <tr  key={data.id}>
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? data[accessor] : "——";
                return <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900 whitespace-no-wrap" key={accessor}>{tData}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };
  
  export default TableBody;