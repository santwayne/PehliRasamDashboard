import { useState } from "react";

interface Email {
  id: number;
  sender: string;
  recipient: string;
  subject: string;
  preview: string;
  time: string;
}

const initialEmails: Email[] = [
  {
    id: 1,
    sender: "Pehli Rasam.com",
    recipient: "Balkar Singh Dhaliwal",
    subject: "Weekly Update",
    preview: "Dear Balkar Singh, Greetings from Pehli Rasam! Hope you are good...",
    time: "10:22 AM",
  },
  {
    id: 2,
    sender: "Pehli Rasam.com",
    recipient: "Jaspreet Kaur Kalsi",
    subject: "Weekly Update",
    preview: "Dear Member, Greetings from Pehli Rasam! Hope you are good...",
    time: "5:02 AM",
  },
  {
    id: 3,
    sender: "SmartMatchApp",
    recipient: "snehadesai@pehlirasam.com",
    subject: "Birthday Reminder",
    preview: "Baljit M! Singh has birthday on March 4, 1989.",
    time: "12:13 AM",
  },
];

const Sent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmails = initialEmails.filter((email) =>
    email.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Sent Emails</h2>

      {/* Search Bar & Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center w-full border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Type to Search"
            className="w-full p-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300">Advanced Search</button>
        </div>
      </div>

      {/* Emails List */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <tbody>
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email) => (
                <tr key={email.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 flex items-center">
                    <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                      {email.sender[0]}
                    </span>
                    <span className="ml-2 text-gray-800">{email.sender} ➝ <span className="text-blue-600">{email.recipient}</span></span>
                  </td>
                  <td className="p-3 text-gray-600">{email.subject}</td>
                  <td className="p-3 text-gray-500 truncate">{email.preview}</td>
                  <td className="p-3 text-gray-500 text-right">{email.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
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

export default Sent;
