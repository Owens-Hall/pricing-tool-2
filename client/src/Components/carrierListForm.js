import { useEffect } from "react"
import { useState } from "react"

export default function CarrierListForm({setNotes, notes}) {

    const [inputCarrier, setInputCarrier] = useState('')
    const [note, setNote] = useState('')
    const [select, setSelect] = useState([])
    const [carriers, setCarriers] = useState([])

    useEffect(() =>
        fetch("/carriers")
            .then(r => r.json())
            .then(r => setCarriers(r))
        , [])

        //update the options for carriers dropdown
    function changeSelect() {
        const result = carriers.filter(carrier => carrier.carrier_name.toLowerCase().includes(inputCarrier.toLowerCase()))
        setSelect(result)
    }


    //add a new carier note
    function postNote(e) {
        e.preventDefault()
        const selectCarrier = e.target[1][0].value

        fetch("/carrier_notes", {
            method: "POST",
            headers: {
                'Content-Type': "application/JSON"
            },
            body: JSON.stringify({
                note,
                selectCarrier
            })
        })
        .then(r => r.json())
        .then(r => setNotes([r, ...notes]))
    }
 
    return (
        <div className="search-bar" id="carrier-search">
            <hr></hr>
            <form onChange={changeSelect} onSubmit={postNote} className="carrier-list-form">
                <div>Carrier Name:</div>
                <input type="text" placeholder="Carrier Name" value={inputCarrier} onChange={e => setInputCarrier(e.target.value)}></input>
                <select>
                    {select.map((carrier, index) => <option key={index}>{carrier.carrier_name}</option>)}
                </select>
                <br></br>
                <br></br>
                <div>Notes: </div>
                <textarea value={note} onChange={e => setNote(e.target.value)}></textarea>
                <input type="submit"></input>
            </form>
            <hr></hr>
        </div>
    )
}