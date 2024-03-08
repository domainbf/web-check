import styled from 'styled-components';
import colors from 'styles/colors';

const StyledFooter = styled.footer`
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 0.5rem 0;
  background: ${colors.backgroundDarker};
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  opacity: 0.75;
  transition: all 0.2s ease-in-out;
  @media (min-width: 1024px) {
    justify-content: space-between;
  }
  &:hover {
    opacity: 1;
  }
  span {
    margin: 0 0.5rem;
    text-align: center; 
  }
`;


const Link = styled.a`
  color: ${colors.primary};
  font-weight: bold;
  border-radius: 4px;
  padding: 0.1rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${colors.primary};
    color: ${colors.backgroundDarker};
    text-decoration: none;
  }
`;

const Footer = (props: { isFixed?: boolean }): JSX.Element => {
  const licenseUrl = 'https://wubaohu.com/';
  const authorUrl = 'https://shen.fan';
  const githubUrl = 'https://aliciasykes.com';
return (
  <StyledFooter style={props.isFixed ? {position: 'fixed'} : {}}>
    <span>
      开源作者 <Link href={githubUrl}>Alicia Sykes</Link>
    </span>
    <span>
      <Link href="/about">hack.whois.ls</Link>不获取任何个人信息 <Link href={licenseUrl}>隐私</Link> -
      © <Link href={authorUrl}>不讲李</Link> 2024
    </span>
  </StyledFooter>
  );
}

export default Footer;
