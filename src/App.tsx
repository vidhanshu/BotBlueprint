import ReactFlow, {
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { useCallback, useMemo, useState } from "react";
import TextNode from "./components/react-flow/text-node";

///---------------------------------------------------------------------------------------

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  {
    id: "3",
    position: { x: 0, y: 100 },
    data: { label: "3" },
    type: "textNode",
  },
];
const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];
const nodeTypes = { textNode: TextNode };

let id = 0;
const getId = () => `dndnode_${id++}`;
///---------------------------------------------------------------------------------------

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })!;
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div style={{ height: "90vh" }}>
      <Header />
      <ReactFlowProvider>
        <div className="flex flex-grow h-[calc(100vh-56px)]">
          <ReactFlow
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onInit={setReactFlowInstance}
            nodes={nodes}
            edges={edges}
          >
            <Controls />
          </ReactFlow>
          <Sidebar />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
