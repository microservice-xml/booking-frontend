import { useLocation } from "react-router-dom";
import "./index.scss";

const SearchAccommodations = () => {
  const location = useLocation();

  return (
    <div className="search-accommodations">
      {location.state.accommodations && 
        <>
          <h2>Search results: </h2>
          {location.state.accommodations.map((a: any) => {
            return (
              <div className="search-accommodations__slot-card">
                <p>City: {a.location}</p>
                <p>Name: {a.name}</p>
                <p>Allowed guests: {a.maxGuests} - {a.minGuests}</p>
              </div>
            );
          })}
        </>
      }
    </div>
  );
};

export default SearchAccommodations;