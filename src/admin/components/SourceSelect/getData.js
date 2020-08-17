import axios from 'axios';

export default async function(source) {
    switch(source) {
        case 'page-folders': {
            const res = await axios.get('/api/page-folders');
            return res.data.data.map(item => {
                return {
                    id: item['_id'],
                    title: item['name']
                }
            });
        }
        case 'page-templates': {
            const res = await axios.get('/api/page-templates');
            return res.data.data.map(item => {
                return {
                    id: item['_id'],
                    title: item['_id']
                }
            });
        }
        default: {
            return null;
        }
    }
};
