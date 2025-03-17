import React from "react";

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  onMouseLeave: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onColorSelect,
  onMouseLeave,
}) => {
  const colors = [
    "bg-black",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-teal-500",
    "bg-blue-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-pink-500",
  ];

  return (
    <section
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 p-4 bg-white rounded-lg shadow-lg transition-opacity duration-200 border-2 border-gray-300"
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-10 gap-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-8 h-8 ${color} rounded cursor-pointer hover:scale-110 transition-transform`}
            onClick={() => onColorSelect(color)}
          />
        ))}
      </div>
    </section>
  );
};

export default ColorPicker;
