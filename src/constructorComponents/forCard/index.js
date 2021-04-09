import loadable from '@loadable/component';

const Buttons = loadable(() => import('./Buttons'));
const Caption = loadable(() => import('./Caption'));
const Text = loadable(() => import('./Text'));
const Image = loadable(() => import('./Image'));

export default {
    Buttons, Caption, Text, Image
}


