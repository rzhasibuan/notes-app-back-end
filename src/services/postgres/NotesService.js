/* eslint-disable no-unused-vars */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toDateString();
    const updatedAt = createdAt;

    const query = {
      text: 'insert into values($1, $2, $3, $4, $5, $6) returning id',
      values: [id, title, body, tags, createdAt, updatedAt],
    };

    const result = this._pool.query(query);

    if (!result.row[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return result.row[0].id;
  }
}
