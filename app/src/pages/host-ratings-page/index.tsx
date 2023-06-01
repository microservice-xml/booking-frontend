import { useLocation, useNavigate } from 'react-router-dom';
import { deleteRateHost, getAllRatesByHostId } from '../../services/rateHostService';
import { useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getById } from '../../services/userService';
import AuthContext from '../../context/AuthContext';

const HostRatingsPage = () => {
    const location = useLocation();
    const hostId = new URLSearchParams(location.search).get('id');
    const [rates, setRates] = useState<any[]>([]);
    const [hostFirstName, setHostFirstName] = useState<string>('');
    const [hostLastName, setHostLastName] = useState<string>('');
    const [hostAvgGrade, setHostAvgGrade] = useState<any>();
    const [guestFirstNames, setGuestFirstNames] = useState<any>({});
    const [guestLastNames, setGuestLastNames] = useState<any>({});
    const [loadingGuestFirstNames, setLoadingGuestFirstNames] = useState<boolean>(true);
    const [loadingGuestLastNames, setLoadingGuestLastNames] = useState<boolean>(true);
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const showAllRatings = async () => {
        try {
            const response = await getAllRatesByHostId(Number(hostId));
            setRates(response.data);
        } catch (error) {
            console.error('Error occurred while fetching ratings:', error);
        }
    };

    const getHostName = async () => {
        let response = await getById(Number(hostId));
        setHostFirstName(response.data.firstName);
        setHostLastName(response.data.lastName);
        setHostAvgGrade(response.data.avgGrade);
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

    const handleRowClick = (guestId: number, id: number) => {
        if (guestId === Number(context.user.id)) {
            navigate(`/edit-host-rating-page?hostId=${hostId}&id=${id}`);
        }
    };

    const deleteHostRate = async (rateId: number, hostId: number) => {
        let response = deleteRateHost(rateId);
        navigate(`/host-ratings-page?id=${hostId}`);
        window.location.reload();
    };

    const addHostRate = () => {
        navigate("/rate-host-page");
    }


    return (
        <div className={styles['host-ratings-page']}>
            <table className={styles['rates-table']}>
                <thead>
                    <tr>
                        <th className={styles['host-first-name']}>Host Firstname</th>
                        <th className={styles['host-last-name']}>Host Lastname</th>
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
                            onClick={() => handleRowClick(rate.guestId, rate.id)}
                        >
                            <td className={styles['host-first-name']}>{hostFirstName}</td>
                            <td className={styles['host-last-name']}>{hostLastName}</td>
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
                                            deleteHostRate(rate.id, rate.hostId);
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
            <div className={styles['average-grade']}>Average Grade: {hostAvgGrade}</div>
            <button className={styles['average-grade']} onClick={() => addHostRate()}>Add Your Grade</button>
        </div>
    );
};

export default HostRatingsPage;
