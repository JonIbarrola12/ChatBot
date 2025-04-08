//Interfaz para el array arrayChat
export interface ArrayChat{
  clase: string,
  texto: string,
  img: boolean
}
//Interfaz para el array conversations
export interface Conversations{
  id: number,
  messages: ArrayChat[];
  date: string
  title:string
}
