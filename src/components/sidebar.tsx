import { MessageSquareText } from "lucide-react";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-96 h-[calc(100vh-56px)] border-l border-gray-200 p-4">
      <button className="border rounded-sm border-blue-500 w-full p-4">
        <MessageSquareText />
        <h1>Message</h1>
      </button>
    </aside>
  );
};

export default Sidebar;