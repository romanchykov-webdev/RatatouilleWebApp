// // app/components/Wrappers/WrapperAppServer.tsx
// import type { ReactNode } from 'react';
// import WrapperAppClient from '@/components/Wrappers/WrapperAppClient';
// import { fetchUserData } from '@/store/apiForServer/fetchUserData';
// import { fetchCategories } from '@/store/apiForServer/fetchCategories';
// import { fetchMeasurements } from '@/store/apiForServer/fetchMeasurements';
//
// interface WrapperAppServerProps {
//   children: ReactNode;
// }
//
// export default async function WrapperAppServer({ children }: WrapperAppServerProps) {
//   // 1. Получаем данные на сервере
//   const userData = await fetchUserData(); // можно через Redux Server Actions или plain fetch
//   const categories = await fetchCategories(userData?.appLang || 'en');
//   const measurements = await fetchMeasurements();
//
//
//   return (
//     <WrapperAppClient
//       userData={userData}
//       categories={categories}
//       measurements={measurements}
//     >
//       {children}
//     </WrapperAppClient>
//   );
// }
