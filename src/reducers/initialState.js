export default {
    messages: {
        allIds: [], //(an array of ids)
        byIds: []    // (an object where the properties are ids, and the values are the objects)

    },
    toolbarActions: {
        toggleComposedForm: false,
    }
}

/*
 With redux you generally want to have:

 - A store where each domain object has two properties:
 - byId (an object where the properties are ids, and the values are the objects)
 - allIds (an array of ids)
 - Then components only pass each other ids
 - And all components (even the leaf nodes) look their data up in the store
 */
