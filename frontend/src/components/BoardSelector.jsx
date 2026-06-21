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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Kanban Boards</h1>
      <form onSubmit={createBoard} className="mb-8 flex gap-2">
        <input 
          className="p-2 border rounded flex-grow" 
          value={newName} 
          onChange={(e) => setNewName(e.target.value)} 
          placeholder="Board Name..." 
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Board</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {boards.map(board => (
          <div 
            key={board.id} 
            onClick={() => onSelectBoard(board.id)}
            className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg">{board.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardSelector;
