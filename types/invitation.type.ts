import { components } from 'generatedV2/server.type';

import { Merchant } from './merchant';
import { Pagination } from './util.type';

export type InvitationStatus =
  components['schemas']['InvitationResponseDto']['status'];

export type InvitationType = 'SENT' | 'RECEIVED';

export type InvitationSearchInput =
  components['schemas']['InvitationSearch'] & {
    type?: 'SENT' | 'RECEIVED';
  };
export type InvitationSearchResponse =
  components['schemas']['PageInvitationResponseDto'];

export type InvitationSearchResponseContent =
  components['schemas']['PageInvitationResponseDto']['content'];
export type InvitationSearchResponseSingleContent =
  components['schemas']['InvitationResponseDto'];
export type Invitation = components['schemas']['InvitationResponseDto'];

export type InvitationAcceptPayload = components['schemas']['ConnectionMap'];
