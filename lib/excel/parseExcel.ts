import readXlsxFile from 'read-excel-file/node';

import { schema } from './schema';

export const parseExcel = async (filePath: string) => {
  const { rows, errors } = await readXlsxFile(filePath, { schema });
  console.log(
    '🚀 ~ file: parseExcel.ts ~ line 7 ~ parseExcel ~ errors',
    errors,
  );
  if (errors.length > 0) {
    return {
      error: true,
      errors,
      rows,
    };
  } else {
    return {
      error: false,
      errors,
      rows,
    };
  }
};
