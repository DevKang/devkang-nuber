import User from "../../../entities/User";
import { Resolvers } from "src/types/resolvers";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (_, args:FacebookConnectMutationArgs): Promise<FacebookConnectResponse> => {
      try {
        const { fbId } = args
        const exsistingUser = await User.findOne({fbId: fbId})
        if (exsistingUser) {
          const token = createJWT(exsistingUser.id)
          return {
            ok: true,
            error: null,
            token
          }
        } 
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
      try {
        const { fbId } = args;
        const newUser = await User
          .create({ ...args, profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square` })
          .save();
        
          const token = createJWT(newUser.id)
        return {
          ok: true,
          error: null,
          token
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
  }
};

export default resolvers;