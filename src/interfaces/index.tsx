import { RouteComponentProps } from "react-router-dom";
interface Title {
  color: string;
  children: any;
}

interface UserProps extends RouteComponentProps {}

interface UserAuth {
  codError: string,
  entidad: string,
  ListaMensajes: any,
  ticket: string
}

export type { Title, UserProps, UserAuth };
