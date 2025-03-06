import { useState } from "react";
import { FaTrash, FaEnvelopeOpenText } from "react-icons/fa";
import { Button } from "antd";

interface Email {
  id: number;
  sender: string;
  subject: string;
  date: string;
  status: "Unread" | "Read";
}

const initialEmails: Email[] = [
  { id: 1, sender: "john@example.com", subject: "Project Update", date: "04 Mar 2025", status: "Unread" },
  { id: 2, sender: "alice@example.com", subject: "Meeting Agenda", date: "03 Mar 2025", status: "Read" },
  { id: 3, sender: "mark@example.com", subject: "Invoice Details", date: "02 Mar 2025", status: "Unread" },
];

const Inbox = () => {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const filteredEmails = emails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? email.status === filterStatus : true)
  );

  const deleteEmail = (id: number) => {
    setEmails(emails.filter((email) => email.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Inbox Emails</h2>

      {/* Search & Filter Section */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by sender"
          className="w-full p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Unread">Unread</option>
          <option value="Read">Read</option>
        </select>
      </div>

      {/* Email List */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Sender</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email) => (
                <tr key={email.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{email.sender}</td>
                  <td className="p-3">{email.subject}</td>
                  <td className="p-3">{email.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${email.status === "Unread"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {email.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <Button
                      className="text-red-500 hover:bg-red-100"
                      onClick={() => deleteEmail(email.id)}
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      className="text-blue-500 hover:bg-blue-100"
                    >
                      <FaEnvelopeOpenText />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-gray-500">
                  No emails found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inbox;