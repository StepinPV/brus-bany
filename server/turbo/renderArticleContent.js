const renderText = (text) => {
    return text ? `<p>${text}</p>` : '';
};

const renderImage = (value) => {
    const { image, description } = value || {};

    return image ? `
            <figure>
                <img src="${image}"/>
                ${description ? `<figcaption>${description}</figcaption>` : ''}
            </figure>
        ` : '';
};

const renderMarkerList = (values) => {
    return `
            <ul>
                ${values.map(value => `
                    <li>
                        ${value.caption ? `<p><b>${value.caption}</b></p>` : ''}
                        ${value.text ? `<p>${value.text}</p>` : ''}
                        ${value.image ? renderImage({
        image: value.image,
        description: value.imageDescription
    }) : ''}
                    </li>
                `)}
            </ul>
        `;
};

const renderNumericList = (values) => {
    return `
            <ol>
                ${values.map(value => `
                    <li>
                        ${value.caption ? `<p><b>${value.caption}</b></p>` : ''}
                        ${value.text ? `<p>${value.text}</p>` : ''}
                        ${value.image ? renderImage({
        image: value.image,
        description: value.imageDescription
    }) : ''}
                    </li>
                `)}
            </ol>
        `;
};

const renderItem = (item) => {
    const { typeId, value } = item || {};

    switch (typeId) {
        case 'text': return renderText(value);
        case 'image': return renderImage(value);
        case 'marker-list': return renderMarkerList(value);
        case 'numeric-list': return renderNumericList(value);
        default: return '';
    }
};

const renderBlock = (block) => {
    const { caption, content } = block;

    return `
            ${caption ? `<h2>${caption}</h2>` : ''}
            ${content ? content.map((data) => renderItem(data.item)).join('') : ''}
        `;
};

module.exports = function renderArticle(content) {
    return content.map((item) => renderBlock(item)).join('')
};
