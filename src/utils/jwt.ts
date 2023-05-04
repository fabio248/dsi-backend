import { AppDataSource } from '../data-source';
import { configJwt } from '../config/config';
import jwt from 'jsonwebtoken';

function CreateAccessToken(email: any) {
  const expiredToken = new Date();
  expiredToken.setHours(expiredToken.getHours() + 3);

  const payload = {
    token_type: 'access_token',
    user_id: email,
    iat: Date.now(),
    exp: expiredToken.getTime(),
  };
  return jwt.sign(payload, configJwt.jwt_secret_key);
}

function RefreshAccessToken(email: any) {
  const expiredToken = new Date();
  expiredToken.setMonth(expiredToken.getMonth() + 1);

  const payload = {
    token_type: 'access_token',
    user_id: email,
    iat: Date.now(),
    exp: expiredToken.getTime(),
  };
  return jwt.sign(payload, configJwt.jwt_secret_key);
}

function decoderToken(token: any) {
  var decode = jwt.verify(token, configJwt.jwt_secret_key);
  return decode;
}

export { CreateAccessToken, RefreshAccessToken, decoderToken };
