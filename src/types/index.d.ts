export type IMsgDataTypes = {
  id: string;
  roomId: string;
  msg: string;
  count: number;
  isLiked?: boolean;
};

export type PostFormInput = {
  title: string;
};

export type ResponseData = {
  message: string;
  responseData: IMsgDataTypes[] | IMsgDataTypes;
  data?: any;
};
