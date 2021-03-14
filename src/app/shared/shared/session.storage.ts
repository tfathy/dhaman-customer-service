import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;
export async function getSessionInfo(key: string): Promise<any> {
  const item = await Storage.get({ key: key });
  return JSON.parse(item.value);
}
export interface sessionData {
  userId: string;
  token: string;
  tokenExpirationDate: string;
  loginName: string;
  compNameA: string;
  compNameE: string;
  compRef: string;
}

