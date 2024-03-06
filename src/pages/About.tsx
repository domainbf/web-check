import styled from 'styled-components';

import colors from 'styles/colors';
import Heading from 'components/Form/Heading';
import Footer from 'components/misc/Footer';
import Nav from 'components/Form/Nav';
import Button from 'components/Form/Button';
import AdditionalResources from 'components/misc/AdditionalResources';
import { StyledCard } from 'components/Form/Card';
import docs, { about, featureIntro, license, fairUse, supportUs } from 'utils/docs';

const AboutContainer = styled.div`
width: 95vw;
max-width: 1000px;
margin: 2rem auto;
padding-bottom: 1rem;
header {
  margin 1rem 0;
  width: auto;
}
section {
  width: auto;
  .inner-heading { display: none; }
}
`;

const HeaderLinkContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  a {
    text-decoration: none;
  }
`;

const Section = styled(StyledCard)`
  margin-bottom: 2rem;
  overflow: clip;
  max-height: 100%;
  section {
    clear: both;
  }
  h3 {
    font-size: 1.5rem;
  }
  hr {
    border: none;
    border-top: 1px dashed ${colors.primary};
    margin: 1.5rem auto;
  }
  ul {
    padding: 0 0 0 1rem;
    list-style: circle;
  }
  a {
    color: ${colors.primary};
    &:visited { opacity: 0.8; }
  }
  pre {
    background: ${colors.background};
    border-radius: 4px;
    padding: 0.5rem;
    width: fit-content;
  }
  small { opacity: 0.7; }
  .contents {
    ul {
      list-style: none;
      li {
        a {
          // color: ${colors.textColor};
          &:visited { opacity: 0.8; }
        }
        b {
          opacity: 0.75;
          display: inline-block;
          width: 1.5rem;
        }
      }
    }
  }
  .example-screenshot {
    float: right; 
    display: inline-flex;
    flex-direction: column;
    clear: both;
    max-width: 300px;
    img {
      float: right;
      break-inside: avoid;
      max-width: 300px;
      // max-height: 30rem;
      border-radius: 6px;
      clear: both;
    }
    figcaption {
      font-size: 0.8rem;
      text-align: center;
      opacity: 0.7;
    }
  }
`;

const makeAnchor = (title: string): string => {
  return title.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, "-");
};

const About = (): JSX.Element => {
  return (
    <div>
    <AboutContainer>
      <Nav>
        <HeaderLinkContainer>
          <a href="https://lijiawei.cn"><Button>不讲李</Button></a>
        </HeaderLinkContainer>
      </Nav>

      <Heading as="h2" size="medium" color={colors.primary}>介绍</Heading>
      <Section>
        {about.map((para, index: number) => (
          <p key={index}>{para}</p>
        ))}
        <hr />
        <p>
          首先感谢项目负责人及开源人 by <a href="https://aliciasykes.com">Alicia Sykes</a>.
          本站部署旨在作为公益项目服务中使用，未考虑盈利问题，仅出于个人需要，并且想来应该不会有出我之外的其他人使用本款应用程序。
        </p>
      </Section>
      
      <Heading as="h2" size="medium" color={colors.primary}>Features</Heading>
      <Section>
        {featureIntro.map((fi: string, i: number) => (<p key={i}>{fi}</p>))}
        <div className="contents">
        <Heading as="h3" size="small" id="#feature-contents" color={colors.primary}>Contents</Heading>
          <ul>
            {docs.map((section, index: number) => (
              <li>
                <b>{index + 1}</b>
                <a href={`#${makeAnchor(section.title)}`}>{section.title}</a></li>
            ))}
          </ul>
          <hr />
        </div>
        {docs.map((section, sectionIndex: number) => (
          <section key={section.title}>
            { sectionIndex > 0 && <hr /> }
            <Heading as="h3" size="small" id={makeAnchor(section.title)} color={colors.primary}>{section.title}</Heading>
            {section.screenshot &&
              <figure className="example-screenshot">
                <img className="screenshot" src={section.screenshot} alt={`Example Screenshot ${section.title}`} />
                <figcaption>Fig.{sectionIndex + 1} - Example of {section.title}</figcaption>
              </figure> 
            }
            {section.description && <>
              <Heading as="h4" size="small">Description</Heading>
              <p>{section.description}</p>
            </>}
            { section.use && <>
              <Heading as="h4" size="small">Use Cases</Heading>
              <p>{section.use}</p>
            </>}
            {section.resources && section.resources.length > 0 && <>
              <Heading as="h4" size="small">Useful Links</Heading>
              <ul>
                {section.resources.map((link: string | { title: string, link: string }, linkIndx: number) => (
                  typeof link === 'string' ? (
                    <li id={`link-${linkIndx}`}><a target="_blank" rel="noreferrer" href={link}>{link}</a></li>
                  ) : (
                    <li id={`link-${linkIndx}`}><a target="_blank" rel="noreferrer" href={link.link}>{link.title}</a></li>
                  )
                ))}
              </ul>
            </>}
          </section>
        ))}
      </Section>

      <Heading as="h2" size="medium" color={colors.primary}>本站托管在Netlify

部署到Netlify</Heading>
      <Section>
        <p>本站所有内容数据均储存在.</p>
        <Heading as="h3" size="small" color={colors.primary}>GitHub</Heading>
        <p>应用部署部署在 Netlify</p>

          </li>
        </ul>
{/*     
**Configuration Settings**:
- `CHROME_PATH` (e.g. `/usr/bin/chromium`) - The path the the Chromium executable
- `PORT` (e.g. `3000`) - Port to serve the API, when running server.js
- `DISABLE_GUI` (e.g. `false`) - Disable the GUI, and only serve the API
- `API_TIMEOUT_LIMIT` (e.g. `10000`) - The timeout limit for API requests, in milliseconds
- `REACT_APP_API_ENDPOINT` (e.g. `/api`) - The endpoint for the API (can be local or remote)</p> */}

      </Section>

      <Heading as="h2" size="medium" color={colors.primary}>API文档</Heading>
      <Section>
        {/* eslint-disable-next-line*/}
        <p>// Coming soon...</p>
      </Section>

      <Heading as="h2" size="medium" color={colors.primary}>其他资源</Heading>
      <AdditionalResources />

      <Heading as="h2" size="medium" color={colors.primary}>支持作者</Heading>
      <Section>
        {supportUs.map((para, index: number) => (<p dangerouslySetInnerHTML={{__html: para}} />))}
      </Section>

      <Heading as="h2" size="medium" color={colors.primary}>条款&信息</Heading>
      <Section>
      <Heading as="h3" size="small" color={colors.primary}>执照</Heading>
        <b>
          <a href="https://shen.fan">不讲李</a> ©2024
           感谢作者👉 <a href="https://aliciasykes.com">Alicia Sykes</a> { new Date().getFullYear()}
        </b>
        <br />
        <small> 了解更多👉<a href="https://tldrlegal.com/license/mit-license">TLDR 法律 → MIT</a></small>
        <pre>{license}</pre>
        <hr />
        <Heading as="h3" size="small" color={colors.primary}>使用警告</Heading>
        <ul>
          {fairUse.map((para, index: number) => (<li>{para}</li>))}
        </ul>
        <hr />
        <Heading as="h3" size="small" color={colors.primary}>隐私说明</Heading>
        <p>
        分析用于演示实例（通过自托管的 Plausible 实例），这仅记录您访问的 URL，但不记录个人数据。
        还有一些基本的错误日志记录（通过自托管的 GlitchTip 实例），这仅用于帮助我修复错误。
        <br />
        <br />
        您的 IP 地址、浏览器/操作系统/硬件信息或任何其他数据都不会被收集或记录。
        （您可以通过检查源代码或使用开发人员工具自行验证）
        </p>
      </Section>
    </AboutContainer>
    <Footer />
    </div>
  );
}

export default About;
