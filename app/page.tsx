"use client";

import React, { useState, useEffect } from "react";
import ColorPicker from "./components/ColorPicker";
import GridCell from "./components/GridCell";

export default function Home() {
  const COLS_NUM = 100;
  const [numRows, setNumRows] = useState(0);
  const [coloredCells, setColoredCells] = useState<Record<number, string>>({});
  const [currentColor, setCurrentColor] = useState("bg-black");
  const [isDrawing, setIsDrawing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleCell = (index: number) => {
    setColoredCells((prev) => {
      const next = { ...prev };
      if (next[index]) {
        delete next[index];
      } else {
        next[index] = currentColor;
      }
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    if (e.button === 0) {
      setIsDrawing(true);
      toggleCell(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (isDrawing) {
      toggleCell(index);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowColorPicker((prev) => !prev);
  };

  useEffect(() => {
    const calculateRows = () => {
      const cellSize = window.innerWidth / COLS_NUM;
      const availableHeight = window.innerHeight;
      const calculatedRows = Math.floor(availableHeight / cellSize);
      setNumRows(calculatedRows);
    };

    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const total = COLS_NUM * numRows;
  const grid = Array.from({ length: total }, (_, i) => i);

  return (
    <div
      className="w-screen h-screen grid relative"
      style={{
        gridTemplateColumns: `repeat(${COLS_NUM}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
      }}
      onContextMenu={handleContextMenu}
    >
      {grid.map((index) => (
        <GridCell
          key={index}
          color={coloredCells[index] || ""}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onMouseEnter={() => handleMouseEnter(index)}
        />
      ))}

      {showColorPicker && (
        <ColorPicker
          onColorSelect={(color) => {
            setCurrentColor(color);
            setShowColorPicker(false);
          }}
          onMouseLeave={() => setShowColorPicker(false)}
        />
      )}
    </div>
  );
}
