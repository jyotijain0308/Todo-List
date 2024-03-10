import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useState } from "react";
import { STATUSES, STATUS_COMPLETED, STATUS_PENDING } from "../data/constants";

export default function TodoTable({ tasks, deleteTask, onTaskUpdate }) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([2]);
    const columns = [
        { title: 'Id', dataIndex: 'id', key: 'id', width: '10%' },
        { title: 'Task', dataIndex: 'title', key: 'title', width: '60%' },
        {
            title: 'Status', dataIndex: 'status', key: 'status', width: '15%',
            render: (value) => STATUSES[value],
            filters: [
                { text: 'Pending', value: STATUS_PENDING },
                { text: 'Completed', value: STATUS_COMPLETED }
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Action(s)', dataIndex: '', key: 'action', width: '10%',
            render: (_, record) => <Button type="text" danger onClick={() => deleteTask(record.id)} icon={<DeleteOutlined />} />
        }
    ]
    // For marking task completed, rowSelection object indicates the need for row selection
    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            onTaskUpdate(selectedRowKeys);
            alert('task status updated successfully.');
            setSelectedRowKeys(selectedRowKeys);
        }
    };
    return <Table
        rowKey={"id"}
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        columns={columns}
        dataSource={tasks}
        size="small"
    />
}