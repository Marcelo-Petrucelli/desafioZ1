export class JWTPayloadDTO {
  constructor(public userID: number, public userEmail: string, public userFullName: string){}
}