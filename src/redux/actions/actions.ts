// Each Action Creator is preceded by its 'type'

export const ADD_NOTE = 'ADD_NOTE'
export function addNote(title: string, content: string) {
    return { type: ADD_NOTE, title: title, content: content }
}

export const REMOVE_NOTE = 'REMOVE_NOTE'
export function removeNote(id: string) {
    return { type: REMOVE_NOTE, id: id }
}