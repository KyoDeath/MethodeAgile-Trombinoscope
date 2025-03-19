import { useState } from "react";
import "./App.css";

const people = [
  { id: 1, name: "Jeanne Dupont", photo: "https://via.placeholder.com/150", email: "lorem@ipsum-dolor.fr", phone: "+336319389192" },
  { id: 2, name: "Hugo Charles", photo: "https://via.placeholder.com/150", email: "lorem@ipsum-dolor.fr", phone: "+336319389192" },
  { id: 3, name: "Emilie Casey", photo: "https://via.placeholder.com/150", email: "lorem@ipsum-dolor.fr", phone: "+336319389192" },
  { id: 4, name: "Marie Wei", photo: "https://via.placeholder.com/150", email: "lorem@ipsum-dolor.fr", phone: "+336319389192" },
];

function App() {
  const [profiles, setProfiles] = useState(people);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <img src="/homme-debout-silhouette-noire_318-53..." alt="Logo" className="logo" />
        </div>
        <nav>
          <ul>
            <li>Trombinoscope</li>
            <li>Liste</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="search-header">
          <input type="text" placeholder="Rechercher un profil" className="search-bar" />
          <button className="add-button">Créer une fiche +</button>
        </header>
        <div className="grid">
          {profiles.map((person) => (
            <div key={person.id} className="card">
              <img src={person.photo} alt={person.name} className="photo" />
              <div className="card-info">
                <h2>{person.name}</h2>
                <p>Master 1 - Droit des entreprises</p>
                <a href={`mailto:${person.email}`}>{person.email}</a>
                <p>{person.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;