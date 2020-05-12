export type Document = Readonly<{
  id: number,
  title: string,
  text: string
}>;

export type User = Readonly<{
  login: string,
  password: string
}>;
