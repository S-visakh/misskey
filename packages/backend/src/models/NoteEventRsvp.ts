/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { PrimaryColumn, Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { id } from './util/id.js';
import { MiUser } from './User.js';
import { MiNote } from './Note.js';

export type EventRsvpStatus = 'going' | 'interested' | 'notGoing';

@Entity('note_event_rsvp')
@Index(['userId', 'noteId'], { unique: true })
export class MiNoteEventRsvp {
@PrimaryColumn(id())
public id: string;

@Index()
@Column({
...id(),
comment: 'The user ID.',
})
public userId: MiUser['id'];

@ManyToOne(() => MiUser, {
onDelete: 'CASCADE',
})
@JoinColumn()
public user: MiUser | null;

@Index()
@Column({
...id(),
comment: 'The target note ID containing the event.',
})
public noteId: MiNote['id'];

@ManyToOne(() => MiNote, {
onDelete: 'CASCADE',
})
@JoinColumn()
public note: MiNote | null;

@Column('varchar', {
length: 32,
default: 'going',
})
public status: EventRsvpStatus;

@Column('timestamp with time zone', {
default: () => 'CURRENT_TIMESTAMP',
})
public createdAt: Date;
}
