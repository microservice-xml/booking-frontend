import { useEffect, useState } from "react";
import { getAllAccommodation } from "../../services/accommodationService";
import "./index.scss"
import { useNavigate } from "react-router-dom";

const HostAccommodationsPage = () => {

  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchAccommodations = async () => {
    // switch this for getAllAccommodationsByUser()
    const res = await getAllAccommodation();
    if (!res || !res.data) return;
    setAccommodations(res.data);
    console.log(res.data);
    setLoading(false);
  };

  const navigateToAccommodationPage = (id: number) => {
    navigate(`/accommodation/${id}`);
  }

  useEffect(() => {
    fetchAccommodations();
  }, []);

  return (
    <div className="host-accommodations">
      {loading ?
        <h1>There are no accommodations for this host!</h1> :
        <>
          <h1>All host's accommodations: </h1>
          {accommodations.map((a: any) => {
            return (
              <a onClick={() => navigateToAccommodationPage(a.id)}>
                <div className="host-accommodations__accommodation-card" key={a.id}>
                  <p>Id: {a.id}.</p>
                  <p>City: {a.name}</p>
                  <p>Minimum number of guests: {a.minGuests}</p>
                  <p>Maximum number of guests: {a.maxGuests}</p>
                </div>
              </a>
            );
          })}
        </>}
    </div>
  );
};

export default HostAccommodationsPage;