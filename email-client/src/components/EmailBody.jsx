import React from 'react';
import { formatDate } from '../utils/storage';

const EmailBody = ({ email, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg border border-[#CFD2DC] p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E54065] text-white flex items-center justify-center text-lg">
            {email.from.name[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-medium text-[#636363]">{email.subject}</h2>
            <p className="text-sm text-[#636363] mt-1">{formatDate(email.date)}</p>
          </div>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`px-4 py-2 rounded-md text-sm transition-colors
            ${isFavorite 
              ? 'bg-[#E54065] text-white' 
              : 'border border-[#E54065] text-[#E54065] hover:bg-[#E54065] hover:text-white'
            }`}
        >
          {isFavorite ? 'Marked as favorite' : 'Mark as favorite'}
        </button>
      </div>
      <div 
        className="prose max-w-none text-[#636363]"
        dangerouslySetInnerHTML={{ __html: email.body || '' }} 
      />
    </div>
  );
};

export default EmailBody;

