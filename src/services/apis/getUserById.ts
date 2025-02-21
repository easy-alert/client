// GLOBAL API
import { Api } from '@services/api';

// GLOBAL UTILS
import { handleToastify } from '@utils/toastifyResponses';

// GLOBAL TYPES
import { IUser } from '@customTypes/IUser';

interface IGetUserById {
  userId: string;
}

interface IResponseGetUserById {
  data: {
    user: IUser;
  };
}

export async function getUserById({ userId }: IGetUserById) {
  const uri = `/user/${userId}`;

  try {
    const response: IResponseGetUserById = await Api.get(uri);

    return response.data.user;
  } catch (error: any) {
    handleToastify(error);
    return {} as IUser;
  }
}
