import { Tabs, Input, Button } from "antd";
import {  SearchOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const EmailManagement = () => {

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700">Email Management</h2>
      <Tabs defaultActiveKey="1" className="mt-4">
        <TabPane tab={<span className="font-medium text-blue-600">Email Inbox</span>} key="1" />
        <TabPane tab="Email Sent" key="2" />
      </Tabs>
      
      <div className="flex items-center gap-4 mt-4">
        <Input placeholder="Type to Search" prefix={<SearchOutlined />} className="w-full p-2 border border-gray-300 rounded-lg" />
        <Button className="border border-gray-300 px-4 py-2 rounded-lg font-medium">Advanced Search</Button>
      </div>
      
      <div className="bg-gray-100 text-gray-700 px-3 py-1 mt-4 rounded-lg inline-block">
        Client: ABC
      </div>
      
      <div className="text-gray-500 text-center mt-6">No emails</div>
    </div>
  );
};

export default EmailManagement;
