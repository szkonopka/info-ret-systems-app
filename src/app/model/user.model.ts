export type User = Readonly<{
  login: string,
  password: string
}>;

export type LoginStatus = Readonly<{
  logged: boolean
}>;
