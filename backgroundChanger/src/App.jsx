import { useState } from 'react';

function App() {
  const [background, setBackground] = useState("red");
  const colors = [
    "red", "green", "blue", "olive", "gray",
    "yellow", "pink", "purple", "lavender", "white", "black"
  ];
  

  return (
    <>
      <div 
      style={{ backgroundColor: background }}
      className="w-screen h-screen">
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white px-4 py-4 rounded-xl flex space-x-2">
          {colors.map((color, index) => (
            <div
              key={index}
              style={{ backgroundColor: color }}
              onClick = {()=> setBackground(color)}
              className={`px-4 py-2 rounded-lg font-bold text-center ${
                ["white", "lavender"].includes(color.toLowerCase())
                  ? "text-black"
                  : "text-white"
              } cursor-pointer`}
            >
              {color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
