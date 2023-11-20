// export const storage = createSessionStorage({
//   cookie: {
//     name: 'session',
//     secure: true,
//     sameSite: 'lax',
//     httpOnly: true
//   },
//   async createData(data, expires) {
//     return '';
//   },
//   async updateData(id, data, expires) {
//     return;
//   },
//   async deleteData(id) {
//     return;
//   },
//   async readData(id) {
//     return ;
//   }
// });

// interface ClubsNEUStorage {
//   accessToken?: string;
// }

// const getStorage = () => {
//   if (typeof window !== 'undefined') {
//     return sessionStorage;
//   }
// };

// export const [storage, setStorage] = makePersisted(
//   createSignal<ClubsNEUStorage>({}),
//   {
//     storage: getStorage()
//   }
// );
