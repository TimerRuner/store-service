import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { AccountService } from "../../account/account.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService
  ) {
    super({
      clientID: "323959376121-23or5994uv3gss9dmeuhvbi3o3ad0pq1.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/api/auth/google/callback",
      scope: ["profile", "email"]
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const {emails} = profile
    const email = emails[0].value
    try {
      const user = await this.authService.checkUser(email)
      if(user) {
        const accountStatus = await this.accountService.getAccountStatusByUserId(user.id)
        const userData = await this.authService.generateToken(user, {isActivated: accountStatus})
        done(null, userData)
      } else {
        done(null, {})
      }
    } catch (e) {
      done(new UnauthorizedException(), null)
    }
  }
}