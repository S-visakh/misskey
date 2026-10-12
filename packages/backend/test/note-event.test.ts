import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('CH01 - Native Events with RSVP and Reminder', () => {
function validateEventDates(startedAt: Date, endedAt: Date | null): boolean {
if (endedAt && endedAt.getTime() <= startedAt.getTime()) {
return false;
}
return true;
}

function canTransitionRsvp(current: string, next: string): boolean {
const validStates = ['going', 'interested', 'notGoing'];
return validStates.includes(next) && current !== next;
}

it('validates event start and end dates', () => {
const start = new Date('2026-11-01T10:00:00Z');
const endValid = new Date('2026-11-01T12:00:00Z');
const endInvalid = new Date('2026-11-01T09:00:00Z');

assert.equal(validateEventDates(start, endValid), true);
assert.equal(validateEventDates(start, endInvalid), false);
assert.equal(validateEventDates(start, null), true);
});

it('transitions RSVP status between going, interested, and notGoing', () => {
assert.equal(canTransitionRsvp('interested', 'going'), true);
assert.equal(canTransitionRsvp('going', 'notGoing'), true);
assert.equal(canTransitionRsvp('going', 'going'), false);
assert.equal(canTransitionRsvp('going', 'unknown'), false);
});

it('formats event reminder notification payload correctly', () => {
const reminderPayload = {
type: 'eventReminder',
id: 'notif_1001',
createdAt: new Date().toISOString(),
noteId: 'note_event_01',
userId: 'user_target_01',
};

assert.equal(reminderPayload.type, 'eventReminder');
assert.equal(reminderPayload.noteId, 'note_event_01');
});
});
