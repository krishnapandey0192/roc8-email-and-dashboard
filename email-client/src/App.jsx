import React, { useState, useEffect } from "react";
import { getEmailState, saveEmailState } from "./utils/storage";
import EmailList from "./components/EmailList";
import EmailBody from "./components/EmailBody";
import FilterBar from "./components/FilterBar";
import { fetchEmails,fetchEmailBody } from "./utils/api";

const App = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailState, setEmailState] = useState(getEmailState());
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEmails();
  }, [page]);

  useEffect(() => {
    saveEmailState(emailState);
  }, [emailState]);

  async function fetchEmails() {
    try {
      const res = await fetch(
        `https://flipkart-email-mock.now.sh/?page=${page}`
      );
      const data = await res.json();
      setEmails((prev) => [...prev, ...data.list]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setLoading(false);
    }
  }

  async function fetchEmailBody(id) {
    try {
      const res = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
      const data = await res.json();
      return data.body;
    } catch (error) {
      console.error("Error fetching email body:", error);
      return null;
    }
  }

  const handleEmailClick = async (email) => {
    const body = await fetchEmailBody(email.id);
    setSelectedEmail({ ...email, body });

    if (!emailState.read.has(email.id)) {
      setEmailState((prev) => ({
        ...prev,
        read: new Set([...prev.read, email.id]),
      }));
    }
  };

  const toggleFavorite = (id) => {
    setEmailState((prev) => {
      const newFavorites = new Set(prev.favorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return { ...prev, favorites: newFavorites };
    });
  };

  const filteredEmails = emails.filter((email) => {
    switch (filter) {
      case "unread":
        return !emailState.read.has(email.id);
      case "read":
        return emailState.read.has(email.id);
      case "favorites":
        return emailState.favorites.has(email.id);
      default:
        return true;
    }
  });

  console.log(filteredEmails, "filteredEmails");

  return (
    <div className="min-h-screen w-full bg-[#F4F5F9]">
      <div className="max-w-7xl mx-auto p-4">
        <FilterBar filter={filter} setFilter={setFilter} />
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div
            className={`${
              selectedEmail ? "md:w-2/5" : "w-full"
            } transition-all duration-300`}
          >
            {filter != "read" &&
              filter != "unread" &&
              filter != "favorites" && (
                <EmailList
                  emails={filteredEmails}
                  selectedEmail={selectedEmail}
                  emailState={emailState}
                  onEmailClick={handleEmailClick}
                />
              )}
            {filter === "read" && (
              <EmailList
                emails={filteredEmails}
                selectedEmail={selectedEmail}
                emailState={emailState}
                onEmailClick={handleEmailClick}
              />
            )}
            {filter === "unread" && (
              <EmailList
                emails={filteredEmails}
                selectedEmail={selectedEmail}
                emailState={emailState}
                onEmailClick={handleEmailClick}
              />
            )}
            {filter === "favorites" && (
              <EmailList
                emails={filteredEmails}
                selectedEmail={selectedEmail}
                emailState={emailState}
                onEmailClick={handleEmailClick}
              />
            )}
            {!loading && emails.length >= 10 && (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="mt-4 w-full py-2 bg-white text-[#636363] border border-[#CFD2DC] rounded-md hover:bg-[#E1E4EA] transition-colors"
              >
                Load More
              </button>
            )}
          </div>
          {selectedEmail && (
            <div className="md:w-3/5">
              <EmailBody
                email={selectedEmail}
                isFavorite={emailState.favorites.has(selectedEmail.id)}
                onToggleFavorite={() => toggleFavorite(selectedEmail.id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
