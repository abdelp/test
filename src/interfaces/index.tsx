import { RouteComponentProps  } from "react-router-dom";
interface Title {
  color: string;
  title: string;
}

interface UserProps extends RouteComponentProps {};

export type { Title, UserProps };
