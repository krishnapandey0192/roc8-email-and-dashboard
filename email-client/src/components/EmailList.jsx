import React from 'react';
import { formatDate } from '../utils/storage';

const EmailList = ({ emails, selectedEmail, emailState, onEmailClick }) => {
  return (
    <div className="space-y-4">
      {emails.map((email) => {
        const isRead = emailState.read.has(email.id);
        const isFavorite = emailState.favorites.has(email.id);
        const isSelected = selectedEmail?.id === email.id;

        return (
          <div
            key={email.id}
            onClick={() => onEmailClick(email)}
            className={`
              cursor-pointer rounded-lg p-4 transition-all
              ${isRead ? 'bg-[#F2F2F2]' : 'bg-white'}
              ${isSelected ? 'border-2 border-[#E54065]' : 'border border-[#CFD2DC]'}
              hover:border-[#E54065]
            `}
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#E54065] text-white flex items-center justify-center">
                  {email.from.name[0].toUpperCase()}
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-[#636363]">
                    From:{' '}
                    <span className="font-medium">
                      {email.from.name} {`<${email.from.email}>`}
                    </span>
                  </p>
                  <p className="text-xs text-[#636363]">{formatDate(email.date)}</p>
                </div>
                <p className="text-sm font-medium text-[#636363] mt-1">
                  Subject: {email.subject}
                </p>
                <p className="text-sm text-[#636363] mt-1 truncate">
                  {email.short_description}
                </p>
                {isFavorite && (
                  <p className="text-xs text-[#E54065] mt-2">Favorite</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmailList;

