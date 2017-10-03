import React from 'react';

import messageReducer from '../../reducers/messageReducer';

const oneByIdMessage = {
    '1': {
        id: 1,
        selected: true,
        subject: 'subject',
        read: false,
        starred: true,
        labels: ['dev', 'personal']
    }
};




describe('messageReducer Test ', () => {

    it("returns default state when existing state is undefined",  () => {
        expect(messageReducer(undefined,{type:'SOMETHING'}))
            .toEqual({ allIds:[], byIds:{} });
    });

    it("returns existing state when action is not handled",  () => {
        let existingState = {someother:'other', allIds:['xyz'], byIds:{abc: '123'}};

        expect(messageReducer({...existingState},{type:'SOMETHING'})).toEqual(existingState);
    });

    it("overrides existing state when action is LOAD_MESSAGES",  () => {
        let action ={type:'LOAD_MESSAGES',messages:[]};
        let existingState = {someother:'other', allIds:[1], byIds:{}};
        let newState = {someother:'other', allIds:[], byIds:{} };

        expect(messageReducer(existingState,action)).toEqual(newState);
    });

    it("overrides existing state when action is TOGGLE_MESSAGE_SELECTED",  () => {
        const byIdsSelectedTrue = {'1': {id: 1, selected: true,}};
        const byIdsSelectedFalse = {'1': {id: 1, selected: false,}};
        const action ={type:'TOGGLE_MESSAGE_SELECTED',id:1};
        const existingState = {someother:'other', allIds:[1], byIds: byIdsSelectedTrue};
        const newState =      {someother:'other', allIds:[1], byIds: byIdsSelectedFalse};

        expect(messageReducer(existingState,action)).toEqual(newState);
    });

    it("overrides existing state when action is DELETE_MESSAGES",  () => {
        const byIdsSelectedTrue = {'1': {id: 1, selected: true,}};
        const byIdsSelectedFalse = {'1': {id: 1, selected: false,}};

        const action ={type:'DELETE_MESSAGES',ids:[1]};

        const existingState = {someother:'other', allIds:[], byIds: {}};
        const newState =      {someother:'other', allIds:[], byIds: {}};

        expect(messageReducer(existingState,action)).toEqual(newState);
    });

    it("overrides existing state when action is UPDATE_STARRED_MESSAGE",  () => {
        const byIdsStarredFalse = {'1': {id: 1, starred: false}};
        const byIdsStarredTrue = {'1':{id: 1,   starred: true}};

        const action ={type:'UPDATE_STARRED_MESSAGE',id:1, starred: true};

        const existingState = {someother:'other', allIds:[1], byIds: byIdsStarredFalse};
        const newState =      {someother:'other', allIds:[1], byIds: byIdsStarredTrue};

        expect(messageReducer(existingState,action)).toEqual(newState);
    });

    it("overrides existing state when action is GET_MESSAGE_BODY",  () => {
        const byIdsNoBody = {'1': {id: 1 }};
        const byIdsWithBody = {'1':{id: 1, body: 'my Body'}};

        const action ={type:'GET_MESSAGE_BODY',id:1, body: 'my Body'};

        const existingState = {someother:'other', allIds:[1], byIds: byIdsNoBody};
        const newState =      {someother:'other', allIds:[1], byIds: byIdsWithBody};

        expect(messageReducer(existingState,action)).toEqual(newState);
    });

    it("overrides existing state when action is BULK_MESSAGE_SELECTED",  () => {
        const byIdsSelectedTrue = {'1': {id: 1, selected: true,}};
        const byIdsSelectedFalse = {'1': {id: 1, selected: false,}};

        const action ={type:'BULK_MESSAGE_SELECTED',selected:true};

        const existingState = {someother:'other', allIds:[1], byIds: byIdsSelectedFalse};
        const newState =      {someother:'other', allIds:[1], byIds: byIdsSelectedTrue};

        expect(messageReducer(existingState,action)).toEqual(newState);
    });

    it("overrides existing state when action is UPDATE_READ_MESSAGES",  () => {
        const byIdsReadFalse = {'1': {id: 1, selected: true, read: false}};
        const byIdsReadTrue = {'1': {id: 1, selected: true, read: true}};

        const action ={type:'UPDATE_READ_MESSAGES',ids:[1], read:true};

        const existingState = {someother:'other', allIds:[1], byIds: byIdsReadFalse};
        const newState =      {someother:'other', allIds:[1], byIds: byIdsReadTrue};

        expect(messageReducer(existingState,action)).toEqual(newState);
    });

    it("overrides existing state when action is ADD_LABELS",  () => {
        const byIdsNoLabel = {'1': {id: 1, selected: true, labels: [] }};
        const byIdsWithLabel = {'1': {id: 1, selected: true, labels: ['myLabel'] }};

        const action ={type:'ADD_LABELS',ids:[1], label:'myLabel'};

        const existingState = {someother:'other', allIds:[1], byIds: byIdsNoLabel};
        const newState =      {someother:'other', allIds:[1], byIds: byIdsWithLabel};

        expect(messageReducer(existingState,action)).toEqual(newState);
    });

    it("overrides existing state when action is REMOVE_LABELS",  () => {
        const byIdsNoLabel = {'1': {id: 1, selected: true, labels: [] }};
        const byIdsWithLabel = {'1': {id: 1, selected: true, labels: ['myLabel'] }};

        const action ={type:'REMOVE_LABELS',ids:[1], label:'myLabel'};

        const existingState = {someother:'other', allIds:[1], byIds: byIdsWithLabel};
        const newState =      {someother:'other', allIds:[1], byIds: byIdsNoLabel};

        expect(messageReducer(existingState,action)).toEqual(newState);
    });

    it("overrides existing state when action is CREATE_MESSAGE",  () => {
        const aMessage = {
            id: 2,
            selected: false,
            subject: 'subject',
            read: false,
            starred: true,
            labels: []
        };

        const byIdsMessage       = {'1': {id: 1, selected: true, labels: [] }};
        const byIdsMessageUpdate = {'1': {id: 1, selected: true, labels: [] },
                                    '2': aMessage};

        const action ={type:'CREATE_MESSAGE', message: aMessage};

        const existingState = {someother:'other', allIds:[1], byIds: byIdsMessage};
        const newState =      {someother:'other', allIds:[1,2], byIds: byIdsMessageUpdate};

        expect(messageReducer(existingState,action)).toEqual(newState);
    });


});