export const getAllIds = messages => {
    if (!messages) return [];
    return messages.map(m => m.id);
 };

export const getByIds = messages => {
    if (!messages) return [];
    return messages.reduce((acc, item) => ({...acc, [item.id]: item,}),{})
}

export const getSelectedMessageIds = ({allIds, byIds}) => {
    if (!allIds && !byIds) return [];
    return allIds.filter(id => byIds[id].selected);
}

export const doesLabelExist = (message, labelName) => {
    let indexOfItem = message.labels.findIndex(label => {return label === labelName;});
    return indexOfItem !== -1;
}

export const toggleSelectedMessage = message => {
    return {...message, selected: !message.selected}
}

