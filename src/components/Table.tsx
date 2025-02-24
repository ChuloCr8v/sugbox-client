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
    <div className="max-w-[380px] w-full md:max-w-full overflow-x-hidden">
      <Table
        size="small"
        scroll={{ x: "max-content" }}
        loading={props.loading}
        pagination={{ pageSize: props.pageSize }}
        columns={props.columns}
        dataSource={props.data}
        onRow={props.onRow}
        className="border-gray-200 border rounded !shadow-none overflow-hidden w-full"
      />
    </div>
  );
};

export default TableComponent;
