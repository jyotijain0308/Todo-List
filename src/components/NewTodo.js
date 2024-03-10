import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

export default function NewTodo({ addNewTodoForm, addTask }) {
    const onFinish = (values) => {
        addTask(values);
    }
    return <Form form={addNewTodoForm} onFinish={onFinish}>
        <Space align="middle">
            <Form.Item name={"title"} rules={[{ required: true }]} noStyle>
                <Input />
            </Form.Item>
            <Button htmlType="submit" type="primary" icon={<PlusOutlined />}>Add</Button>
        </Space>
    </Form>
}