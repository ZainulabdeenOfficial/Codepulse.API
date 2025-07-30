import { Categorey } from "../../Cetagorey/models/Cetagorey.model";


export interface BlogPosts{
  id: string;
  title: string,
  shortDescription: string,
  content: string,
  featuredImageUrl: string,
  urlHandle: string,
  publishedDate: string,
  author: string,
  isVisible: boolean,
  cetagories : Categorey[]
}
