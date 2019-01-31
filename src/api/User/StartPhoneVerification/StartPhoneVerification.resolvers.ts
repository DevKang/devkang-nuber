import Verification from "../../../entities/Verification";
import { Resolvers } from "src/types/resolvers";
import { StartPhoneVerificationMutationArgs, StartPhoneVerificationResponse } from "src/types/graph";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (_, args: StartPhoneVerificationMutationArgs) : Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args
      try {
        const exsistingVerification = await Verification.findOne({ payload: phoneNumber });
        if (exsistingVerification) {
          exsistingVerification.remove();
        }
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: 'PHONE'
        }).save();
        
        await sendVerificationSMS(newVerification.payload, newVerification.key)
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
    }
  }
};

export default resolvers;