import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchShelters } from '../redux/actions/shelters';

export const useShelters = () => {
  const dispatch = useDispatch();
  const shelters = useSelector((state) => state.shelters);

  useEffect(() => {
    if (shelters.length === 0) {
      dispatch(fetchShelters());
    }
  }, [dispatch, shelters.length]);

  return shelters;
};
