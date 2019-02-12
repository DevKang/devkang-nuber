import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { ToggleDrivingModeResponse } from "../../../types/graph";
import User from "../../../entities/User";


const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(async (_, __, { req }) : Promise<ToggleDrivingModeResponse> => {
      const user: User = req.user;
      try {
        user.isDriving = !user.isDriving
        await user.save();
        return {
          ok: true,
          error: null
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        }
      }
    })
  }
}

export default resolvers;