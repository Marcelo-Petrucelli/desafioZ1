/* class decorator */
export function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {constructor};
}

export interface BaseStaticDTO {
  from(dto: any) : any;
}