import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchShelters } from '../redux/actions/shelters';

export const useShelters = () => {
  const dispatch = useDispatch();
  const shelters = useSelector((state) => state.shelters);

  useEffect(() => {
    dispatch(fetchShelters());
  }, [dispatch]);

  return shelters;
};
