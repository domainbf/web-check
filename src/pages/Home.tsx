import styled from 'styled-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, NavigateOptions } from 'react-router-dom';

import Heading from 'components/Form/Heading';
import Input from 'components/Form/Input'
import Button from 'components/Form/Button';
import { StyledCard } from 'components/Form/Card';
import Footer from 'components/misc/Footer';
import FancyBackground from 'components/misc/FancyBackground';

import docs from 'utils/docs';
import colors from 'styles/colors';
import { determineAddressType } from 'utils/address-type-checker';

const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'PTMono';
  padding: 0 1rem;
  footer {
    z-index: 1;
  }
`;

const UserInputMain = styled.form`
  background: ${colors.backgroundLighter};
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};
  border-radius: 8px;
  padding: 1rem;
  z-index: 5;
  margin: 1rem;
  width: calc(100% - 2rem);
  max-width: 50rem;
  z-index: 2;
`;

// const FindIpButton = styled.a`
//   margin: 0.5rem;
//   cursor: pointer;
//   display: block;
//   text-align: center;
//   color: ${colors.primary};
//   text-decoration: underline;
// `;

const ErrorMessage = styled.p`
  color: ${colors.danger};
  margin: 0.5rem;
`;

const SiteFeaturesWrapper = styled(StyledCard)`
  margin: 1rem;
  width: calc(100% - 2rem);
  max-width: 50rem;
  z-index: 2;
  .links {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    a {
      width: 100%;
      button {
        width: calc(100% - 2rem);
      }
    }
    @media(max-width: 600px) {
      flex-wrap: wrap;
    }
  }
  ul {
    -webkit-column-width: 150px;
    -moz-column-width: 150px;
    column-width: 150px;
    list-style: none;
    padding: 0 1rem;
    font-size: 0.9rem;
    li {
      margin: 0.1rem 0;
      text-indent: -1.2rem;
      break-inside: avoid-column;
    }
    li:before {
      content: '✓';
      color: ${colors.primary};
      margin-right: 0.5rem;
    }
  }
  a {
    color: ${colors.primary};
  }
`;

const Home = (): JSX.Element => {
  const defaultPlaceholder = ' 例如：F.AF';
  const [userInput, setUserInput] = useState('');
  const [errorMsg, setErrMsg] = useState('');
  const [placeholder] = useState(defaultPlaceholder);
  const [inputDisabled] = useState(false);
  const navigate = useNavigate();

  /* Check is valid address, either show err or redirect to results page */
  const submit = () => {
    let address = userInput.endsWith("/") ? userInput.slice(0, -1) : userInput;
    const addressType = determineAddressType(address);
  
    if (addressType === 'empt') {
      setErrMsg('字段不能为空');
    } else if (addressType === 'err') {
      setErrMsg('必须是有效的 URL、IPv4 或 IPv6 地址');
    } else {
      // if the addressType is 'url' and address doesn't start with 'http://' or 'https://', prepend 'https://'
      if (addressType === 'url' && !/^https?:\/\//i.test(address)) {
        address = 'https://' + address;
      }
      const resultRouteParams: NavigateOptions = { state: { address, addressType } };
      navigate(`/results/${encodeURIComponent(address)}`, resultRouteParams);
    }
  };
  

  /* Update user input state, and hide error message if field is valid */
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    const isError = ['err', 'empt'].includes(determineAddressType(event.target.value));
    if (!isError) setErrMsg('');
  };

  // const findIpAddress = () => {
  //   setUserInput('');
  //   setPlaceholder('查询你的IP...');
  //   setInputDisabled(true);
  //   fetch('https://ipapi.co/json/')
  //     .then(function(response) {
  //       response.json().then(jsonData => {
  //         setUserInput(jsonData.ip);
  //         setPlaceholder(defaultPlaceholder);
  //         setInputDisabled(true);
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log('Failed to get IP address :\'(', error)
  //     });
  // };

  const formSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  }

  return (
    <HomeContainer>
      <FancyBackground />
      <UserInputMain onSubmit={formSubmitEvent}>
        <Heading as="h1" size="xLarge" align="center" color={colors.primary}>
          <img width="64" src="/web-check.png" alt="Web Check Icon" />
          Network hacker
        </Heading>
        <Input
          id="user-input"
          value={userInput}
          label="输入网址或IP可查看详细信息"
          size="large"
          orientation="vertical"
          placeholder={placeholder}
          disabled={inputDisabled}
          handleChange={inputChange}
        />
        {/* <FindIpButton onClick={findIpAddress}>Or, find my IP</FindIpButton> */}
        { errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
            <Button styles="width: calc(100% - 1rem);" size="large" onClick={submit}>点击获取!</Button>
      </UserInputMain>
      <SiteFeaturesWrapper>
        <div className="features">
          <Heading as="h2" size="small" color={colors.primary}>支持的部分可查内容展示</Heading>
          <ul>
            {docs.map((doc, index) => (<li key={index}>{doc.title}</li>))}
            <li><a href="/about">+ more!</a></li>
          </ul>
        </div>
        <div className="links">
          <a href="https://tools.st" title="一个域名注册比价，whois域名注册查询，dns域名历史等收集整理域名相关的网址导航。">
            <Button>域名注册比价</Button>
          </a>
          <a href="https://whois.ls" title="免费的全球新顶级与国别域名注册情况查询平台">
            <Button>whois信息查询</Button>
          </a>
          <a href="https://lijiawei.cn" title="先锋少先队员及社会主义接班人">
            <Button>关于我</Button>
          </a>
        </div>
      </SiteFeaturesWrapper>
      <Footer isFixed={true} />
    </HomeContainer>
  );
}

export default Home;
