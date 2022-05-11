import { useEffect, useState } from "react"
import CarrierListForm from "./carrierListForm"
import UpdateOrSaveButton from "./updateOrSaveButton.js"

export default function CarrierList() {

    const [notes, setNotes] = useState([])
    const [inputVal, setinputVal] = useState('')
    const [tern, setTern] = useState(true)
    //  console.log(inputVal)

    useEffect(() =>
        fetch('/carrier_notes')
            .then(r => r.json())
            .then(r => {
                setNotes(r)
            })
        , [])

    function ternary() {
        setTern(!tern)
    }

    function handleDeleteCarrierNote(id) {
        const notesAfterDelete = notes.filter(note => note.id !== id)
        setNotes(notesAfterDelete)
        fetch(`/carrier_notes/${id}`, {
            method: "DELETE"
        })
            .catch(error => console.log(error))
    }

    function handleUpdateCarrierNote(id) {
        fetch(`/carrier_notes/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/JSON"
            },
            body: JSON.stringify({})
        })
    }

    return (
        <div className="carrier-list-container">Carrier List
            <CarrierListForm setNotes={setNotes} notes={notes} />
            <div>{
                notes.map((note, index) =>
                    <div key={index}>
                        <div >{note.carrier.carrier_name}</div>
                        <textarea value={note.note} onChange={(e) => setinputVal(e.target.value)}></textarea>
                        <button onClick={() => handleDeleteCarrierNote(note.id)}>delete</button>
                        <UpdateOrSaveButton />
                    </div>
                )
            }</div>
        </div>
    )
}