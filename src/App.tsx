import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MarkerType,
  Node,
  ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState,
  useOnSelectionChange,
  useStoreApi,
} from "reactflow";

import { useCallback, useState } from "react";
import "reactflow/dist/style.css";
import Header from "./components/header";
import TextNode from "./components/react-flow/text-node";
import Sidebar from "./components/sidebar";

///---------------------------------------------------------------------------------------

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 200 },
    data: { value: "Test message1" },
    type: "textNode",
  },
  {
    id: "2",
    position: { x: 500, y: 80 },
    data: { value: "Test message2" },
    type: "textNode",
  },
];
const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
const nodeTypes = { textNode: TextNode };

let id = 0;
const getId = () => `dndnode_${id++}`;

///---------------------------------------------------------------------------------------

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const { getState } = useStoreApi();
  const unselectNodesAndEdges = getState().unselectNodesAndEdges;

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodes(nodes.map((node) => node.id));
    },
  });

  const countEmptyTargetHandles = () => {
    // this function will count the number of nodes whose target handle is empty
    let count = 0;
    nodes.forEach((node) => {
      const targetHandle = edges.find((edge) => edge.target === node.id);
      if (!targetHandle) {
        count++;
      }
    });
    return count;
  };

  // Add edge on connect
  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      ),
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
        data: { value: `test message` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div style={{ height: "90vh" }}>
      <Header emptyTargetHandleCounts={countEmptyTargetHandles()} />
      <div className="flex flex-grow h-[calc(100vh-56px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={setReactFlowInstance}
        >
          <Controls />
          <Background variant={"dots" as BackgroundVariant} />
        </ReactFlow>
        <Sidebar
          unselectNodesAndEdges={unselectNodesAndEdges}
          onUpdateText={(id, text) => {
            const node = nodes.find((node) => node.id === id);
            if (node) {
              node.data.value = text;
              setNodes([...nodes]);
            }
          }}
          selectedNodes={selectedNodes.map((id) => {
            const node = nodes.find((node) => node.id === id);
            return { id, value: node?.data.value ?? "" };
          })}
        />
      </div>
    </div>
  );
}
