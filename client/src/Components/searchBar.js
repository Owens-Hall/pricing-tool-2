function SearchBar(){
return(
    <div>
        <hr></hr>
        <div>Search</div>
        <label>Origin City: </label>
        <input placeholder="Search Origin City"></input>
        <label> Origin State: </label>
        <input placeholder="Search Origin State"></input>
        <label> Destination City: </label>
        <input placeholder="Search Destination City"></input>
        <label> Destination State: </label>
        <input placeholder="Search Destination State"></input>
        <label> Carrier: </label>
        <input placeholder="Search Carrier"></input>
        <button>Search</button>
        <hr></hr>
    </div>
    
)
}
export default SearchBar