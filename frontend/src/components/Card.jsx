import React, { useState } from 'react';
import axios from 'axios';
import CardModal from './CardModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function Card({ card, refreshBoard, allLists }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const moveCard = async (listId) => {
    if (!listId) return;
    try {
      await axios.patch(`${API_BASE_URL}/cards/${card.id}/move`, { list_id: listId });
      refreshBoard();
    } catch (err) {
      alert("Error moving card");
    }
  };

  const deleteCard = async (e) => {
    e.stopPropagation();
    if (!confirm("Delete this card?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/cards/${card.id}`);
      refreshBoard();
    } catch (err) {
      alert("Error deleting card");
    }
  };

  const isOverdue = card.due_date && new Date(card.due_date) < new Date();

  return (
    <div className={`group relative p-3 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-50 transition border-l-4 ${isOverdue ? 'border-red-500' : 'border-transparent'}`}
         onClick={() => setIsModalOpen(true)}>
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
        <button 
          onClick={deleteCard} 
          className="text-gray-400 hover:text-red-500 text-xs font-bold"
        >
          ✕
        </button>
      </div>

      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-sm">{card.title}</span>
        {isOverdue && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold uppercase">Overdue</span>}
      </div>
      
      <div className="flex gap-1 flex-wrap mb-3">
        {card.tags?.map(tag => (
          <span key={tag.id} className="text-[10px] px-2 py-0.5 rounded text-white" style={{ backgroundColor: tag.color }}>
            {tag.name}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <select 
          className="text-[10px] p-1 rounded bg-gray-100 border-none text-gray-600 focus:ring-1 focus:ring-blue-400" 
          onChange={(e) => moveCard(parseInt(e.target.value))}
          onClick={(e) => e.stopPropagation()}
          value=""
        >
          <option value="" disabled>Move to...</option>
          {allLists?.filter(l => l.id !== card.list_id).map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
      </div>

      {isModalOpen && (
        <CardModal 
          card={card} 
          onClose={() => setIsModalOpen(false)} 
          refreshBoard={refreshBoard} 
        />
      )}
    </div>
  );
}

export default Card;
