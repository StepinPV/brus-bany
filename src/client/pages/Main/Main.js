import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Top from './resources/Top';
import Categories from './resources/Categories';
import HowWork from './resources/HowWork';
import WhyMe from './resources/WhyMe';
import Video from './resources/Video';
import OurProduction from './resources/OurProduction';

class Main extends PureComponent {
    render() {
        return (
            <Page fixedHeader>
                <Top />
                <Categories />
                <HowWork />
                <WhyMe />
                <Video />
                <OurProduction />
            </Page>
        );
    }
}

export default Main;
