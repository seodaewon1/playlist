import React from 'react';
import useFetchData from '../hook/useFetchData';

import Loading from '../components/Loading';
import Error from '../components/Error';
import Chart from '../components/Chart';

const Mymusic = () => {
    const { data, loading, error } = useFetchData('./data/Daewon.json');

    if (loading) return <Loading loading={loading} />;
    if (error) return <Error message={error.message} />;

    return (
        <section id='myMusic'>
            <Chart
                title="🎵 머원이의 음악 리스트"
                data={data}
                showCalendar={false}
            />
        </section>
    );
}

export default Mymusic;