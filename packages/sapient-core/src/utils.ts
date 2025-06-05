export const isObject = (item: unknown): item is Record<string, unknown> => {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
};

// TODO: might be implemented in the future for theme merge functionality :)
// export const mergeDeep = (...objects: any[]): any => {
//   const result = {};

//   for (const obj of objects) {
//     if (isObject(obj)) {
//       for (const key in obj) {
//         const val = obj[key];
//         if (isObject(val) && isObject((result as any)[key])) {
//           (result as any)[key] = mergeDeep((result as any)[key], val);
//         } else {
//           (result as any)[key] = val;
//         }
//       }
//     }
//   }

//   return result;
// };

export const cx = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};
