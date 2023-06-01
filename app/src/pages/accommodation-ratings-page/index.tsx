import { useLocation, useNavigate } from 'react-router-dom';
import { deleteRateHost, getAllRatesByHostId } from '../../services/rateHostService';
import { useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getById } from '../../services/userService';
import AuthContext from '../../context/AuthContext';
import { deleteRateAccommodation, getAllRatesByAccommodationId } from '../../services/rateAccommodationService';
import { getAccommodationById } from '../../services/accommodationService';

const AccommodationRatingsPage = () => {
    const location = useLocation();
    const accommodationId = new URLSearchParams(location.search).get('id');
    const hostId = new URLSearchParams(location.search).get('hostId');
    const [rates, setRates] = useState<any[]>([]);
    const [accommodation, setAccommodation] = useState<string>('');
    const [hostFirstName, setHostFirstName] = useState<string>('');
    const [hostLastName, setHostLastName] = useState<string>('');
    const [AvgGrade, setAvgGrade] = useState<any>();
    const [guestFirstNames, setGuestFirstNames] = useState<any>({});
    const [guestLastNames, setGuestLastNames] = useState<any>({});
    const [loadingGuestFirstNames, setLoadingGuestFirstNames] = useState<boolean>(true);
    const [loadingGuestLastNames, setLoadingGuestLastNames] = useState<boolean>(true);
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const showAllRatings = async () => {
        try {
            const response = await getAllRatesByAccommodationId(Number(accommodationId));
            setRates(response.data);
        } catch (error) {
            console.error('Error occurred while fetching ratings:', error);
        }
    };

    const getAccommodationNameAndAvgGrade = async () => {
        let response = await getAccommodationById(Number(accommodationId));
        setAvgGrade(response.data.avgGrade);
        setAccommodation(response.data.name);
    }

    const getHostName = async () => {
        let response = await getById(Number(accommodationId));
        setHostFirstName(response.data.firstName);
        setHostLastName(response.data.lastName);
    };

    const getGuestFirstName = async (guestId: number) => {
        if (guestFirstNames[guestId]) {
            return guestFirstNames[guestId];
        }
        const response = await getById(guestId);
        const firstName = response.data.firstName;
        setGuestFirstNames((prevState: any) => ({
            ...prevState,
            [guestId]: firstName,
        }));
        return firstName;
    };

    const getGuestLastName = async (guestId: number) => {
        if (guestLastNames[guestId]) {
            return guestLastNames[guestId];
        }
        const response = await getById(guestId);
        const lastName = response.data.lastName;
        setGuestLastNames((prevState: any) => ({
            ...prevState,
            [guestId]: lastName,
        }));
        return lastName;
    };

    useEffect(() => {
        showAllRatings();
        getHostName();
        getAccommodationNameAndAvgGrade();
    }, []);

    useEffect(() => {
        const loadGuestNames = async () => {
            const promises = rates.map(rate => {
                const firstNamePromise = getGuestFirstName(rate.guestId);
                const lastNamePromise = getGuestLastName(rate.guestId);
                return Promise.all([firstNamePromise, lastNamePromise]);
            });
            await Promise.all(promises);
            setLoadingGuestFirstNames(false);
            setLoadingGuestLastNames(false);
        };

        if (rates.length > 0) {
            loadGuestNames();
        }
    }, [rates]);

    const handleRowClick = (guestId: number, accommodationId: number, id: number, hostId: number) => {
        if (guestId === Number(context.user.id)) {
            navigate(`/edit-accommodation-rating-page?accommodationId=${accommodationId}&id=${id}&hostId=${hostId}`);
        }
    };

    const deleteHostRate = async (rateId: number, accommodationId: number) => {
        let response = deleteRateAccommodation(rateId);
        navigate(`/accommodation-ratings-page?id=${accommodationId}`);
        window.location.reload();
    };

    const addHostRate = () => {
        navigate("/rate-accommodation-page");
    }

    return (
        <div className={styles['host-ratings-page']}>
            <table className={styles['rates-table']}>
                <thead>
                    <tr>
                        <th className={styles['host-first-name']}>Accommodation</th>
                        <th className={styles['guest-first-name']}>Guest Firstname</th>
                        <th className={styles['guest-last-name']}>Guest Lastname</th>
                        <th className={styles['rate-value']}>Rate Value</th>
                        <th className={styles['rate-date']}>Rate Date</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map(rate => (
                        <tr
                            className={styles['rate-row']}
                            key={rate.id}
                            onClick={() => handleRowClick(rate.guestId, rate.accommodationId, rate.id, rate.hostId)}
                        >
                            <td className={styles['host-first-name']}>{accommodation}</td>
                            <td className={styles['guest-first-name']}>
                                {loadingGuestFirstNames ? (
                                    <span>Loading...</span>
                                ) : (
                                    guestFirstNames[rate.guestId]
                                )}
                            </td>
                            <td className={styles['guest-last-name']}>
                                {loadingGuestLastNames ? (
                                    <span>Loading...</span>
                                ) : (
                                    guestLastNames[rate.guestId]
                                )}
                            </td>
                            <td className={styles['rate-value']}>{rate.rateValue}</td>
                            <td className={styles['rate-date']}>{rate.rateDate}</td>
                            {rate.guestId === Number(context.user.id) && (
                                <td>
                                    <button
                                        className={styles['delete-button']}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            deleteHostRate(rate.id, rate.accommodationId);
                                        }}
                                    >
                                        DELETE
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles['average-grade']}>Average Grade: {AvgGrade}</div>
            <button className={styles['average-grade']} onClick={() => addHostRate()}>Add Your Grade</button>
        </div>
    );
};

export default AccommodationRatingsPage;
