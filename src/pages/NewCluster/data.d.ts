export type Cluster = {
  hosts: Host[];
};

export type Host = {
  name: string;
  address: string;
  internalAddress: string;
  key: string;
  password: string;
  port: number;
  user: string;
  roles: string[];
  arch: string;
  labels: { key: string; value: string }[];
};
