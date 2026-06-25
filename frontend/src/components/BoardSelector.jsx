import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function BoardSelector({ onSelectBoard }) {
  const [boards, setBoards] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/boards`).then(res => setBoards(res.data));
  }, []);

  const createBoard = async (e) => {
    e.preventDefault();
    if (!newName) return;
    const res = await axios.post(`${API_BASE_URL}/boards`, { name: newName });
    setBoards([...boards, res.data]);
    setNewName('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Kanban Boards</h1>
        <div className="flex gap-2">
          {/* No Global Board Action here yet */}
        </div>
      </div>
      <form onSubmit={createBoard} className="mb-12 flex gap-3 max-w-lg">
        <input 
          className="p-3 border border-gray-300 rounded-lg flex-grow shadow-sm focus:ring-2 focus:ring-blue-400 outline-none bg-white" 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          placeholder="Enter board name..." 
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">Create Board</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map(board => (
          <div 
            key={board.id} 
            className="group relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:bg-blue-50/30 transition-all duration-200"
            onClick={() => onSelectBoard(board.id)}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">{board.name}</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if(confirm("Delete this board and all its contents?")) {
                    axios.delete(`${API_BASE_URL}/boards/${board.id}`).then(() => {
                      axios.get(`${API_BASE_URL}/boards`).then(res => setBoards(res.data));
                    });
                  }
                }}
                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Click to manage cards →</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardSelector;
