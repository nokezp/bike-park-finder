import { Provider } from "urql";
import { client } from "../lib/urql";
import { ReactNode } from "react";

interface UrqlProviderProps {
    children: ReactNode;
}

export function UrqlProvider({children}: UrqlProviderProps) {
    return <Provider value={client}>{children}</Provider>;
}