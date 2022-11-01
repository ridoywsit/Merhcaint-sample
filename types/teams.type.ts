import { components } from 'generatedV2/server.type';

export type TeamInvitationStatus = 'INVITED' | 'JOINED' | 'REJECTED';
export type TeamInvitationStatusToString =
  components['schemas']['TeamInvitation']['statusToString'];
export type TeamInvitation = components['schemas']['TeamInvitation'];
