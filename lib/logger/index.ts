export const logger = {
  log: (message: string, ...rest: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, ...rest);
    }
  },
  error: (message: string, ...rest: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, ...rest);
    }
  },
  warn: (message: string, ...rest: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message, ...rest);
    }
  },
  info: (message: string, ...rest: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(message, ...rest);
    }
  },
  debug: (message: string, ...rest: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(message, ...rest);
    }
  },
  trace: (message: string, ...rest: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.trace(message, ...rest);
    }
  },
};
