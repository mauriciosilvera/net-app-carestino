import React from "react";

interface GridCellProps {
  color: string;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseEnter: () => void;
}

const GridCell = ({ color, onMouseDown, onMouseEnter }: GridCellProps) => (
  <div
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
    className={`w-full h-full border border-gray-400 cursor-pointer hover:bg-gray-200 ${color}`}
  />
);

export default GridCell;
