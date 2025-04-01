export interface ArrayChat{
  clase: string,
  texto: string,
  img: boolean
}
export interface Conversations{
  id: number,
  messages: ArrayChat[];
}
