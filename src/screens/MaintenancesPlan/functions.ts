import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IMaintenancesPlan, IRequestMaintenancesPlan } from './types';

export const requestMaintenancesPlan = async ({
  setMaintenancesPlan,
  setFilteredMaintenancesPlan,
  buildingId,
  setLoading,
  setOnQuery,
  setBuilding,
  setFilterOptions,
  year,
  currentYear,
  month,
  status,
}: IRequestMaintenancesPlan) => {
  setOnQuery(true);

  const uri = `/building/${buildingId}`;

  const params = {
    year: String(currentYear) < year ? String(currentYear) : year,
  };

  try {
    const response = await Api.get(uri, { params });

    if (response.status === 200) {
      let filtered: IMaintenancesPlan[] = [];

      response.data.months.forEach((maintenance: IMaintenancesPlan) => {
        filtered.push({
          ...maintenance,
          dates: maintenance.dates.filter((date) => date.dateInfos.year === Number(year)),
        });
      });

      if (month !== '') {
        filtered = filtered.filter((maintenance) => maintenance.monthNumber === month);
      }

      const filteredStatus: IMaintenancesPlan[] = [];

      if (status !== '') {
        filtered.forEach((maintenance) => {
          filteredStatus.push({
            ...maintenance,
            dates: maintenance.dates.filter((date) => date.status === status),
          });
        });
      }

      setFilteredMaintenancesPlan(filteredStatus.length ? filteredStatus : filtered);
      setMaintenancesPlan(response.data.months);
      setFilterOptions(response.data.Filters);
      setBuilding(response.data.building);
      setLoading(false);
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      window.open('https://easyalert.com.br/', '_self');
    } else {
      catchHandler(error);
      setLoading(false);
    }
  } finally {
    setOnQuery(false);
  }
};
