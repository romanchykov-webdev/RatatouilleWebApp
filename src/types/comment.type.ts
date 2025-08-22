export interface ICommentDta {
  post_id: string; // id recipe
  user_id_commented: string; // id user  commented
  comment: string; //text by comment
}

export interface ICommentDtaResponse {
  id: string;
  post_id: string; // id recipe
  user_id_commented: string; // id user  commented
  comment: string; //text by comment
  created_at: string;
}

export interface IAllUserCommentedRecipe {
  user_id: string;
  user_name: string;
  avatar: string;
}
