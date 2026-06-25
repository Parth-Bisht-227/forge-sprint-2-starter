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
    <>
      <div className={`group relative p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:bg-gray-50 transition border-l-4 ${isOverdue ? 'border-red-500' : 'border-transparent'}`}
           onClick={(e) => {
             e.stopPropagation();
             setIsModalOpen(true);
           }}>
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={deleteCard} 
            className="text-gray-400 hover:text-red-500 text-xs font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-between items-start mb-3">
          <span className="font-semibold text-sm text-gray-800">{card.title}</span>
          {isOverdue && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold uppercase">Overdue</span>}
        </div>
        
        <div className="flex gap-1.5 flex-wrap mb-4">
          {card.tags?.map(tag => (
            <span key={tag.id} className="text-[10px] px-2 py-0.5 rounded-full text-white font-medium shadow-sm" style={{ backgroundColor: tag.color }}>
              {tag.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {card.members?.map(m => (
              <div key={m.id} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-[10px] font-medium border border-gray-200">
                <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[8px] flex items-center justify-center uppercase">
                  {m.name.charAt(0)}
                </div>
                {m.name}
              </div>
            ))}
          </div>
          <select 
            className="text-[10px] p-1.5 rounded bg-gray-100 border-none text-gray-500 font-medium focus:ring-1 focus:ring-blue-400 cursor-pointer" 
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
      </div>

      {isModalOpen && (
        <CardModal 
          card={card} 
          onClose={() => {
            setIsModalOpen(false);
          }} 
          refreshBoard={refreshBoard} 
        />
      )}
    </>
  );
}

export default Card;
