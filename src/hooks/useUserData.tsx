import { useState, useEffect, useCallback } from 'react';

import { getUserById } from '@services/apis/getUserById';

import type { IUser } from '@customTypes/IUser';

interface IGetUserById {
  userId: string;
}

export const useUserData = ({ userId }: IGetUserById) => {
  const [userData, setUserData] = useState<IUser>({} as IUser);
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true);

  const handleGetUserById = useCallback(async () => {
    try {
      const responseData = await getUserById({ userId });
      setUserData(responseData);
    } finally {
      setTimeout(() => {
        setLoadingUserData(false);
      }, 1000);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    handleGetUserById();
  }, [handleGetUserById]);

  return {
    userData,
    loadingUserData,
  };
};
