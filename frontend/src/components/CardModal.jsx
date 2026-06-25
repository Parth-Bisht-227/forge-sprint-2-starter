import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function CardModal({ card, onClose, refreshBoard }) {
  const [formData, setFormData] = useState({
    title: card.title,
    description: card.description || '',
    due_date: card.due_date || '',
  });
  const [allTags, setAllTags] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  
  const [newTag, setNewTag] = useState({ name: '', color: '#3b82f6' });
  const [newMember, setNewMember] = useState({ name: '' });
  const [localTagIds, setLocalTagIds] = useState([]);
  const [localMemberIds, setLocalMemberIds] = useState([]);
  const [tagError, setTagError] = useState('');
  const [memberError, setMemberError] = useState('');

  useEffect(() => {
    const cardTags = card.tags || [];
    const cardMembers = card.members || [];
    setLocalTagIds(cardTags.map(t => t.id));
    setLocalMemberIds(cardMembers.map(m => m.id));
    
    const fetchData = async () => {
      try {
        const [tRes, mRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/tags`),
          axios.get(`${API_BASE_URL}/members`)
        ]);
        setAllTags(tRes.data);
        setAllMembers(mRes.data);
      } catch (err) {
        console.error("Failed to load tags/members", err);
      }
    };
    fetchData();
  }, [card]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // First update card fields
      await axios.put(`${API_BASE_URL}/cards/${card.id}`, formData);
      
      // Then sync tags and members if there are changes
      if (localTagIds.length > 0) {
        try {
          await axios.post(`${API_BASE_URL}/cards/${card.id}/tags`, { tag_ids: localTagIds });
        } catch (err) {
          console.error("Tag sync failed:", err);
          setTagError("Failed to sync tags");
        }
      }
      if (localMemberIds.length > 0) {
        try {
          await axios.post(`${API_BASE_URL}/cards/${card.id}/members`, { member_ids: localMemberIds });
        } catch (err) {
          console.error("Member sync failed:", err);
          setMemberError("Failed to sync members");
        }
      }
      
      onClose();
      refreshBoard();
    } catch (err) {
      console.error("Error updating card:", err);
    }
  };

  const handleTagToggle = (tagId, isChecked) => {
    setLocalTagIds(prev =>
      isChecked ? [...prev, tagId] : prev.filter(id => id !== tagId)
    );
  };

  const handleMemberToggle = (memberId, isChecked) => {
    setLocalMemberIds(prev =>
      isChecked ? [...prev, memberId] : prev.filter(id => id !== memberId)
    );
  };

  const handleCreateTag = async () => {
    if (!newTag.name) return;
    try {
      const res = await axios.post(`${API_BASE_URL}/tags`, newTag);
      setAllTags(prev => [...prev, res.data]);
      setNewTag({ name: '', color: '#3b82f6' });
      setLocalTagIds(prev => [...prev, res.data.id]);
      setTagError('');
    } catch (err) {
      console.error("Error creating tag:", err);
      setTagError("Could not create tag");
    }
  };

  const handleCreateMember = async () => {
    if (!newMember.name) return;
    try {
      const res = await axios.post(`${API_BASE_URL}/members`, newMember);
      setAllMembers(prev => [...prev, res.data]);
      setNewMember({ name: '' });
      setLocalMemberIds(prev => [...prev, res.data.id]);
      setMemberError('');
    } catch (err) {
      console.error("Error creating member:", err);
      setMemberError("Could not create member");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
         onClick={(e) => {
           if (e.target === e.currentTarget) {
             e.preventDefault();
             e.stopPropagation();
             onClose();
           }
         }}>
      <div className="bg-white rounded-xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh] shadow-2xl"
           onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Card</h2>
          <button type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        
        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
              <input 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
              <textarea 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none h-24" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Due Date</label>
              <input 
                type="datetime-local" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                value={formData.due_date} 
                onChange={e => setFormData({...formData, due_date: e.target.value})} 
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-500 uppercase">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {allTags.filter(t => localTagIds.includes(t.id)).map(t => (
                <span key={t.id} className="text-xs px-2 py-1 rounded-full text-white" style={{backgroundColor: t.color}}>
                  {t.name}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-1 border rounded">
              {allTags.map(t => (
                <label key={t.id} className="flex items-center gap-2 text-xs cursor-pointer p-1 hover:bg-gray-50 rounded">
                  <input 
                    type="checkbox" 
                    checked={localTagIds.includes(t.id)} 
                    onChange={e => handleTagToggle(t.id, e.target.checked)} 
                  />
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: t.color}}></span>
                  {t.name}
                </label>
              ))}
            </div>
            {tagError && <p className="text-xs text-red-500">{tagError}</p>}
            <div className="flex gap-2">
              <input 
                className="flex-grow p-1 text-xs border rounded" 
                value={newTag.name} 
                onChange={e => setNewTag({...newTag, name: e.target.value})} 
                placeholder="New Tag Name" 
              />
              <input 
                type="color" 
                className="w-8 h-6 p-0 border-none bg-transparent" 
                value={newTag.color} 
                onChange={e => setNewTag({...newTag, color: e.target.value})} 
              />
              <button 
                type="button"
                onClick={handleCreateTag} 
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-500 uppercase">Members</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {allMembers.filter(m => localMemberIds.includes(m.id)).map(m => (
                <div key={m.id} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-[10px] font-medium border border-gray-200">
                  <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[8px] flex items-center justify-center uppercase">
                    {m.name.charAt(0)}
                  </div>
                  {m.name}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-1 border rounded">
              {allMembers.map(m => (
                <label key={m.id} className="flex items-center gap-2 text-xs cursor-pointer p-1 hover:bg-gray-50 rounded">
                  <input 
                    type="checkbox" 
                    checked={localMemberIds.includes(m.id)} 
                    onChange={e => handleMemberToggle(m.id, e.target.checked)} 
                  />
                  {m.name}
                </label>
              ))}
            </div>
            {memberError && <p className="text-xs text-red-500">{memberError}</p>}
            <div className="flex gap-2">
              <input 
                className="flex-grow p-1 text-xs border rounded" 
                value={newMember.name} 
                onChange={e => setNewMember({name: e.target.value})} 
                placeholder="New Member Name" 
              />
              <button 
                type="button"
                onClick={handleCreateMember} 
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button 
              type="button" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardModal;
