export class ResponseDTO<T> {
  constructor(partial: Partial<ResponseDTO<T>>) {
    Object.assign(this, partial);
  }
  message: string;
  data: T;
}
