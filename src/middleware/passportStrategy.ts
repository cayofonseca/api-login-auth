import passport from "passport";
import { environment } from "../config/environment";
import { ExtractJwt } from "passport-jwt";
import { userRepository } from "../repositories/userRepository";
import { Strategy as JwtStrategy } from "passport-jwt";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: environment.jwt_key as string,
};

passport.use(
    new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await userRepository.findByEmail(payload.email);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;
