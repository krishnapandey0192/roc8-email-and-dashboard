import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-[#636363]">Filter By:</span>
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-1 text-sm rounded-full transition-colors
            ${filter === 'unread' 
              ? 'bg-[#E54065] text-white' 
              : 'bg-[#E1E4EA] text-[#636363] hover:bg-[#CFD2DC]'
            }`}
        >
          Unread
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-1 text-sm rounded-full transition-colors
            ${filter === 'read' 
              ? 'bg-[#E54065] text-white' 
              : 'bg-[#E1E4EA] text-[#636363] hover:bg-[#CFD2DC]'
            }`}
        >
          Read
        </button>
        <button
          onClick={() => setFilter('favorites')}
          className={`px-4 py-1 text-sm rounded-full transition-colors
            ${filter === 'favorites' 
              ? 'bg-[#E54065] text-white' 
              : 'bg-[#E1E4EA] text-[#636363] hover:bg-[#CFD2DC]'
            }`}
        >
          Favorites
        </button>
      </div>
    </div>
  );
};

export default FilterBar;

