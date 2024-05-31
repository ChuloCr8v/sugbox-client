import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";

const TableComponent = (props: {
  loading?: boolean;
  data: readonly AnyObject[];
  columns: Array<object>;
  pageSize?: number;
  onRow?: any;
}) => {
  return (
    <Table
      loading={props.loading}
      pagination={{ pageSize: props.pageSize }}
      columns={props.columns}
      dataSource={props.data}
      onRow={props.onRow}
      className="border-gray-200 border rounded !shadow-none overflow-hidden w-full"
    />
  );
};

export default TableComponent;
