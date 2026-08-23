export interface DeviceModel {
  id: number;
  name: string;
  manufacturer: string;
  model: string;
  ip: string;
  connectionType: "ssh" | "telnet" | "web";
  port: number;
  login: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}