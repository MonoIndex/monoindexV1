import React, { useCallback, useMemo, useState } from 'react'
import { ThemeProvider } from 'react-neu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import TopBar from 'components/TopBar'

import { MediaQueryProvider } from 'contexts/MediaQuery'
import { BalancesProvider } from 'contexts/Balances'
import { AirdropProvider } from 'contexts/Airdrop'
import { ExternalAirdropProvider } from 'contexts/ExternalAirdrop'
import { FarmingProvider } from 'contexts/Farming'
import { FarmingTwoProvider } from 'contexts/FarmingTwo'
import { PricesProvider } from 'contexts/Prices'
import { WalletProvider } from 'contexts/Wallet'
import { BuySellProvider } from 'contexts/BuySell'
import { TransactionWatcherProvider } from 'contexts/TransactionWatcher'

import useLocalStorage from 'hooks/useLocalStorage'

import Farm from 'views/Farm'
import ContributorRewards from './views/ContributorRewards'

import createTheme from 'utils/createCustomTheme'
import graphqlClient from 'utils/graphql'
import { RewardsProvider } from './contexts/Rewards'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Router>
      <Providers>
        <StyledBackgroundDiv>
          <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
          <MobileMenu
            onDismiss={handleDismissMobileMenu}
            visible={mobileMenu}
          />
          <Switch>
            <Route exact path='/'>
              <Home title={'MonoIndex - Home'} />
            </Route>
            <Route exact path='/dpi'>
              <DPI title={'MonoIndex - DPI'} />
            </Route>
            <Route exact path='/mvi'>
              <MVI title={'MonoIndex - MVI'} />
            </Route>
            <Route exact path='/fli'>
              <FLI title={'MonoIndex - FLI'} />
            </Route>
            <Route exact path='/mid'>
              <INDEX title={'MonoIndex - MID'} />
            </Route>
            <Route exact path='/liquidity-mining'>
              <Farm title={'MonoIndex - Liquidity Mining'} />
            </Route>
            <Route exact path='/rewards'>
              <ContributorRewards title={'MonoIndex - Rewards'} />
            </Route>
          </Switch>
        </StyledBackgroundDiv>
      </Providers>
    </Router>
  )
}

const Providers: React.FC = ({ children }) => {
  const [darkModeSetting] = useLocalStorage('darkMode', true)
  const { dark: darkTheme, light: lightTheme } = useMemo(() => {
    return createTheme()
  }, [])

  return (
    <ThemeProvider
      darkModeEnabled={darkModeSetting}
      darkTheme={darkTheme}
      lightTheme={lightTheme}
    >
      <TransactionWatcherProvider>
        <WalletProvider>
          <ApolloProvider client={graphqlClient}>
            <MediaQueryProvider>
              <AirdropProvider>
                <RewardsProvider>
                  <ExternalAirdropProvider>
                    <BalancesProvider>
                      <FarmingProvider>
                        <FarmingTwoProvider>
                          <MviStakingRewardsProvider>
                            <PricesProvider>
                              <BuySellProvider>
                                <FliTokenMarketDataProvider>
                                  <FliIndexPortfolioDataProvider>
                                    <DpiTokenMarketDataProvider>
                                      <DpiIndexComponentsProvider>
                                            <MviTokenMarketDataProvider>
                                              <MviComponentsProvider>
                                                    {children}
                                              </MviComponentsProvider>
                                            </MviTokenMarketDataProvider>
                                      </DpiIndexComponentsProvider>
                                    </DpiTokenMarketDataProvider>
                                  </FliIndexPortfolioDataProvider>
                                </FliTokenMarketDataProvider>
                              </BuySellProvider>
                            </PricesProvider>
                          </MviStakingRewardsProvider>
                        </FarmingTwoProvider>
                      </FarmingProvider>
                    </BalancesProvider>
                  </ExternalAirdropProvider>
                </RewardsProvider>
              </AirdropProvider>
            </MediaQueryProvider>
          </ApolloProvider>
        </WalletProvider>
      </TransactionWatcherProvider>
      <ToastContainer transition={Slide} position='bottom-left' />
    </ThemeProvider>
  )
}

const StyledBackgroundDiv = styled.div`
  background: url(https://i.gyazo.com/d826aa2361dd4f5dbc9668c9f0e4e386.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
`

export default App
