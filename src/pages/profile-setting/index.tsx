import { useState } from 'react';
import { Tabs } from 'antd';
import BasicInfoTab from './BasicInfoTab';
import PermissionsTab from './PermissionsTab';
import NotificationSettingsTab from './NotificationSettingsTab';

const { TabPane } = Tabs;

const ProfileInfo = () => {
    const [activeTab, setActiveTab] = useState('basic');

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab="Basic Info" key="basic">
                    <BasicInfoTab />
                </TabPane>
                <TabPane tab="Permissions" key="permissions">
                    <PermissionsTab />
                </TabPane>
                <TabPane tab="Notification Settings" key="notifications">
                    <NotificationSettingsTab />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ProfileInfo;
