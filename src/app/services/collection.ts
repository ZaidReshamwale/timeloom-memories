import { CreateCollectionPayload } from "../types";

export async function createUserCollection(
  userUid: string,
  payload: CreateCollectionPayload,
  token: string
) {
  const response = await fetch(`/api/user/${userUid}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/vnd.synchronoss.cm-1.0+json;charset=UTF-8",
      Accept: "application/vnd.synchronoss.cm-1.0+json",
      "X-Client-Identifier": "XXX-BUAP-PORTAL",
      "X-Client-Platform": "WEB",
      "X-Tx-Id": crypto.randomUUID(),
      Authorization: `NWB token="${token}" authVersion="1.0"`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HTTP ${response.status}: ${err}`);
  }

  return response.json();
}
