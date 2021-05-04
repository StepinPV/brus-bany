import loadable from '@loadable/component';

const Caption = loadable(() => import('./Caption'));
const Text = loadable(() => import('./Text'));
const Button = loadable(() => import('./Button'));
const Breadcrumbs = loadable(() => import('./Breadcrumbs'));
const QuestionAnswer = loadable(() => import('./QuestionAnswer'));
const Banner = loadable(() => import('./Banner'));
const Banner2 = loadable(() => import('./Banner2'));
const Header = loadable(() => import('./Header'));
const Footer = loadable(() => import('./Footer'));
const FormBlock = loadable(() => import('./FormBlock'));
const Contacts = loadable(() => import('./Contacts'));
const ImageLinkBlock = loadable(() => import('./ImageLinkBlock'));
const ImageLinkBlocks = loadable(() => import('./ImageLinkBlocks'));
const Quiz = loadable(() => import('./Quiz'));
const Image = loadable(() => import('./Image'));
const Pages = loadable(() => import('./Pages'));
const SocialShare = loadable(() => import('./SocialShare'));
const ImageTiles = loadable(() => import('./ImageTiles'));
const Iframe = loadable(() => import('./Iframe'));
const Links = loadable(() => import('./Links'));
const HowWork = loadable(() => import('./HowWork'));
const WhyMe = loadable(() => import('./WhyMe'));
const ProductCard = loadable(() => import('./ProductCard'));

const Calculator = loadable(() => import('./custom/Calculator'));

export default {
    Caption, Text, Button, Breadcrumbs, Banner, Banner2, QuestionAnswer, ImageLinkBlock, ImageLinkBlocks,
    Image, Header, Footer, Contacts, FormBlock, Quiz, Pages, SocialShare, ImageTiles,
    Iframe, Links, HowWork, WhyMe, ProductCard, Calculator
}


