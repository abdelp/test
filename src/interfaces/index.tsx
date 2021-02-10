import { RouteComponentProps  } from "react-router-dom";
interface Title {
  color: string;
  children: any;
}

interface UserProps extends RouteComponentProps {};

export type { Title, UserProps };
