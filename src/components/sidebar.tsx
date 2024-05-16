import { ArrowLeft, MessageSquareText } from "lucide-react";
import { UnselectNodesAndEdgesParams } from "reactflow";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

///-----------------------------------------------------------------------------------------------

interface ISidebarProps {
  selectedNodes: { id: string; value: string }[];
  onUpdateText: (id: string, text: string) => void;
  unselectNodesAndEdges: (params?: UnselectNodesAndEdgesParams) => void;
}

///-----------------------------------------------------------------------------------------------

const Sidebar = ({
  selectedNodes,
  onUpdateText,
  unselectNodesAndEdges,
}: ISidebarProps) => {
  // for dragging nodes into react-flow
  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-96 h-[calc(100vh-56px)] border-l border-gray-200">
      {selectedNodes.length === 1 ? (
        <div>
          <div className="border-b p-2 relative">
            <Button
              // save the text upon back button pressed
              onClick={() => unselectNodesAndEdges()}
              className="absolute l-2 top-0 bottom-0 m-auto size-8 rounded-full"
              variant="ghost"
              size="icon"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <p className="text-center">Message</p>
          </div>
          <div className="p-4 border-b">
            <p className="text-muted-foreground text-sm mb-2">Text</p>
            <Textarea
              value={selectedNodes[0].value}
              onChange={(e) => {
                onUpdateText(selectedNodes[0].id, e.target.value);
              }}
            />
            <Button
              className="w-full mt-2"
              // fix: canvas doesn't show updated text until the node is unselected
              onClick={() => unselectNodesAndEdges()}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-4">
            Drag & Drop the below element(s) into canvas
          </p>
          <button
            draggable
            onDragStart={(event) => onDragStart(event, "textNode")}
            className="border-2 rounded-sm border-blue-600 w-full p-4 flex flex-col items-center justify-center"
          >
            <MessageSquareText className="text-blue-600" />
            <h1 className="text-blue-600">Message</h1>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
