import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchApi } from '../features/Feature';

export default function Redux() {
  const dispatch = useDispatch();

  // Fetch API data on component mount
  useEffect(() => {
    dispatch(fetchApi());
  }, [dispatch]);

  // Access state from Redux store
  const record = useSelector((state) => state.apiKey);

  return (
    <div>

      <div>
        <Link to="/Men">
          <button>Men</button>
        </Link>
        <Link to="/Women">
          <button>Women</button>
        </Link>
        <Link to="/Jwellray">
          <button>Jwellray</button>
        </Link>
        <Link to="/Electronic">
          <button>Electronic</button>
        </Link>
      </div>

      <div>
        {record?.data?.length > 0 ? (
          record.data.map((e) => (
            <div key={e.id} className="pr-div">
              <div className="pr-img">
                <img src={e.image} alt={e.title} />
              </div>
              <h2>{e.title}</h2>
              <h3>${e.price}</h3>
            </div>
          ))
        ) : (
          <p>Loading or no data available...</p>
        )}
      </div>
    </div>
  );
}
