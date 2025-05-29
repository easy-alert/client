import { useState, useEffect, useCallback } from 'react';

import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { IMaintenanceStatus } from '@customTypes/IMaintenanceStatus';

interface IMaintenanceCategoriesForSelect {
  companyId?: string;
  buildingId?: string;
  userId?: string;
}

export const useMaintenanceCategoriesForSelect = ({
  companyId,
  buildingId,
  userId,
}: IMaintenanceCategoriesForSelect) => {
  const [maintenanceCategoriesForSelect, setMaintenanceCategoriesForSelect] = useState<
    IMaintenanceStatus[]
  >([]);
  const [loadingMaintenanceCategoriesForSelect, setLoadingMaintenanceCategoriesForSelect] =
    useState<boolean>(true);

  const getMaintenanceCategoriesSelect = useCallback(async () => {
    setLoadingMaintenanceCategoriesForSelect(true);

    const uri = `/list/maintenances/categories`;

    const params = {
      companyId,
      buildingId,
      userId,
    };

    try {
      const response = await Api.get(uri, { params });

      setMaintenanceCategoriesForSelect(response.data.maintenanceCategories);
    } catch (error: any) {
      handleToastify(error.response);
    } finally {
      setLoadingMaintenanceCategoriesForSelect(false);
    }
  }, []);

  useEffect(() => {
    getMaintenanceCategoriesSelect();
  }, [getMaintenanceCategoriesSelect]);

  return {
    maintenanceCategoriesForSelect,
    loadingMaintenanceCategoriesForSelect,
  };
};
