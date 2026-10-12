/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { ApiError } from '../../../error.js';
import type { MiUser } from '@/models/User.js';

export const meta = {
tags: ['notes', 'audio'],
requireCredential: true,
kind: 'write:drive',
errors: {
noSuchFile: {
message: 'No such file.',
code: 'NO_SUCH_FILE',
id: 'e45ab02c-15a0-48e2-9b22-81e1e07b3b01',
},
notAnAudioFile: {
message: 'Target file is not an audio file.',
code: 'NOT_AUDIO_FILE',
id: 'b82d334e-4f01-44be-bfa9-15886915e702',
},
emptyTranscript: {
message: 'Transcript text cannot be empty.',
code: 'EMPTY_TRANSCRIPT',
id: '71923cd4-90a1-4ce8-8921-88402abcc303',
},
},
} as const;

export interface Params {
fileId: string;
text: string;
language?: string;
}

@Injectable()
export default class extends Endpoint<typeof meta, Params> {
public async action(params: Params, user: MiUser): Promise<{ success: boolean; text: string; language: string }> {
if (!params.text || params.text.trim().length === 0) {
throw new ApiError(meta.errors.emptyTranscript);
}

return {
success: true,
text: params.text.trim(),
language: params.language ?? 'en',
};
}
}
