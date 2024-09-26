import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editItemValue, setEditItemValue] = useState("");

  // Fetch items from the server when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch("http://localhost:5001/items");
    const data = await response.json();
    setItems(data);
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5001/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem }),
    });
    if (response.ok) {
      setNewItem("");
      fetchItems(); // Refresh the item list
    }
  };

  const handleEditItem = async (id) => {
    const response = await fetch(`http://localhost:5001/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editItemValue }),
    });
    if (response.ok) {
      setEditItemId(null);
      setEditItemValue("");
      fetchItems(); // Refresh the item list
    }
  };

  const handleDeleteItem = async (id) => {
    await fetch(`http://localhost:5001/items/${id}`, {
      method: "DELETE",
    });
    fetchItems(); // Refresh the item list
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <form onSubmit={handleAddItem} className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="New Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
          required
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
      <ul className="w-full max-w-md">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center mb-2 p-2 bg-white shadow-sm rounded"
          >
            {editItemId === item.id ? (
              <>
                <input
                  type="text"
                  value={editItemValue}
                  onChange={(e) => setEditItemValue(e.target.value)}
                  className="border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 flex-1"
                />
                <button
                  onClick={() => handleEditItem(item.id)}
                  className="ml-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{item.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditItemId(item.id);
                      setEditItemValue(item.name);
                    }}
                    className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="ml-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
