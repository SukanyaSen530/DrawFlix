import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/*
 * All the routes related to Notes are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 */

/*
 * This handler handles getting all user's video notes.
 * send GET Request at /api/user/notes/:videoId
 */

export const getUserVideoNotes = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }

    const { videoId } = request.params;
    const notes = user.notes.find((item) => item._id === videoId);

    return new Response(200, {}, { notes: notes || {} });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/*
 * This handler handles adding notes to a video.
 * send POST Request at /api/user/notes/:videoId
 * body contains {note}
 */

export const addNewNote = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }

    const { videoId } = request.params;
    const { note } = JSON.parse(request.requestBody);
    const videoNote = user.notes.find((item) => item._id === videoId);

    let newVideoNote = { _id: videoId };
    if (!videoNote) {
      newVideoNote.notes = [];
      newVideoNote.notes.push({ _id: uuid(), ...note });
      user.notes.push(newVideoNote);
    } else {
      videoNote.notes.push({ _id: uuid(), ...note });
    }

    return new Response(
      201,
      {},
      { notes: !videoNote ? newVideoNote : videoNote }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/*
 * This handler handles updating s note of a video.
 * send POST Request at /api/user/notes/:videoId/:notedId
 * body contains {note_description}
 */

export const updateNote = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }

    const { videoId, noteId } = request.params;
    const { description } = JSON.parse(request.requestBody);
    const videoNote = user.notes.find((item) => item._id === videoId);
    const updatedNotes = videoNote?.notes?.map((note) =>
      note._id === noteId ? { ...note, description } : note
    );
    videoNote.notes = updatedNotes;
    return new Response(200, {}, { notes: videoNote });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/*
 * This handler handles deleting note.
 * send DELETE Request at /api/user/notes/:videoId/:notesId
 */

export const deleteNote = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }

    const { videoId, noteId } = request.params;
    const videoNote = user.notes.find((item) => item._id === videoId);
    const filteredNotes = videoNote.notes?.filter(
      (note) => note._id !== noteId
    );

    videoNote.notes = filteredNotes;
    return new Response(200, {}, { notes: videoNote });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/*
 * This handler handles deleting all notes of a video.
 * send DELETE Request at /api/user/notes/:videoId/all
 */

export const clearVideoNotes = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }

    const { videoId } = request.params;
    const videoNote = user.notes.find((item) => item._id === videoId);
    videoNote.notes = [];
    return new Response(200, {}, {});
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
