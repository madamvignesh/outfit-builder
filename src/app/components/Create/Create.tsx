// pages/Create.tsx
import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Link from "next/link";
import Image from "next/image";

// Sample data
const sampleItems = [
  { id: "1", name: "Red Shirt", type: "shirt", image: "https://res.cloudinary.com/dybipmq9j/image/upload/e_background_removal/f_png/v1745577908/download_rtzakx.jpg" },
  { id: "2", name: "Blue Jeans", type: "pant", image: "https://res.cloudinary.com/dybipmq9j/image/upload/e_background_removal/f_png/v1745577958/images_tc4ryn.jpg" },
  { id: "3", name: "Sneakers", type: "shoes", image: "https://res.cloudinary.com/dybipmq9j/image/upload/e_background_removal/f_png/v1745578005/download_bfu0xr.png" },
  { id: "4", name: "Black Jacket", type: "jacket", image: "https://res.cloudinary.com/dybipmq9j/image/upload/e_background_removal/f_png/v1745578086/download_2_fkellx.png" },
  { id: "5", name: "One Piece Dress", type: "onepiece", image: "https://res.cloudinary.com/dybipmq9j/image/upload/e_background_removal/f_png/v1745578141/download_3_dxrobm.png" },
  { id: "6", name: "Baseball Cap", type: "hat", image: "https://res.cloudinary.com/dybipmq9j/image/upload/e_background_removal/f_png/v1745578193/download_4_cmztae.png" },
];

// Draggable item
const DraggableItem = ({ item }: { item: any }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "clothing",
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={`bg-gray-700 p-2 rounded hover:bg-gray-600 cursor-pointer ${
        isDragging ? "opacity-30" : "opacity-100"
      }`}
    >
      <Image src={item.image} alt={item.name} width={64} height={64} className="mx-auto" />
      <p className="text-center text-sm mt-1">{item.name}</p>
    </div>
  );
};

// Drop canvas
const DropCanvas = ({
  droppedItems,
  onDrop,
}: {
  droppedItems: any[];
  onDrop: (item: any) => void;
}) => {
  const [, dropRef] = useDrop(() => ({
    accept: "clothing",
    drop: (item: any) => onDrop(item),
  }));

  return (
    <div
      ref={dropRef}
      className="border-2 border-dashed border-gray-600 rounded h-[300px] flex flex-wrap items-center justify-center text-gray-400 p-2 gap-2"
    >
      {droppedItems.length === 0 ? (
        <>
          <p>No items, Drop items here</p>
        </>
      ) : (
        droppedItems.map((item, index) => (
          <Image
            key={index}
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="object-contain"
          />
        ))
      )}
    </div>
  );
};

// Main Page
const CreateSection = () => {
  const [droppedItems, setDroppedItems] = useState<any[]>([]);

  const handleDrop = (item: any) => {
    // Avoid duplicate items (optional)
    if (!droppedItems.find((i) => i.id === item.id)) {
      setDroppedItems((prev) => [...prev, item]);
    }
  };

  const handleAddToCart = () => {
    localStorage.setItem("outfitCart", JSON.stringify(droppedItems));
    alert("Items added to cart!");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Create Your Outfit</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Clothing Items</h2>
            <div className="space-y-4">
              {sampleItems.map((item) => (
                <DraggableItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md col-span-2 min-h-[400px]">
            <h2 className="text-xl font-semibold mb-4">Canvas</h2>
            <DropCanvas droppedItems={droppedItems} onDrop={handleDrop} />
          </div>
        </div>

        {/* Action Button */}
        <Link href="/">
          <button className="mt-6 mr-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded">
            Back to Home
          </button>
        </Link>
        <div className="mt-8 text-right">
          <button
            className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded text-white font-medium"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <Link href="/cart">
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-white font-medium ml-4">
              View Cart
            </button>
          </Link>
        </div>
      </div>
    </DndProvider>
  );
};

export default CreateSection;
