import axios from "axios";
import crypto from "crypto";

interface CredentialI {
  applicationKeyId: string | undefined;
  applicationKey: string | undefined;
  accountId: any;
  apiUrl: any;
  authorizationToken: any;
  downloadUrl: any;
  recommendedPartSize: any;
}

export async function authenticateB2() {
  const applicationKeyId = process.env.B2_KEY_ID;
  const applicationKey = process.env.B2_APP_KEY;
  const encodedBase64 = new Buffer(
    applicationKeyId + ":" + applicationKey
  ).toString("base64");

  let res;

  try {
    res = await axios.post(
      `https://api.backblazeb2.com/b2api/v2/b2_authorize_account`,
      {},
      {
        headers: { Authorization: "Basic " + encodedBase64 },
      }
    );
  } catch (error) {
    throw new Error(error);
  }

  const {
    accountId,
    apiUrl,
    authorizationToken,
    downloadUrl,
    recommendedPartSize,
  } = res.data;

  const credentials = {
    applicationKeyId,
    applicationKey,
    accountId,
    apiUrl,
    authorizationToken,
    downloadUrl,
    recommendedPartSize,
  };
  return credentials;
}

export async function getUploadURL(credentials: CredentialI) {
  let res;

  try {
    res = await axios.post(
      `${credentials.apiUrl}/b2api/v1/b2_get_upload_url`,
      { bucketId: process.env.B2_BUCKET_ID },
      { headers: { Authorization: credentials.authorizationToken } }
    );
  } catch (error) {
    throw new Error(error);
  }

  const { uploadUrl, authorizationToken } = res.data;

  return { uploadUrl, uploadToken: authorizationToken };
}

export async function uploadFile(
  file: Express.Multer.File,
  uploadUrl: { uploadUrl: string; uploadToken: string },
  dataSet: string
) {
  const fileName = file.originalname;
  const fileSize = file.size;
  const sha1 = crypto.createHash("sha1").update(file.buffer).digest("hex");

  let res;

  try {
    res = await axios.post(uploadUrl.uploadUrl, file.buffer, {
      headers: {
        Authorization: uploadUrl.uploadToken,
        "X-Bz-File-Name": `${dataSet}/${fileName}`,
        "Content-Type": "b2/x-auto",
        "Content-Length": fileSize,
        "X-Bz-Content-Sha1": sha1,
        "X-Bz-Info-Author": "unknown",
      },
    });
  } catch (error) {
    throw new Error(error);
  }

  return res.data;
}
