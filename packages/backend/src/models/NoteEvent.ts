/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { PrimaryColumn, Entity, JoinColumn, Column, OneToOne } from 'typeorm';
import { id } from './util/id.js';
import { MiNote } from './Note.js';

@Entity('note_event')
export class MiNoteEvent {
@PrimaryColumn(id())
public noteId: MiNote['id'];

@OneToOne(() => MiNote, {
onDelete: 'CASCADE',
})
@JoinColumn()
public note: MiNote | null;

@Column('varchar', {
length: 256,
})
public title: string;

@Column('varchar', {
length: 2048,
nullable: true,
})
public description: string | null;

@Column('timestamp with time zone')
public startedAt: Date;

@Column('timestamp with time zone', {
nullable: true,
})
public endedAt: Date | null;

@Column('varchar', {
length: 512,
nullable: true,
})
public location: string | null;
}
