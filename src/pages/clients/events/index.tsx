import React, { useState } from "react";
import { Calendar, Button, Modal, Input, DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { LeftOutlined, RightOutlined, DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const Index: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState<Dayjs | null>(null);
  const [events, setEvents] = useState<{ title: string; date: Dayjs }[]>([]);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };

  const handleCreateEvent = () => {
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (eventTitle && eventDate) {
      setEvents([...events, { title: eventTitle, date: eventDate }]);
    }
    setIsModalOpen(false);
    setEventTitle("");
    setEventDate(null);
  };

  const dateCellRender = (date: Dayjs) => {
    const dayEvents = events.filter((event) => event.date.isSame(date, "day"));
    return (
      <ul className="list-none p-0 m-0">
        {dayEvents.map((event, index) => (
          <li key={index} className="text-xs text-blue-600 font-medium">
            {event.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6 border border-gray-300 relative">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b bg-white z-10 p-4 shadow-sm rounded-lg">
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
          <Button icon={<LeftOutlined />} onClick={handlePrevMonth} className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100" />
          <h2 className="text-lg font-semibold text-gray-700 pl-3">{currentDate.format("MMMM YYYY")}</h2>
          <Button icon={<RightOutlined />} onClick={handleNextMonth} className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100" />
        </div>

        <div className="flex space-x-4">
          <Button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-700" onClick={handleCreateEvent}>
            Create Event <DownOutlined />
          </Button>
        </div>
      </div>

      {/* Calendar Component */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
        <Calendar className="border-0" fullscreen={false} value={currentDate} dateCellRender={dateCellRender} />
      </div>

      {/* Modal for Creating Event */}
      <Modal title="Create Event" open={isModalOpen} onOk={handleSaveEvent} onCancel={() => setIsModalOpen(false)}>
        <Input
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded-lg"
        />
        <DatePicker
          value={eventDate}
          onChange={(date) => setEventDate(date)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </Modal>
    </div>
  );
};

export default Index;
