import { get, post } from "../apiClient";
import {
  HouseholdInvites,
  HouseholdsInvitesResponse,
  Invite,
  FlattenedInvite,
  ProcessInviteRequest,
} from "../../entities/Invitation";

// Service for invite operations
const inviteService = {
  // Get all household invites
  getHouseholdInvites: async (): Promise<HouseholdInvites[]> => {
    // Get the response which contains { households: [...] }
    const response = await get<HouseholdsInvitesResponse>("/households");

    // Return just the households array
    return response.households;
  },

  // Find a specific invite by inviteId (client-side search)
  findInviteById: async (inviteId: string): Promise<FlattenedInvite | null> => {
    const households = await inviteService.getHouseholdInvites();

    for (const org of households) {
      for (const invite of org.invites) {
        if (invite.inviteId === inviteId) {
          return {
            ...invite,
            organizationId: org.organizationId,
            organizationName: org.organizationName,
            clientId: org.clientId,
            clientName: org.clientName,
            status: "pending", // Default status since API doesn't provide it
          };
        }
      }
    }

    return null;
  },

  // Flatten all invites for easier table display
  getFlattenedInvites: async (): Promise<FlattenedInvite[]> => {
    const households = await inviteService.getHouseholdInvites();
    const result: FlattenedInvite[] = [];

    households.forEach((org) => {
      org.invites.forEach((invite) => {
        result.push({
          ...invite,
          organizationName: org.organizationName,
          organizationId: org.organizationId,
          clientId: org.clientId,
          clientName: org.clientName,
          status: "pending", // Default status since API doesn't provide it
        });
      });
    });

    return result;
  },

  // Process invite acceptance or decline
  processInvite: async (
    organizationId: string,
    inviteId: string,
    data: ProcessInviteRequest
  ): Promise<any> => {
    const url = `/households/${organizationId}/invites/${inviteId}/process`;
    return await post(url, data);
  },
};

export default inviteService;
