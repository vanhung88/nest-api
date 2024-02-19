import { sign } from 'jsonwebtoken';
import { JWTUser } from 'src/modules/auth/auth.type';
import { v4 as uuidv4 } from 'uuid';

export function generateAccessToken(user: JWTUser) {
  console.log('test 1');
  const accessToken = sign({ ...user }, process.env.ACCESS_TOKEN_SECRET_KEY);
  return accessToken;
}

export function generateRefreshToken() {
  const token = uuidv4();
  return token;
}
