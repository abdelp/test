import axios from 'axios';

const API_BASE = '';

const signinUser = async (username: any, password: any) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await axios.post(`${API_BASE}/login`, {
      username,
      password,
    },
    // @ts-ignore
    headers);
    return res;
  } catch (e) {
    throw new Error(e);
  }
};

// const getTherapists = async (token: any) => {
//   try {
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     };

//     const { data } = await axios
//       .get(
//         `${API_BASE}/therapists`,
//         {
//           headers,
//         },
//       );

//     return data;
//   } catch (e) {
//     throw new Error(e);
//   }
// };

const sendResult = async ({
  userId, result, token,
}: any) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const res = await axios
      .post(
        `${API_BASE}/users/${userId}/appointments`,
        {
          user_id: userId,
          result,
        },
        {
          headers,
        },
      );

    return res;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
};

const getCategories = async () =>
  // @ts-ignore
  ({
    name: 'Conductor B2',
    description: 'A description'
  },
  {
    name: 'Profesional',
    description: 'A description'
  });

export {
  signinUser, sendResult, getCategories
};
