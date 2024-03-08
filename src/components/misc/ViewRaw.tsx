import React, { useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import { Card } from 'components/Form/Card';
import Button from 'components/Form/Button';

const CardStyles = `
margin: 0 auto 1rem auto;
width: 95vw;
position: relative;
transition: all 0.2s ease-in-out;
display: flex;
flex-direction: column;
a {
  color: ${colors.primary};
}
.controls {
  display: flex;
  flex-wrap: wrap;
  button {
    max-width: 300px;
  }
}
small {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.5;
}
`;

const StyledIframe = styled.iframe`
  width: calc(100% - 2rem);
  outline: none;
  border: none;
  border-radius: 4px;
  min-height: 50vh;
  height: 100%;
  margin: 1rem;
  background: ${colors.background};
`;

const ViewRaw = (props: { everything: { id: string, result: any}[] }) => {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const makeResults = () => {
    const result: {[key: string]: any} = {};
    props.everything.forEach((item: {id: string, result: any}) => {
      result[item.id] = item.result;
    });
    return result;
  };

  const fetchResultsUrl = async () => {
    const resultContent = makeResults();
    const response = await fetch('https://jsonhero.io/api/create.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'web-check results',
        content: resultContent,
        readOnly: true,
        ttl: 3600,
      })
    });
    if (!response.ok) {
      setError(`HTTP error! status: ${response.status}`);
    } else {
      setError(null);
    }
    await response.json().then(
      (data) => setResultUrl(data.location)
    )
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(makeResults(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'web-check-results.json';
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <Card heading="查看/下载原始数据" styles={CardStyles}>
      <div className="controls">
        <Button onClick={handleDownload}>下载结果</Button>
        <Button onClick={fetchResultsUrl}>{resultUrl ? '更新结果' : '查看结果'}</Button>
        { resultUrl && <Button onClick={() => setResultUrl('') }>隐藏结果</Button> }
      </div>
      { resultUrl && !error &&
      <>
        <StyledIframe title="结果，来自 JSON Hero" src={resultUrl} />
        <small>您的结果可供查看 <a href={resultUrl}>here</a>.</small>
      </>
      }
      { error && <p className="error">{error}</p> }
      <small>
        这些是从您的 URL 生成的 JSON 格式的原始结果。
        您可以将它们导入您自己的程序中，以进行进一步分析。
      </small>
    </Card>
  );
};

export default ViewRaw;
