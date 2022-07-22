import React, {useEffect, useState} from 'react'
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from '../../utils/api';

function Deck() {
const [deck, setDeck] = useState([]);
const {deckId} = useParams();
const history = useHistory();
//const { id, name, description, cards } = deck

useEffect(()=> {
    const abortController = new AbortController()
    async function loadDeck() {
        const getDeckFromAPI = await readDeck(deckId, abortController.signal);
        setDeck(getDeckFromAPI)
    }
    loadDeck();
    return ()=> abortController.abort()
}, [deckId]);

    return (
        <div>
    <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><a href="/">Home</a></li>
    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
  </ol>
</nav>
<div>
    <h3>{deck.name}</h3>
    <p>{deck.description}</p>
    <button type="button" className="btn btn-secondary"onClick={()=> history.push(`/decks/${deckId}/edit`)} >Edit</button>
    <button type="button" className="btn btn-primary" onClick={()=> history.push(`/decks/${deckId}/study`)}>Study</button>
    <button type="button" className="btn btn-primary" onClick={()=> history.push(`/decks/${deckId}/cards/new`)}>+ Add Cards</button>
    <button type="button" className="btn btn-danger" onClick={async()=> {
        if(window.confirm("Delete this card? You won't be able to recover it.")) {
            await  deleteCard(deck.card.id)
            history.go(`/decks/${deckId}`)
        }
    }}>Delete</button>
</div>

<div>
    <h2>Cards</h2>

        {deck.cards && deck.cards.map((card)=> 
            <div className="card" key={card.id}>
  <div className="card-body">
      <div className="row">
    <p className="card-text">{card.front}</p>
    <p className="card-text">{card.back}</p>
    </div>
    <a href={`/decks/${deck.id}`} className="btn btn-secondary">Edit</a>
    <a href="/" className="btn btn-danger" onClick={()=> {
        if(window.confirm("Delete this deck? You won't be able to recover it.")) {
             deleteDeck(`${deck.id}`)
            history.go("/")
        }
    }}>Delete</a>
  </div>
</div>

)}

</div>
</div>
    )

}

export default Deck