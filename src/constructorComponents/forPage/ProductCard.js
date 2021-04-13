import React, { memo } from 'react';
import { useRouteMatch } from 'react-router';
import PropTypes from 'prop-types';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import styled from '@emotion/styled';
import ContainerComponent from './Container';
import { applyFields } from '../helpers';
import numberWithSpaces from '@utils/numberWithSpaces';
import withForm from '@plugins/Form/withForm';
import {css} from "@emotion/core";

const LeftContainer = styled.div`
    flex-basis: 928px;
    max-width: 100%;
    @media (max-width: 640px) {
        margin-bottom: 32px;
    }
`;

const RightContainer = styled.div`
    margin: 0 32px;
`;

const H1 = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
    max-width: 500px;
`;

const Description = styled.div`
    color: #777;
    font-size: 14px;
    margin-bottom: 32px;
`;

const Price = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-bottom: 24px;
`;

const Buttons = styled.div`
    margin-bottom: 32px;
    max-width: 400px;
`;

function ProductCard(props) {
    const match = useRouteMatch();

    if (props.staticContext && props.staticContext.simplePage) {
        props.staticContext.simplePage = false;
    }

    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <>
                <LeftContainer>
                    <Gallery images={props.images} staticContext={props.staticContext} />
                </LeftContainer>
                <RightContainer>
                    <H1 itemProp='name' dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.title) }} />
                    <Description itemProp='description' dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.description) }} />
                    <Price itemProp='offers' itemScope itemType='http://schema.org/Offer'>
                        <meta itemProp='price' content={props.price} />
                        <meta itemProp='priceCurrency' content="RUB" />
                        <link itemProp='availability' href='http://schema.org/InStock' />
                        {`${numberWithSpaces(props.price)} руб`}
                    </Price>
                    <Buttons>
                        {props.firstButton ? (
                            <Button
                                onClick={() => {
                                    props.showForm({ source: match.url, title: props.firstButton.formCaption });
                                }}
                                containerStyles={css`margin-bottom: 16px;`}
                                caption={props.firstButton.caption}
                                color='{ "type": "base", "value": "red" }'
                                size='s' />
                        ) : null}
                        {props.secondButton ? (
                            <Button
                                onClick={() => {
                                    props.showForm({ source: match.url, title: props.secondButton.formCaption });
                                }}
                                containerStyles={css`margin-bottom: 16px;`}
                                caption={props.secondButton.caption}
                                color='{ "type": "base", "value": "yellow" }'
                                size='s' />
                        ) : null}
                    </Buttons>
                    {props.additionalInfo ? (
                        <div dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.additionalInfo) }} />
                    ) : null}
                </RightContainer>
            </>
        </ContainerComponent>
    );
}

ProductCard.propTypes = {
    images: PropTypes.array,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    firstButton: PropTypes.object,
    secondButton: PropTypes.object,
    additionalInfo: PropTypes.string
};

ProductCard.defaultProps = {
    images: []
};

export default memo(withForm(ProductCard));
