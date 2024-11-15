export class JWTPayloadModel {
  //RFC 7519
  public sub: number = 0;
  public iss: string = "";
  public aud: string = "";
  public iat: number = 0;
  public exp: number = 0;
  public user: { id: number, fullName: string, email: string } = {id: 0, fullName: "", email: ""};
  
  private constructor(){}

  static fromData({ sub, iss, aud, duration, email, fullName } : {
    sub: number,
    iss: string,
    aud: string,
    duration: number,
    email: string,
    fullName: string
  }) : JWTPayloadModel {
    const ret = new JWTPayloadModel();
    ret.sub = sub;
    ret.iss = iss;
    ret.aud = aud;
    ret.iat = Date.now();
    ret.exp = ret.iat + (duration * 1000);
    ret.user = {id: sub, fullName: fullName, email: email };
    return ret;
  }

  static fromPayload(payload: any) : JWTPayloadModel | null {
    if(typeof payload === 'object' && payload !== null){  //Null is of type Object -.-
      const ret = new JWTPayloadModel();

      const properties = Object.getOwnPropertyNames(ret);
      const userProperties = Object.getOwnPropertyNames(ret.user);
      if(!properties.every((i) => payload.hasOwnProperty(i))){            //Sanity check for properties
        return null;
      }
      if(!userProperties.every((i) => payload.user.hasOwnProperty(i))){   //Sanity check for user properties
        return null;
      }

      ret.sub = payload.sub;
      ret.iss = payload.iss;
      ret.aud = payload.aud;
      ret.iat = payload.iat;
      ret.exp = payload.exp;
      ret.user.id = payload.user.id;
      ret.user.email = payload.user.email;
      ret.user.fullName = payload.user.fullName;
      return ret;
    }
    return null;
  }

  public toObject(extraData: Object = {}) : Object {
    return Object.assign(extraData, this);
  }
}