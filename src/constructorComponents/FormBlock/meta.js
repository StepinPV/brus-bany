// custom
export const props = [{
    _id: 'background',
    title: 'Цвет блока',
    type: 'select',
    items: [{
        id: 'white',
        title: 'Белый'
    }, {
        id: 'grey',
        title: 'Серый'
    }]
}];
export const name = 'Блок с изображением и формой';
export const defaultProps = {
    background: 'grey'
};

export const dependencies = ['Form', 'Caption', 'Text'];
