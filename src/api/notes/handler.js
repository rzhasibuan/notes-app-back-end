/* eslint-disable no-underscore-dangle */
class NotesServices {
  constructor(services) {
    this._services = services;
  }

  postNoteHandler(request, h) {
    try {
      const { title = 'untitled', body, tags } = request.payload;

      const noteId = this._services.addNote({ title, body, tags });

      const response = h.response({
        status: 'success',
        message: 'Note success created',
        data: {
          noteId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getNotesHandler() {
    const notes = this._services.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const note = this._services.getNotById(id);
      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;

      this._services.editNoteById(id, request.payload);
      return {
        status: 'success',
        message: 'notes has been updated',
      };
    } catch (error) {
      const response = h.response({
        status: 'success',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._services.deleteNoteById(id);
      return {
        status: 'success',
        message: 'notes has been deleted',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: 'Notes can not deleted, Id not found!',
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NotesServices;
