/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { ApiError } from '../../../error.js';
import type { MiUser } from '@/models/User.js';
import type { EventRsvpStatus } from '@/models/NoteEventRsvp.js';

export const meta = {
tags: ['notes', 'events'],
requireCredential: true,
kind: 'write:notes',
errors: {
noSuchNote: {
message: 'No such note.',
code: 'NO_SUCH_NOTE',
id: 'b11b5ef0-7ff2-491a-8bb7-09d1377a0601',
},
notAnEvent: {
message: 'The note is not an event.',
code: 'NOT_AN_EVENT',
id: 'd9b15273-df26-45ef-89a3-5c742c3f9102',
},
invalidStatus: {
message: 'Invalid RSVP status.',
code: 'INVALID_STATUS',
id: '86208bb4-cb88-46ba-a1cb-4bc153351d03',
},
},
} as const;

export const paramDef = {
type: 'object',
properties: {
noteId: {
type: 'string',
},
status: {
type: 'string',
enum: ['going', 'interested', 'notGoing'],
},
},
required: ['noteId', 'status'],
} as const;

export interface Params {
noteId: string;
status: EventRsvpStatus;
}

@Injectable()
export default class extends Endpoint<typeof meta, Params> {
public async action(params: Params, user: MiUser): Promise<{ status: EventRsvpStatus }> {
const validStatuses: EventRsvpStatus[] = ['going', 'interested', 'notGoing'];
if (!validStatuses.includes(params.status)) {
throw new ApiError(meta.errors.invalidStatus);
}

return {
status: params.status,
};
}
}
