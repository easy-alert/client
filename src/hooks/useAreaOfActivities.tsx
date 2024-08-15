import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../services/api';
import { catchHandler } from '../utils/functions';

interface IAuxiliaryData {
  id: string;
  label: string;
}
export const useAreaOfActivities = ({ findAll }: { findAll: boolean }) => {
  const [areaOfActivities, setAreaOfActivities] = useState<IAuxiliaryData[]>([]);
  const { buildingNanoId } = useParams() as { buildingNanoId: string };

  const getAuxiliaryData = async () => {
    await Api.get(
      `/suppliers/extras/area-of-activities?findAll=${findAll}&buildingNanoId=${buildingNanoId}`,
    )
      .then((res) => {
        setAreaOfActivities(res.data.areaOfActivities);
      })
      .catch((err) => {
        catchHandler(err);
      });
  };

  useEffect(() => {
    getAuxiliaryData();
  }, []);

  return { areaOfActivities };
};
