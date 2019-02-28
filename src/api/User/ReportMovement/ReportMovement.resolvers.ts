import User from "../../../entities/User";
import {
  ReportMovementResponse,
  ReportMovementMutationArgs
} from "src/types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNull = cleanNullArgs(args);
        try {
          const updatedUser:User = Object.assign(user, notNull)
          await User.update({id:user.id}, { ...notNull });
          pubSub.publish('driverUpdate', { DriversSubscription: updatedUser })
          return {
            ok: true,
            error: null,
          }
        } catch(error) {
          return {
            ok: false,
            error: error.message
          }
        }
      }
    )
  }
};

export default resolvers;
