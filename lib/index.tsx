import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-components';
import { InMemoryCache } from 'apollo-cache-inmemory';
import mediumTheme from 'carbon-react/lib/style/themes/medium';
import { ThemeProvider } from 'styled-components';
import { MainComponent } from './components/main-component';

import 'carbon-react/lib/utils/css';
import './style.scss';

const httpLink = createHttpLink({
    uri: '/demo/service/X3CLOUDV2_SEED/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

window.onload = function() {
    ReactDOM.render(
        <ThemeProvider theme={mediumTheme}>
            <ApolloProvider client={client}>
                <MainComponent />
            </ApolloProvider>
        </ThemeProvider>,
        document.getElementById('root'),
    );
};
