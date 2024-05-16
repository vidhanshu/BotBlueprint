import ReactFlow, {
  Connection,
  Controls,
  Edge,
  Node,
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
  { id: "3", position: { x: 0, y: 100 }, data: { label: "3" }, type:"textUpdater" },
];
const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];
const nodeTypes = { textUpdater: TextNode };
///---------------------------------------------------------------------------------------

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: "90vh" }}>
      <Header />
      <div className="flex flex-grow h-[calc(100vh-56px)]">
        <ReactFlow
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodes={nodes}
          edges={edges}
        >
          <Controls />
        </ReactFlow>
        <Sidebar />
      </div>
    </div>
  );
}
