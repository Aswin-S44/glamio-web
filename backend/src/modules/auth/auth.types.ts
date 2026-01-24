export interface GoogleAuthResponse {
  token: string;
  user: {
    uid: string;
    email: string;
    name?: string;
    picture?: string;
  };
}
