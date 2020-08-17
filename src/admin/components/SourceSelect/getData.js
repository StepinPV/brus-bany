import axios from 'axios';

export default async function(source) {
    switch(source) {
        case 'page-folders':
            return (await axios.get('/api/page-folders')).data.data.map(item => {
                return {
                    id: item['_id'],
                    title: item['name']
                }
            });
        case 'page-templates':
            return (await axios.get('/api/page-templates')).data.data.map(item => {
                return {
                    id: item['_id'],
                    title: item['_id']
                }
            });
        default: return null;
    }
};
