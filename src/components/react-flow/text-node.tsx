import React, { useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const handleStyle = { left: 10 };

export default function TextNode({ selected }: NodeProps<{}>) {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className={cn("shadow-lg rounded-md overflow-hidden min-w-64", selected && "ring-ring ring-2 ring-blue-500")}>
        <div className="bg-[#b1f0e5] flex justify-between items-center px-4 py-1">
          <div className="flex gap-x-2 items-center">
            <MessageSquare className="size-4 text-gray-700" />
            <p className="text-xs font-semibold">Send message</p>
          </div>
          <div className="rounded-full bg-white h-5 w-5 flex items-center justify-center">
            <img src="/wp.svg" className="w-4 h-4" />
          </div>
        </div>
        <div className="px-4 py-2">
          <h1 className="text-sm">Hello world!</h1>
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
